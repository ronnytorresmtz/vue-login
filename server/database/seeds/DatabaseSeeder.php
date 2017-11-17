<?php

use Illuminate\Database\Seeder;
use MyCode\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\MyCode\Models\User::class, 10)->create();

        User::Create([
            'name' => 'demo123',
            'email' => 'demo123@gmail.com',
            'password' => bcrypt('demo123'),
            'remember_token' => str_random(10),
        ]);

        User::Create([
            'name' => 'ronnytorresmtz',
            'email' => 'ronnytorresmtz@gmail.com',
            'password' => bcrypt('ronnytorresmtz'),
            'remember_token' => str_random(10),
        ]);
    }
}
