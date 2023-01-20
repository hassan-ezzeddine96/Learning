<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('teacher');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->unsignedBigInteger('rate')->nullable();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('phonenumber')->nullable();
            $table->longText('university')->nullable();
            $table->string('location')->nullable();
            $table->longText('courses')->nullable();
            $table->string('age')->nullable();
            $table->longText('years')->nullable();
            $table->longText('projects')->nullable();
            $table->string('language')->nullable();
            $table->longText('extra_info')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
