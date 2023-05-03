<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class RegisterController extends Controller
{

public function hash_password($password)
{

return hash('ripemd160', $password);
}



 function register(Request $request)
{
$name=$request->name;

$password= $this->hash_password($request->password);




$check = User::where('name',$name)->get();

if($check->isEmpty())
{
User::insert(['name'=>$name, 'password'=>$password]);

return 'OK';

}
else
return 'exists';







}



}
