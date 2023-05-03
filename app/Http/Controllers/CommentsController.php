<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;


class CommentsController extends Controller
{

function insert(Request $request)
{
$author=$request->author;
$content=$request->content;

$max_shift=Comment::max('max_shift');
$max_shift +=1;


$id= Comment::insertGetId(['shift'=>$max_shift, 'max_shift'=>$max_shift, 'author'=>$author, 'content'=>$content ]);

$result = Comment::where('id', $id)->update(['root_id'=>$id]);

if($result)

return "OK";
else
return "failure";

}


function react(Request $request)
{
$parent_id=$request->parent_id;
$author=$request->author;
$content=$request->content;
$data= Comment::select(['root_id', 'shift', 'children_count'])->where('id', $parent_id)->get();
$shift=$data[0]->shift;
$root_id=$data[0]->root_id;
$children_count = $data[0]->children_count;

$children_count +=1;

$shift = $shift . '-' . $children_count;

Comment::insert(['root_id'=>$root_id, 'shift'=>$shift, 'author'=>$author, 'content'=>$content ]);

// zvýší children_count u zprávy, na kterou je reakce...

$result = Comment::where('id', $parent_id)->update(['children_count'=>$children_count]);

if($result)
return "OK";
else
return "failure";


}







function getComments(Request $request)
{

$comments=Comment::all();


return $comments;
}





}











