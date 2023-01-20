<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\university;
use App\years;
use App\projects;
use App\courses;
use App\User;
use App\languages;
use App\profilepics;
use App\coursefiles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\blog;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{
    //
    public function storepic(Request $request)
    {
        $image = $request['profile'];  // your base64 encoded
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = str_random(10) . '.png';
        Storage::disk('local')->put($imageName, base64_decode($image));

        $id = Auth::user()->id;
        $source= profilepics::where('user_id', $id)->first();
        if ($source == NULL) {
            $profile = profilepics::create([
                'source' => "/images/".$imageName,
                'user_id' => Auth::user()->id,
              ]);
           
        }
        else{
            $profile = profilepics::where('user_id', $id)->update(array('source' => "/images/".$imageName,));
        }
        $profile->save();
        return $profile->toJson();
    }
    public function getpic()
    {
        $id = Auth::user()->id;
        $source= profilepics::where('user_id', $id)->first();
        if ($source == NULL) {
            $res="nothing";
        }
        else{
            $res = profilepics::select('source')->where('user_id', $id)->get();
        }
        return $res;
    }
    public function getall()
    { 
        $id = Auth::user()->id;
        $all=json_decode('[]', true);
        $res9 = User::select('firstname', 'lastname', 'email', 'age', 'extra_info')->where('id', $id)->get();
        array_push($all, $res9);

        $res =User::select('university')->where('id', $id)->get();
        $uni=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['university'], true) as $fav1 ){
            $res3 =university::where('id', $fav1)->get();
            $wordlist = User::where([['university', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($uni, $res3);
            }
        }
        json_encode($uni);
        array_push($all, $uni);

        $res =User::select('courses')->where('id', $id)->get();
        $course=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['courses'], true) as $fav1 ){
            $res3 =courses::where('id', $fav1)->get();
            $wordlist = User::where([['courses', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($course, $res3);
            }
        }
        json_encode($course);
        array_push($all, $course);

        $res =User::select('years')->where('id', $id)->get();
        $year=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['years'], true) as $fav1 ){
            $res3 =years::where('id', $fav1)->get();
            $wordlist = User::where([['years', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($year, $res3);
            }
        }
        json_encode($year);
        array_push($all, $year);

        $res =User::select('language')->where('id', $id)->get();
        $lang=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['language'], true) as $fav1 ){
            $res3 =languages::where('id', $fav1)->get();
            $wordlist = User::where([['language', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($lang, $res3);
            
            }
        }
        json_encode($lang);
        array_push($all, $lang);

        $res =User::select('projects')->where('id', $id)->get();
        $project=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['projects'], true) as $fav1 ){
            $res3 =projects::where('id', $fav1)->get();
            $wordlist = User::where([['projects', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($project, $res3);
            }
        }
        json_encode($project);
        array_push($all, $project);
        return json_encode($all);
    }
    public function getpicx(Request $request)
    {
        $id = $request['id'][0];
        $source= profilepics::where('user_id', $id)->first();
        if ($source == NULL) {
            $res="nothing";
        }
        else{
            $res = profilepics::select('source')->where('user_id', $id)->get();
        }
        return $res;
    }
    public function getallx(Request $request)
    {
        $id = $request['id'][0];
        $all=json_decode('[]', true);
        $res9 = User::select('firstname', 'lastname', 'email', 'age', 'extra_info')->where('id', $id)->get();
        array_push($all, $res9);

        $res =User::select('university')->where('id', $id)->get();
        $uni=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['university'], true) as $fav1 ){
            $res3 =university::where('id', $fav1)->get();
            $wordlist = User::where([['university', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($uni, $res3);
            }
        }
        json_encode($uni);
        array_push($all, $uni);

        $res =User::select('courses')->where('id', $id)->get();
        $course=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['courses'], true) as $fav1 ){
            $res3 =courses::where('id', $fav1)->get();
            $wordlist = User::where([['courses', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($course, $res3);
            }
        }
        json_encode($course);
        array_push($all, $course);

        $res =User::select('years')->where('id', $id)->get();
        $year=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['years'], true) as $fav1 ){
            $res3 =years::where('id', $fav1)->get();
            $wordlist = User::where([['years', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($year, $res3);
            }
        }
        json_encode($year);
        array_push($all, $year);

        $res =User::select('language')->where('id', $id)->get();
        $lang=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['language'], true) as $fav1 ){
            $res3 =languages::where('id', $fav1)->get();
            $wordlist = User::where([['language', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($lang, $res3);
            
            }
        }
        json_encode($lang);
        array_push($all, $lang);

        $res =User::select('projects')->where('id', $id)->get();
        $project=json_decode('[]', true);
        foreach ($res as $fav) {
            foreach(json_decode($fav['projects'], true) as $fav1 ){
            $res3 =projects::where('id', $fav1)->get();
            $wordlist = User::where([['projects', 'LIKE', '%'.$fav1.'%'], ['teacher', 'true']])->get();
            $wordCount = $wordlist->count()-1;
            $res3=json_decode($res3, true);
            array_push($res3, $wordCount);
            array_push($project, $res3);
            }
        }
        json_encode($project);
        array_push($all, $project);
        return json_encode($all);
    }
    public function universityup()
    {
        //
        $id = Auth::user()->id;
        $res = User::select('university')->where('id',$id)->get();
        return $res=json_decode($res, true);

    }
    public function projectup()
    {
        //
        $id = Auth::user()->id;
        $res = User::select('projects')->where('id',$id)->get();
        return $res=json_decode($res, true);

    }
    public function courseup()
    {
        //
        $id = Auth::user()->id;
        $res = User::select('courses')->where('id',$id)->get();
        return $res=json_decode($res, true);

    }
    public function yearup()
    {
        //
        $id = Auth::user()->id;
        $res = User::select('years')->where('id',$id)->get();
        return $res=json_decode($res, true);

    }
    public function languageup()
    {
        $id = Auth::user()->id;
        $res = User::select('language')->where('id',$id)->get();
        return $res=json_decode($res, true);;

    }
    public function others()
    {
        $id = Auth::user()->id;
        $res = User::select('firstname','lastname','phonenumber','age', 'extra_info','email')->where('id',$id)->get();
        return $res->toJson();

    }
    public function store(Request $request)
    {
        $id = Auth::user()->id;
        $user= User::findOrFail($id);
        $user->firstname = $request['first'];
        $user->lastname = $request['last'];
        $user->phonenumber = $request['phone'];
        $user->age = $request['age'];
        if($request['uni'][0]['id']!=null){
        $uni=json_decode('[]', true);
        foreach ($request['uni'] as $fav) {
            array_push($uni, $fav['id']);                                    
        }
        $user->university = $uni;
        }
        else{
            $user->university = $request['uni'];
        }

        $user->extra_info = $request['info'];

        if($request['course'][0]['id']!=null){
        $course=json_decode('[]', true);
        foreach ($request['course'] as $fav) {
            array_push($course, $fav['id']);                                    
        }
        $user->courses = $course;
        }
        else{
            $user->courses = $request['course'];
        }
        if($request['year'][0]['id']!=null){
        $year=json_decode('[]', true);
        foreach ($request['year'] as $fav) {
            array_push($year, $fav['id']);                                    
        }
        $user->years = $year;
        }
        else{
            $user->years = $request['year'];
        }
        if($request['project'][0]['id']!=null){
        $project=json_decode('[]', true);
        foreach ($request['project'] as $fav) {
            array_push($project, $fav['id']);                                    
        }
        $user->projects = $project;
        }
        else{
            $user->projects = $request['project'];
        }
        if($request['lang'][0]['id']!=null){
        $lang=json_decode('[]', true);
        foreach ($request['lang'] as $fav) {
            array_push($lang, $fav['id']);                                    
        }
        $user->language = $lang;
        }
        else{
            $user->language = $request['lang'];
        }
        $user->save();
        return $user->toJson();
    }
    public function savecourse(Request $request)
    {
        $id = Auth::user()->id;
        $fileupload = new coursefiles();
        $fileupload->source='images/courses/'.$request->get('name');
        $fileupload->user_id=$id;
        $fileupload->coursename=$request->get('coursename');
        $fileupload->language=$request->get('lang')[0]['id'];
        $fileupload->course=$request->get('course')[0]['id'];
        $fileupload->year=$request->get('year')[0]['id'];
        $fileupload->info=$request->get('info');
        $fileupload->save();
        return $fileupload->toJson();
    }
    public function storeimage(Request $request)
    {
        if($request->get('file'))
       {
          $image = $request->get('file');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          Image::make($request->get('file'))->save(public_path('images/').$name);
          
        }

        $text = $request->get('text');
        $description = $request->get('description');
        $id = Auth::user()->id;
        $fileupload = new blog();
        $fileupload->source='/images/'.$name;
        $fileupload->user_id=$id;
        $fileupload->toptext=$text;
        $fileupload->bottomtext=$description;
        $fileupload->save();
        $res='/images/'.$name;
        return $res;

    }
    public function storecourse(Request $request)
    {
        $res='';
        if($request->get('file'))
       {
          $file = $request->get('file');
          $name = $request->get('name');
          $pref = \File::extension($name);
          $namefile = '_'.time().'.'.$pref;
          $destinationPath = public_path('images/courses/') .$namefile;
            if(file_put_contents($destinationPath, file_get_contents($file))){
            $res=$namefile;
            }
        }
        return $res;

    }
    public function downloadcourse(Request $request)
    {
        $res='';
        $st = $request->get('source');
        if($st)
        {
          $res = file_get_contents($st);
        }
        return $res;

    }
    
    public function getallimages()
    {
        $id = Auth::user()->id;
        $res = blog::select('source', 'toptext', 'id' , 'bottomtext')->where('user_id', $id)->get();
        return $res->toJson();
    }
    public function getallimagesx(Request $request)
    {
        $id = $request['id'][0];
        $res = blog::select('source', 'toptext', 'id', 'bottomtext')->where('user_id', $id)->get();
        return $res->toJson();
    }
    public function remove(Request $request)
    {
        $res=blog::destroy($request->get('file'));
        return $res;

    }
    public function removecourse(Request $request)
    {
        $res=coursefiles::destroy($request->get('id'));
        return $res;

    }
}
