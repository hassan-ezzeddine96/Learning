<?php

use Illuminate\Database\Seeder;

class UniversitySeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('university')->insert(array(
            array(
              'name' => 'Lebanese University Hadath',
            ),
            array(
              'name' => 'Lebanese University Tripoli',
            ),
            array(
              'name' => 'Lebanese University Fanar',
            ),
            array(
              'name' => 'Lebanese University Roumieh',
            ),
            array(
              'name' => 'LIU',
            ),
            array(
              'name' => 'AUB',
            ),
            array(
              'name' => 'USG',
            ),
            array(
              'name' => 'NDU',
            ),
            array(
              'name' => 'LAU',
            ),
            array(
              'name' => 'Balamand',
            ),
          ));
    }
}
