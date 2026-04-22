<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/profile', 'profile')->name('profile');

Route::post('/weather/search', [WeatherController::class, 'search'])->name('weather.search');
Route::get('/weather/history', [WeatherController::class, 'history'])->name('weather.history');
Route::delete('/weather/history', [WeatherController::class, 'clearHistory'])->name('weather.clearHistory');
Route::get('/weather', function () {
    return inertia('weather');
})->name('weather.page');
