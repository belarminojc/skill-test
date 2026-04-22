<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('weather_searches', function (Blueprint $table) {
            $table->dropUnique('weather_searches_session_id_city_unique');
            $table->index(['session_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('weather_searches', function (Blueprint $table) {
            $table->dropIndex('weather_searches_session_id_created_at_index');
            $table->unique(['session_id', 'city']);
        });
    }
};
