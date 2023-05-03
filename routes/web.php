<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Route::post('/deleteUser', [UserController::class, 'deleteUser']);
Route::get('/getUsers', [UserController::class, 'getUsers']);
Route::post('/insert', [CommentsController::class, 'insert']);
Route::post('/react', [CommentsController::class, 'react']);
Route::get('/getComments', [CommentsController::class, 'getComments']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::get('/', function () {
    return view('welcome');
});
