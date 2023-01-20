<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class blog extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'source','share', 'toptext', 'bottomtext'];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
