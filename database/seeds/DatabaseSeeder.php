<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CoursesSeeders::class
        ]);
        $this->call([
            UniversitySeeders::class
        ]);
        $this->call([
            DaysSeeders::class
        ]);
        $this->call([
            LanguagesSeeders::class
        ]);
        $this->call([
            ProjectsSeeders::class
        ]);
        $this->call([
            YearsSeeders::class
        ]);
    }
}
