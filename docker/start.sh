#!/usr/bin/env sh
set -eu

PORT_VALUE="${PORT:-10000}"

sed "s/__PORT__/${PORT_VALUE}/g" /etc/nginx/http.d/default.conf.template > /etc/nginx/http.d/default.conf

mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

if [ ! -f public/storage ]; then
    php artisan storage:link --no-interaction || true
fi

php artisan config:clear
php artisan route:clear
php artisan view:clear

if [ -n "${APP_KEY:-}" ]; then
    php artisan config:cache
    php artisan route:cache || true
    php artisan view:cache || true
fi

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    php artisan migrate --force
fi

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
