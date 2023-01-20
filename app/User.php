<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher', 'firstname', 'lasttname', 'name', 'email', 'phonenumber', 'age', 'university', 'rate', 'location', 'courses', 'years', 'projects', 'language', 'extra_info', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function university()
    {
        return $this->hasMany('App\university');
    }
    public function years()
    {
        return $this->hasMany('App\years');
    }
    public function projects()
    {
        return $this->hasMany('App\projects');
    }
    public function courses()
    {
        return $this->hasMany('App\courses');
    }
    public function favorites()
    {
        return $this->hasMany('App\favorites');
    }
    public function languages()
    {
        return $this->hasMany('App\languages');
    }
}
