<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{


function deleteUser(Request $request)
{

$user_id=$request->user_id;

$result = User::destroy($user_id);

if($result)
{
return 'OK';
}
else
return 'failed';


}


function getUsers(Request $request)
{

$users= User::all();

if($users)
{
return $users;
}
else
return 'failed';


}















}
