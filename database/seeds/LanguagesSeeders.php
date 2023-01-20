<?php

use Illuminate\Database\Seeder;

class LanguagesSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert(array(
            array(
              'name' => 'English',
            ),
            array(
              'name' => 'French',
            ),
          ));
    }
}
