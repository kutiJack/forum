<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class LoginController extends Controller
{



public function hash_password($password)
{

return hash('ripemd160', $password);
}



 function login(Request $request)
{

$name=$request->name;
$password=$this->hash_password($request->password);

$result=User::where('name', $name)->where('password', $password)->get();

if(!$result->isEmpty())
{

return 'authorized';

}
else

{
return 'failed';
}




}










}
