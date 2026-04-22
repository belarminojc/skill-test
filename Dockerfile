FROM composer:2 AS composer_deps

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

FROM node:22-alpine AS frontend_build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources ./resources
COPY public ./public
COPY vite.config.ts tsconfig.json eslint.config.js ./
RUN npm run build

FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    linux-headers \
    bash \
    fcgi \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        bcmath \
        exif \
        gd \
        intl \
        opcache \
        pcntl \
        pdo_pgsql \
        zip \
    && rm -rf /var/cache/apk/*

COPY --from=composer_deps /usr/bin/composer /usr/bin/composer

COPY . .
COPY --from=composer_deps /app/vendor ./vendor
COPY --from=frontend_build /app/public/build ./public/build
COPY docker/nginx.conf /etc/nginx/http.d/default.conf.template
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/start.sh /usr/local/bin/start-container

RUN chmod +x /usr/local/bin/start-container \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data /var/www/html

EXPOSE 10000

CMD ["/usr/local/bin/start-container"]
