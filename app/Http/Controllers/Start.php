<?php

namespace App\Http\Controllers;
use App\university;
use App\years;
use App\projects;
use App\courses;
use App\User;
use App\languages;
use App\profilepics;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class Start extends Controller
{
    //
    public function university()
    {
        //
        $uni = university::orderBy('id')->get();
        return $uni;

    }
    public function language()
    {
        //
        $lang = languages::orderBy('id')->get();
        return $lang;

    }
    public function project()
    {
        //
        $project = projects::orderBy('id')->get();
        return $project;

    }
    public function course()
    {
        //
        $course = courses::orderBy('id')->get();
        return $course;

    }
    public function year()
    {
        //
        $year = years::orderBy('id')->get();
        return $year;

    }
    public function check()
    {
        $id = Auth::user()->id;
        $user= User::findOrFail($id);
        $check=$user->teacher;

        return $check;

    }
    public function check2()
    {
        $id = Auth::user()->id;
        $user = User::where([['id',$id], ['teacher', 'false']])->whereNull('years')->get();
        if($user == '[]'){
            $check='true';
        }
        else{
            $check='false';
        }

        return $check;

    }
    public function getnumberstudentsin()
    {
        $id = Auth::user()->id;
        $user= User::findOrFail($id);
        $year=$user->years;
        $wordlist = User::where([['teacher', 'false'], ['years', $year]])->get();
        $wordCount = $wordlist->count()-1;
        return $wordCount;

    }
    public function getstudentsin()
    {
        $id = Auth::user()->id;
        $user= User::findOrFail($id);
        $year=$user->years;
        $users = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['teacher', 'false'], ['years', $year], ['id', '<>', $id]])->get();
        return $users;

    }
    public function getnumberstudents()
    {
        $wordlist = User::where('teacher', 'false')->get();
        $wordCount = $wordlist->count();
        return $wordCount;

    }
    public function getnumberteachers()
    {
        $wordlist = User::where('teacher', 'true')->get();
        $wordCount = $wordlist->count();
        return $wordCount;

    }
    public function store(Request $request)
    {
        $id = Auth::user()->id;
        $user= User::findOrFail($id);
        $user->teacher = $request['teacher'];
        $user->rate = $request['rate'];
        $user->firstname = $request['first'];
        $user->lastname = $request['last'];
        $user->phonenumber = $request['phone'];
        $user->age = $request['age'];

        $uni=json_decode('[]', true);
        foreach ($request['uni'] as $fav) {
            array_push($uni, $fav['id']);                                    
        }
        $user->university = $uni;

        $user->extra_info = $request['info'];

        $course=json_decode('[]', true);
        foreach ($request['course'] as $fav) {
            array_push($course, $fav['id']);                                    
        }
        $user->courses = $course;

        $year=json_decode('[]', true);
        foreach ($request['year'] as $fav) {
            array_push($year, $fav['id']);                                    
        }
        $user->years = $year;

        $project=json_decode('[]', true);
        foreach ($request['project'] as $fav) {
            array_push($project, $fav['id']);                                    
        }
        $user->projects = $project;

        $lang=json_decode('[]', true);
        foreach ($request['lang'] as $fav) {
            array_push($lang, $fav['id']);                                    
        }
        $user->language = $lang;

        $user->save();
        return $user->toJson();
    }
}
