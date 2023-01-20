<?php

use Illuminate\Database\Seeder;

class DaysSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('days')->insert(array(
            array(
              'name' => 'Monday',
            ),
            array(
              'name' => 'Tuesday',
            ),
            array(
              'name' => 'Wednesday',
            ),
            array(
              'name' => 'Thursday',
            ),
            array(
              'name' => 'Friday',
            ),
            array(
              'name' => 'Saturday',
            ),
            array(
              'name' => 'Sunday',
            ),
          ));
    }
}
