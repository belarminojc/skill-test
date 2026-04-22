<?php

namespace Tests\Feature;

use App\Models\WeatherSearch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class WeatherControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_not_found_for_an_invalid_city(): void
    {
        Http::fake([
            'https://geocoding-api.open-meteo.com/*' => Http::response([
                'results' => [],
            ]),
        ]);

        $response = $this->postJson(route('weather.search'), [
            'city' => 'NotARealCity',
        ]);

        $response
            ->assertNotFound()
            ->assertJson([
                'message' => 'City not found.',
            ]);
    }

    public function test_it_persists_repeated_views_as_an_activity_log_and_caps_history_at_ten(): void
    {
        Http::fake([
            'https://geocoding-api.open-meteo.com/*' => Http::sequence()
                ->push([
                    'results' => [[
                        'name' => 'Manila',
                        'country' => 'Philippines',
                        'latitude' => 14.6,
                        'longitude' => 121.0,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Manila',
                        'country' => 'Philippines',
                        'latitude' => 14.6,
                        'longitude' => 121.0,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Cebu',
                        'country' => 'Philippines',
                        'latitude' => 10.3,
                        'longitude' => 123.9,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Baguio',
                        'country' => 'Philippines',
                        'latitude' => 16.4,
                        'longitude' => 120.6,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Davao',
                        'country' => 'Philippines',
                        'latitude' => 7.1,
                        'longitude' => 125.6,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Tagaytay',
                        'country' => 'Philippines',
                        'latitude' => 14.1,
                        'longitude' => 120.9,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Iloilo',
                        'country' => 'Philippines',
                        'latitude' => 10.7,
                        'longitude' => 122.6,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Bacolod',
                        'country' => 'Philippines',
                        'latitude' => 10.7,
                        'longitude' => 122.9,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Cagayan de Oro',
                        'country' => 'Philippines',
                        'latitude' => 8.5,
                        'longitude' => 124.6,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Zamboanga',
                        'country' => 'Philippines',
                        'latitude' => 6.9,
                        'longitude' => 122.1,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'General Santos',
                        'country' => 'Philippines',
                        'latitude' => 6.1,
                        'longitude' => 125.2,
                    ]],
                ], 200)
                ->push([
                    'results' => [[
                        'name' => 'Vigan',
                        'country' => 'Philippines',
                        'latitude' => 17.6,
                        'longitude' => 120.4,
                    ]],
                ], 200),
            'https://api.open-meteo.com/*' => Http::sequence()
                ->push(['current' => ['time' => '2026-04-22T09:00', 'temperature_2m' => 31, 'weather_code' => 1, 'wind_speed_10m' => 9, 'visibility' => 10000]], 200)
                ->push(['current' => ['time' => '2026-04-22T10:00', 'temperature_2m' => 32, 'weather_code' => 1, 'wind_speed_10m' => 10, 'visibility' => 10000]], 200)
                ->push(['current' => ['time' => '2026-04-22T11:00', 'temperature_2m' => 30, 'weather_code' => 2, 'wind_speed_10m' => 8, 'visibility' => 9000]], 200)
                ->push(['current' => ['time' => '2026-04-22T12:00', 'temperature_2m' => 24, 'weather_code' => 3, 'wind_speed_10m' => 6, 'visibility' => 8000]], 200)
                ->push(['current' => ['time' => '2026-04-22T13:00', 'temperature_2m' => 33, 'weather_code' => 0, 'wind_speed_10m' => 12, 'visibility' => 10000]], 200)
                ->push(['current' => ['time' => '2026-04-22T14:00', 'temperature_2m' => 27, 'weather_code' => 45, 'wind_speed_10m' => 5, 'visibility' => 4000]], 200)
                ->push(['current' => ['time' => '2026-04-22T15:00', 'temperature_2m' => 29, 'weather_code' => 61, 'wind_speed_10m' => 11, 'visibility' => 7000]], 200)
                ->push(['current' => ['time' => '2026-04-22T16:00', 'temperature_2m' => 28, 'weather_code' => 63, 'wind_speed_10m' => 13, 'visibility' => 6500]], 200)
                ->push(['current' => ['time' => '2026-04-22T17:00', 'temperature_2m' => 26, 'weather_code' => 65, 'wind_speed_10m' => 14, 'visibility' => 6000]], 200)
                ->push(['current' => ['time' => '2026-04-22T18:00', 'temperature_2m' => 34, 'weather_code' => 0, 'wind_speed_10m' => 7, 'visibility' => 10000]], 200)
                ->push(['current' => ['time' => '2026-04-22T19:00', 'temperature_2m' => 25, 'weather_code' => 80, 'wind_speed_10m' => 15, 'visibility' => 5500]], 200)
                ->push(['current' => ['time' => '2026-04-22T20:00', 'temperature_2m' => 23, 'weather_code' => 95, 'wind_speed_10m' => 18, 'visibility' => 5000]], 200),
            'https://air-quality-api.open-meteo.com/*' => Http::sequence()
                ->push(['current' => ['us_aqi' => 45, 'pm2_5' => 11.1, 'pm10' => 18.2]], 200)
                ->push(['current' => ['us_aqi' => 48, 'pm2_5' => 12.4, 'pm10' => 19.0]], 200)
                ->push(['current' => ['us_aqi' => 50, 'pm2_5' => 9.8, 'pm10' => 17.5]], 200)
                ->push(['current' => ['us_aqi' => 42, 'pm2_5' => 8.3, 'pm10' => 16.1]], 200)
                ->push(['current' => ['us_aqi' => 52, 'pm2_5' => 13.0, 'pm10' => 21.0]], 200)
                ->push(['current' => ['us_aqi' => 55, 'pm2_5' => 14.0, 'pm10' => 22.0]], 200)
                ->push(['current' => ['us_aqi' => 58, 'pm2_5' => 15.0, 'pm10' => 23.0]], 200)
                ->push(['current' => ['us_aqi' => 60, 'pm2_5' => 16.0, 'pm10' => 24.0]], 200)
                ->push(['current' => ['us_aqi' => 62, 'pm2_5' => 17.0, 'pm10' => 25.0]], 200)
                ->push(['current' => ['us_aqi' => 64, 'pm2_5' => 18.0, 'pm10' => 26.0]], 200)
                ->push(['current' => ['us_aqi' => 66, 'pm2_5' => 19.0, 'pm10' => 27.0]], 200)
                ->push(['current' => ['us_aqi' => 68, 'pm2_5' => 20.0, 'pm10' => 28.0]], 200),
        ]);

        $cities = [
            'Manila',
            'Manila',
            'Cebu',
            'Baguio',
            'Davao',
            'Tagaytay',
            'Iloilo',
            'Bacolod',
            'Cagayan de Oro',
            'Zamboanga',
            'General Santos',
            'Vigan',
        ];

        foreach ($cities as $city) {
            $this->postJson(route('weather.search'), ['city' => $city])->assertOk();
        }

        $this->assertDatabaseCount('weather_searches', 10);
        $this->assertSame(2, WeatherSearch::where('city', 'Manila')->count());

        $historyResponse = $this->getJson(route('weather.history'));

        $historyResponse->assertOk();
        $this->assertCount(10, $historyResponse->json());
        $this->assertSame('Vigan', $historyResponse->json('0.city'));
        $this->assertSame('Cebu', $historyResponse->json('9.city'));
    }

    public function test_it_clears_history_for_the_current_session(): void
    {
        WeatherSearch::factory()->count(3)->create([
            'session_id' => session()->getId(),
        ]);

        $response = $this->deleteJson(route('weather.clearHistory'));

        $response->assertOk()->assertJson([
            'message' => 'History cleared.',
        ]);

        $this->assertDatabaseCount('weather_searches', 0);
    }
}
