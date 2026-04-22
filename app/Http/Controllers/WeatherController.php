<?php

namespace App\Http\Controllers;

use App\Models\WeatherSearch;
use App\Services\OpenMeteoService;
use Illuminate\Http\Request;
use Throwable;

class WeatherController extends Controller
{
    public function __construct(private readonly OpenMeteoService $openMeteo)
    {
    }

    public function search(Request $request)
    {
        $request->validate([
            'city' => ['required', 'string', 'max:100'],
        ]);

        $city = trim((string) $request->city);

        try {
            $result = $this->openMeteo->getWeatherByCity($city);
        } catch (\RuntimeException $exception) {
            $status = $exception->getMessage() === 'City not found.' ? 404 : 500;

            return response()->json([
                'message' => $exception->getMessage(),
            ], $status);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Unable to fetch weather data right now.',
            ], 500);
        }

        $normalizedCity = mb_strtolower($city);

        $existingSearch = WeatherSearch::where('session_id', $request->session()->getId())
            ->whereRaw('LOWER(city) = ?', [$normalizedCity])
            ->latest('updated_at')
            ->first();

        if ($existingSearch) {
            $existingSearch->fill([
                'city' => $city,
                'location_label' => $result['location_label'],
                'temperature_c' => $result['weather']['temperature_2m'] ?? null,
            ])->save();

            WeatherSearch::where('session_id', $request->session()->getId())
                ->whereRaw('LOWER(city) = ?', [$normalizedCity])
                ->whereKeyNot($existingSearch->id)
                ->delete();
        } else {
            WeatherSearch::create([
                'session_id' => $request->session()->getId(),
                'city' => $city,
                'location_label' => $result['location_label'],
                'temperature_c' => $result['weather']['temperature_2m'] ?? null,
            ]);
        }

        $searchIdsToKeep = WeatherSearch::where('session_id', $request->session()->getId())
            ->latest('updated_at')
            ->limit(10)
            ->pluck('id');

        WeatherSearch::where('session_id', $request->session()->getId())
            ->whereNotIn('id', $searchIdsToKeep)
            ->delete();

        return response()->json([
            'location' => $result['location'],
            'weather' => $result['weather'],
            'air_quality' => $result['air_quality'],
        ]);
    }

    public function history(Request $request)
    {
        $searches = WeatherSearch::where('session_id', $request->session()->getId())
            ->latest('updated_at')
            ->get(['id', 'city', 'location_label', 'temperature_c', 'updated_at'])
            ->unique(fn (WeatherSearch $search) => mb_strtolower($search->city))
            ->take(10)
            ->values();

        return response()->json($searches);
    }

    public function clearHistory(Request $request)
    {
        WeatherSearch::where('session_id', $request->session()->getId())->delete();

        return response()->json(['message' => 'History cleared.']);
    }
}
