<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weather_searches', function (Blueprint $table) {
            $table->id();
            $table->string('session_id', 100)->index();
            $table->string('city', 100);
            $table->string('location_label', 200)->nullable();
            $table->float('temperature_c')->nullable();
            $table->timestamps();

            // Keep only the latest record per city per session
            $table->unique(['session_id', 'city']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weather_searches');
    }
};
