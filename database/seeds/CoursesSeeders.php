<?php

use Illuminate\Database\Seeder;

class CoursesSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert(array(
            array(
              'name' => 'Math',
            ),
            array(
              'name' => 'Biology',
            ),
            array(
                'name' => 'Physics',
              ),
            array(
                'name' => 'Chemistry',
              ),
            array(
                'name' => 'Arabic',
              ),
            array(
                'name' => 'English',
              ),
            array(
                'name' => 'Frensh',
              ),
            array(
                'name' => 'History/Gio..',
              ),

          ));
    }
}
