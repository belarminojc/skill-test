<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::inertia('/', 'weather')->name('home');
Route::inertia('/profile', 'profile')->name('profile');

Route::post('/weather/search', [WeatherController::class, 'search'])->name('weather.search');
Route::get('/weather/history', [WeatherController::class, 'history'])->name('weather.history');
Route::delete('/weather/history', [WeatherController::class, 'clearHistory'])->name('weather.clearHistory');
