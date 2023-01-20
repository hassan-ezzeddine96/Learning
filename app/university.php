<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;


class university extends Model
{
    //
    protected $table = 'university';
    protected $primaryKey = 'id';
    protected $fillable = ['name'];
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
    public function user()
    {
        return $this->belongsToMany('App\User')
                        ->using('App\university')
                        ->withPivot([
                            'name',
                        ]);
    }
}
