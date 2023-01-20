<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class languages extends Model
{
    //
    protected $primaryKey = 'id';
    protected $fillable = ['name'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
