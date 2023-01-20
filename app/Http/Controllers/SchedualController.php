<?php

namespace App\Http\Controllers;
use App\days;
use App\scheduals;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
use App\profilepics;
use App\chats;

class SchedualController extends Controller
{
    //
    public function days()
    {
        //
        $day = days::orderBy('id')->get();
        return $day;

    }
    public function schedual(Request $request)
    {
        $id = Auth::user()->id;
        $userid = $id. " " . $request['id'][0];
        $favorite = scheduals::create([
            'users' => $userid,
            'key' => $request['key'],
          ]);
        return $favorite;

    }
    public function checkschedual(Request $request)
    {
        $id = Auth::user()->id;
        $userid1 = $id. " " . $request['id'][0];
        $userid2 = $request['id'][0]. " " . $id;
        $favorite = scheduals::where('users','=',$userid1)->orWhere('users','=',$userid2)->first();
        return $favorite;

    }
    public function checkschedualt()
    {
        $id = Auth::user()->id;
        $favorite = scheduals::where('users', 'LIKE', '%'.$id.'%')->first();
        return $favorite;

    }
    public function names(Request $request)
    {
        $id = Auth::user()->id;
        $id1 = $request['id'];
        $name1 = User::select('name')->where('id',$id)->get();
        $name2 = User::select('name')->where('id',$id1)->get();
        $arr=json_decode('[]', true);
        array_push($arr, $name1, $name2);
        return json_encode($arr);

    }
    public function daysonly(Request $request)
    {
        //
        $arr=json_decode('[]', true);
        foreach ($request['day'] as $days) {
            $day = days::orderBy('id')->where('id', 'LIKE', '%'.$days.'%')->get();
            array_push($arr, $day[0]);                                    
        }
        
        return json_encode($arr);

    }
    public function checklistschedual()
    {
        $id = Auth::user()->id;
        $users = scheduals::select('users')->where('users', 'LIKE', '%'.$id.'%')->get();
        $arr=json_decode('[]', true);
        foreach ($users as $user) {
            $trimmed = str_replace($id, '', $user);
            $tr=json_decode($trimmed, true);
            $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where('id',$tr['users'])->get();
        if(in_array($res,  $arr))
        {   
            
        }  
    else{
        array_push($arr, $res); 
    }                           
        }
        return $arr;

    }
    public function checklistchat()
    {
        $id = Auth::user()->id;
        $users = chats::select('users')->where('users', 'LIKE', '%'.$id.'%')->get();
        $arr=json_decode('[]', true);
        foreach ($users as $user) {
            $trimmed = str_replace($id, '', $user);
            $tr=json_decode($trimmed, true);
            $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where('id',$tr['users'])->get();
        if(in_array($res,  $arr))
        {   
            
        }  
    else{
        array_push($arr, $res); 
    }                                            
        }
        return $arr;

    }
}
