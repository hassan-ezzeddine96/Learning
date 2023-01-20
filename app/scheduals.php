<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class scheduals extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['users', 'key'];
    public $timestamps = false;
}
