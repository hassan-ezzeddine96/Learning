<?php

namespace App\Http\Controllers;
use App\university;
use App\years;
use App\projects;
use App\courses;
use App\User;
use App\profilepics;
use App\favorites;
use App\languages;
use App\chats;
use App\coursefiles;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class SearchController extends Controller
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
    public function searchlang(Request $request)
    {
        $id = Auth::user()->id;
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['language', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchcourse(Request $request)
    {
        $id = Auth::user()->id;
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['courses', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchyear(Request $request)
    {
        $id = Auth::user()->id;
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['years', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchuni(Request $request)
    {
        $id = Auth::user()->id;
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['university', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchproject(Request $request)
    {
        $id = Auth::user()->id;
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['projects', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchlangs(Request $request)
    {
        $id = $request['id'];
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['language', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchcourses(Request $request)
    {
        $id = $request['id'];
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['courses', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchyears(Request $request)
    {
        $id = $request['id'];
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['years', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchunis(Request $request)
    {
        $id = $request['id'];
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['university', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchprojects(Request $request)
    {
        $id = $request['id'];
        $res = User::addSelect(['source' => profilepics::select('source')
        ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                       ['projects', 'LIKE', '%'.$request['s'].'%'] ])->get();
                                                                                                            
        return $res->toJson();

    }
    public function searchallteachers()
    {
        $id = Auth::user()->id;
        $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true']])->get();
        return $res->toJson();
    }
    public function searchallcourses()
    {
        $res = coursefiles::orderBy('id')->get();
        return $res->toJson();
    }
    public function searchallmycourses()
    {
        $id = Auth::user()->id;
        $res = coursefiles::orderBy('id')->where('user_id',$id)->get();
        return $res->toJson();
    }
    public function searchallmycoursesx(Request $request)
    {
        $res = coursefiles::orderBy('id')->where('user_id',$request['id'])->get();
        return $res->toJson();
    }
    public function searchresultcourses(Request $request)
    {
        if($request['lang']== NULL && $request['year'] == NULL && $request['course'] == NULL  ){
            $res = coursefiles::orderBy('id')->get();
        }
        if($request['lang']!= NULL && $request['year'] == NULL && $request['course'] == NULL  ){
            $res = coursefiles::where('language', 'LIKE', '%'.$request['lang'][0]['id'].'%')->get();
        }
        if($request['lang']== NULL && $request['year'] != NULL && $request['course'] == NULL  ){
            $res = coursefiles::where('year',$request['year'][0]['id'])->get();
        }
        if($request['lang']== NULL && $request['year'] == NULL && $request['course'] != NULL  ){
            $res = coursefiles::where('course',$request['course'][0]['id'])->get();
        }
        if($request['lang']!= NULL && $request['year'] != NULL && $request['course'] != NULL  ){
            $res = coursefiles::where([['course',$request['course'][0]['id']],
                                        ['year',$request['year'][0]['id']],
                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'] ])->get();
        }
        if($request['lang']!= NULL && $request['year'] != NULL && $request['course'] == NULL  ){
            $res = coursefiles::where([['year',$request['year'][0]['id']],
                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'] ])->get();
        }
        if($request['lang']!= NULL && $request['year'] == NULL && $request['course'] != NULL  ){
            $res = coursefiles::where([['course',$request['course'][0]['id']],
                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'] ])->get();
        }
        if($request['lang']== NULL && $request['year'] != NULL && $request['course'] != NULL  ){
            $res = coursefiles::where([['year',$request['year'][0]['id']],
                                        ['course',$request['course'][0]['id']] ])->get();
        }
        return $res->toJson();
    }
    public function search(Request $request)
    {
        $id = Auth::user()->id;
        if($request['lang']!= NULL && $request['year'] == NULL && $request['course'] == NULL && $request['uni'] == NULL && $request['project'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'] ])->get();
        }
        if($request['year']!= NULL && $request['lang'] == NULL && $request['course'] == NULL && $request['uni'] == NULL && $request['project'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['years', 'LIKE', '%'.$request['year'][0]['id'].'%'] ])->get();
        }
        if($request['course']!= NULL && $request['year'] == NULL && $request['lang'] == NULL && $request['uni'] == NULL && $request['project'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['courses', 'LIKE', '%'.$request['course'][0]['id'].'%'] ])->get();
        }
        if($request['uni']!= NULL && $request['year'] == NULL && $request['course'] == NULL && $request['lang'] == NULL && $request['project'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['university', 'LIKE', '%'.$request['uni'][0]['id'].'%'] ])->get();
        }
        if($request['project']!= NULL && $request['year'] == NULL && $request['course'] == NULL && $request['uni'] == NULL && $request['lang'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['projects', 'LIKE', '%'.$request['project'][0]['id'].'%'] ])->get();
        }
        if($request['project']== NULL && $request['year'] != NULL && $request['course'] != NULL && $request['uni'] == NULL && $request['lang'] != NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'],
                                                        ['years', 'LIKE', '%'.$request['year'][0]['id'].'%'],
                                                        ['courses', 'LIKE', '%'.$request['course'][0]['id'].'%'] ])->get();
        }
        if($request['project']!= NULL && $request['year'] == NULL && $request['course'] == NULL && $request['uni'] != NULL && $request['lang'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['university', 'LIKE', '%'.$request['uni'][0]['id'].'%'],
                                                        ['projects', 'LIKE', '%'.$request['project'][0]['id'].'%'] ])->get();
        }
        if($request['project']== NULL && $request['year'] != NULL && $request['course'] == NULL && $request['uni'] == NULL && $request['lang'] != NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'],
                                                        ['years', 'LIKE', '%'.$request['year'][0]['id'].'%'] ])->get();
        }
        if($request['project']== NULL && $request['year'] == NULL && $request['course'] != NULL && $request['uni'] != NULL && $request['lang'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['courses', 'LIKE', '%'.$request['course'][0]['id'].'%'],
                                                        ['university', 'LIKE', '%'.$request['uni'][0]['id'].'%'],])->get();
        }
        if($request['project']!= NULL && $request['year'] != NULL && $request['course'] == NULL && $request['uni'] != NULL && $request['lang'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['years', 'LIKE', '%'.$request['year'][0]['id'].'%'],
                                                        ['university', 'LIKE', '%'.$request['uni'][0]['id'].'%'],
                                                        ['projects', 'LIKE', '%'.$request['project'][0]['id'].'%'] ])->get();
        }
        if($request['project']== NULL && $request['year'] != NULL && $request['course'] == NULL && $request['uni'] != NULL && $request['lang'] == NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['years', 'LIKE', '%'.$request['year'][0]['id'].'%'],
                                                        ['university', 'LIKE', '%'.$request['uni'][0]['id'].'%'] ])->get();
        }
        if($request['project']!= NULL && $request['year'] != NULL && $request['course'] != NULL && $request['uni'] != NULL && $request['lang'] != NULL ){
            $res = User::addSelect(['source' => profilepics::select('source')
            ->whereColumn('user_id', 'users.id')])->where([['id', '!=',$id], ['teacher', 'true'],
                                                        ['language', 'LIKE', '%'.$request['lang'][0]['id'].'%'],
                                                        ['years', 'LIKE', '%'.$request['year'][0]['id'].'%'],
                                                        ['courses', 'LIKE', '%'.$request['course'][0]['id'].'%'],
                                                        ['university', 'LIKE', '%'.$request['uni'][0]['id'].'%'],
                                                        ['projects', 'LIKE', '%'.$request['project'][0]['id'].'%'] ])->get();
        }
                                                                                       
        return $res->toJson();

    }
    public function favorite(Request $request)
    {
        $id = Auth::user()->id;
        $tid = $request['id'][0];
        $visitor = User::where('id','=',$tid)->first();
        $visitor->increment('rate');
        $favorite= favorites::where([['user_id', $id],['teacher_id', $tid]])->first();
        if ($favorite == NULL) {
        $favorite = favorites::create([
            'teacher_id' => $tid,
            'user_id' => $id,
          ]);
        }
        return $favorite->toJson();

    }
    public function checkx(Request $request)
    {
        $id = Auth::user()->id;
        $tid = $request['id'][0];
        $res = 'true';
        if($id == $tid){
            $res = 'true';
            
            return $res;
        }
        $favorite= favorites::where([['user_id', $id],['teacher_id', $tid]])->first();
        if ($favorite == NULL) {
            $res = 'false';
        }
        return $res;

    }
    public function favx()
    {
        $id = Auth::user()->id;
        $favorites= favorites::select('teacher_id')->where('user_id', $id)->get();
        $arr=json_decode('[]', true);
        

        foreach ($favorites as $favorite) {
            $res = User::addSelect(['source' => profilepics::select('source')->whereColumn('user_id', 'users.id')])->where('id', '=',$favorite['teacher_id'])->get();
            array_push($arr, $res[0]);                                    
        }
        
        return json_encode($arr);

    }
    public function rem(Request $request)
    {
        $id = Auth::user()->id;
        $tid = $request['r'][0];
        $visitor = User::where('id','=',$tid)->first();
        $visitor->decrement('rate');
        $res='true';
        $collection = favorites::where('teacher_id',$tid)->get(['id']);
        $fav=favorites::destroy($collection->toArray());
        if ($fav == NULL) {
            $res = 'false';
        }
        return $res;

    }
    public function chat(Request $request)
    {
        $id = Auth::user()->id;
        $userid = $id. " " . $request['id'][0];
        $favorite = chats::create([
            'users' => $userid,
            'key' => $request['key'],
          ]);
        return $favorite;

    }
    public function checkchat(Request $request)
    {
        $id = Auth::user()->id;
        $userid1 = $id. " " . $request['id'][0];
        $userid2 = $request['id'][0]. " " . $id;
        $favorite = chats::where('users','=',$userid1)->orWhere('users','=',$userid2)->first();
        return $favorite;

    }
    public function sender(Request $request)
    {
        $id = Auth::user()->id;
        return $id;

    }
    public function rating()
    {
            $res = User::addSelect(['source' => profilepics::select('source')->whereColumn('user_id', 'users.id')])->orderBy('rate', 'DESC')->where([['teacher','true'],['rate','<>','0']])->take(3)->get();
        
        return $res;

    }
}
