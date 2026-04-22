<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherSearch extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'city',
        'location_label',
        'temperature_c',
    ];

    protected $casts = [
        'temperature_c' => 'float',
    ];
}
