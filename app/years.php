<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class years extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['name'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
