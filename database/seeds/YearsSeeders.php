<?php

use Illuminate\Database\Seeder;

class YearsSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('years')->insert(array(
            array(
              'name' => 'Grade 1',
            ),
            array(
              'name' => 'Grade 2',
            ),
            array(
              'name' => 'Grade 3',
            ),
            array(
              'name' => 'Grade 4',
            ),
            array(
              'name' => 'Grade 5',
            ),
            array(
              'name' => 'Grade 6',
            ),
            array(
              'name' => 'Grade 7',
            ),
            array(
              'name' => 'Grade 8',
            ),
            array(
              'name' => 'Grade 9',
            ),
            array(
              'name' => 'Grade 10',
            ),
            array(
              'name' => 'Grade 11',
            ),
            array(
              'name' => 'Grade 12',
            ),
            array(
              'name' => 'First Year University ',
            ),
            array(
              'name' => 'Second Year University ',
            ),
            array(
              'name' => 'Third Year University ',
            ),
            array(
              'name' => 'Fourth Year University ',
            ),
            array(
              'name' => 'Fifth Year University ',
            ),
            array(
              'name' => 'Master Student',
            ),
          ));
    }
}
