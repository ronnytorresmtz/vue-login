<?php

use MyCode\Models\User as User;

Route::middleware('auth:api')->get('/users', function () {

    return response()->json([

        'message' => 'Communication is established with Laravel API via Laravel Passport and CORS',

        'middleware' => 'Laravel routes are protected with a middleware guard - auth:api',

        'users' => User::all(),

        'user' => Request::user(),

    ]);

});

