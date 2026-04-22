<?php

namespace Database\Factories;

use App\Models\WeatherSearch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<WeatherSearch>
 */
class WeatherSearchFactory extends Factory
{
    protected $model = WeatherSearch::class;

    public function definition(): array
    {
        return [
            'session_id' => fake()->uuid(),
            'city' => fake()->city(),
            'location_label' => fake()->city().', '.fake()->country(),
            'temperature_c' => fake()->randomFloat(1, 18, 36),
        ];
    }
}
