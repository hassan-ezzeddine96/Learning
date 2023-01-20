<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class favorites extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'teacher_id'];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
