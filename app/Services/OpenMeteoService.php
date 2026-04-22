<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class OpenMeteoService
{
    public function geocode(string $city): ?array
    {
        $response = Http::baseUrl(config('services.open_meteo.geocoding_url'))
            ->timeout(10)
            ->get('/search', [
                'name' => $city,
                'count' => 1,
                'language' => 'en',
                'format' => 'json',
            ])
            ->throw()
            ->json();

        if (empty($response['results'][0])) {
            return null;
        }

        return $response['results'][0];
    }

    public function currentWeather(float $latitude, float $longitude): array
    {
        return Http::baseUrl(config('services.open_meteo.base_url'))
            ->timeout(10)
            ->get('/forecast', [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'current' => 'temperature_2m,weather_code,wind_speed_10m,visibility,uv_index',
                'timezone' => 'auto',
            ])
            ->throw()
            ->json();
    }

    public function airQuality(float $latitude, float $longitude): array
    {
        return Http::baseUrl(config('services.open_meteo.air_quality_url'))
            ->timeout(10)
            ->get('/air-quality', [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'current' => 'us_aqi,pm2_5,pm10',
                'timezone' => 'auto',
            ])
            ->throw()
            ->json();
    }

    public function getWeatherByCity(string $city): array
    {
        try {
            $place = $this->geocode($city);

            if (! $place) {
                throw new \RuntimeException('City not found.');
            }

            $weather = $this->currentWeather($place['latitude'], $place['longitude']);
            $airQuality = $this->airQuality($place['latitude'], $place['longitude']);
        } catch (RequestException $exception) {
            throw new \RuntimeException('Unable to fetch weather data right now.', previous: $exception);
        }

        $location = [
            'name' => $place['name'] ?? null,
            'country' => $place['country'] ?? null,
            'latitude' => $place['latitude'] ?? null,
            'longitude' => $place['longitude'] ?? null,
        ];

        return [
            'location' => $location,
            'location_label' => implode(', ', array_filter([$location['name'], $location['country']])),
            'weather' => $weather['current'] ?? [],
            'air_quality' => $airQuality['current'] ?? [],
        ];
    }
}
