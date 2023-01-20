<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class profilepics extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'source'];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
