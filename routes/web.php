<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/university', 'Start@university');
Route::get('/projects', 'Start@project');
Route::get('/courses', 'Start@course');
Route::get('/languages', 'Start@language');
Route::get('/years', 'Start@year');
Route::get('/check', 'Start@check');
Route::get('/check2', 'Start@check2');
Route::get('/getnumberstudentsin', 'Start@getnumberstudentsin');
Route::get('/getstudentsin', 'Start@getstudentsin');
Route::get('/getnumberstudents', 'Start@getnumberstudents');
Route::get('/getnumberteachers', 'Start@getnumberteachers');
Route::post('/teacher', 'Start@store');


Route::post('/profile', 'ProfileController@storepic');
Route::get('/profil', 'ProfileController@getpic');
Route::get('/all', 'ProfileController@getall');
Route::post('/profilx', 'ProfileController@getpicx');
Route::post('/allx', 'ProfileController@getallx');
Route::get('/universityup', 'ProfileController@universityup');
Route::get('/projectsup', 'ProfileController@projectup');
Route::get('/coursesup', 'ProfileController@courseup');
Route::get('/yearsup', 'ProfileController@yearup');
Route::get('/languageup', 'ProfileController@languageup');
Route::get('/others', 'ProfileController@others');
Route::post('/teacherupdate', 'ProfileController@store');
Route::post('/teachercourse', 'ProfileController@savecourse');
Route::post('/fileupload', 'ProfileController@storeimage');
Route::get('/pics', 'ProfileController@getallimages');
Route::post('/picsx', 'ProfileController@getallimagesx');
Route::post('/remove', 'ProfileController@remove');
Route::post('/removecourse', 'ProfileController@removecourse');
Route::post('/courseupload', 'ProfileController@storecourse');
Route::post('/downloadcourse', 'ProfileController@downloadcourse');


Route::get('/suniversity', 'SearchController@university');
Route::get('/slanguage', 'SearchController@language');
Route::get('/sprojects', 'SearchController@project');
Route::get('/scourses', 'SearchController@course');
Route::get('/syears', 'SearchController@year');
Route::post('/searchresult', 'SearchController@search');
Route::post('/searchresultcourses', 'SearchController@searchresultcourses');
Route::post('/favorite', 'SearchController@favorite');
Route::post('/checkx', 'SearchController@checkx');
Route::get('/favx', 'SearchController@favx');
Route::post('/rem', 'SearchController@rem');
Route::post('/chat', 'SearchController@chat');
Route::post('/checkchat', 'SearchController@checkchat');
Route::post('/sender', 'SearchController@sender');
Route::get('/rating', 'SearchController@rating');
Route::post('/searchlang', 'SearchController@searchlang');
Route::post('/searchcourse', 'SearchController@searchcourse');
Route::post('/searchyear', 'SearchController@searchyear');
Route::post('/searchuni', 'SearchController@searchuni');
Route::post('/searchproject', 'SearchController@searchproject');
Route::post('/searchlangs', 'SearchController@searchlangs');
Route::post('/searchcourses', 'SearchController@searchcourses');
Route::post('/searchyears', 'SearchController@searchyears');
Route::post('/searchunis', 'SearchController@searchunis');
Route::post('/searchprojects', 'SearchController@searchprojects');
Route::get('/searchallteachers', 'SearchController@searchallteachers');
Route::get('/searchallcourses', 'SearchController@searchallcourses');
Route::get('/searchallmycourses', 'SearchController@searchallmycourses');
Route::post('/searchallmycoursesx', 'SearchController@searchallmycoursesx');

Route::get('/days', 'SchedualController@days');
Route::post('/checkschedual', 'SchedualController@checkschedual');
Route::post('/names', 'SchedualController@names');
Route::post('/schedual', 'SchedualController@schedual');
Route::get('/checkschedualt', 'SchedualController@checkschedualt');
Route::post('/daysonly', 'SchedualController@daysonly');
Route::get('/checklistschedual', 'SchedualController@checklistschedual');
Route::get('/checklistchat', 'SchedualController@checklistchat');






