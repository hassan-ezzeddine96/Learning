<?php

use Illuminate\Database\Seeder;

class ProjectsSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert(array(
            array(
              'name' => 'Autocad',
            ),
            array(
              'name' => 'Photoshop',
            ),
            array(
              'name' => '3D Max',
            ),
            array(
              'name' => 'Website',
            ),
            array(
              'name' => 'Android App',
            ),
            array(
              'name' => 'IOS App',
            ),
            array(
              'name' => 'Arduino',
            ),
            array(
              'name' => 'Circuits',
            ),
            array(
              'name' => 'Electronics',
            ),
            array(
              'name' => 'Raspberry Pi',
            ),
          ));
    }
}
