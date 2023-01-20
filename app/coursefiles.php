<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class coursefiles extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'coursename', 'language', 'course', 'year', 'info', 'source'];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}