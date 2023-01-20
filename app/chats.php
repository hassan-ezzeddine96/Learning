<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class chats extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['users', 'key'];
    public $timestamps = false;
}
