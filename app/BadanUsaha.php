<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BadanUsaha extends Model
{
  protected $table = 'badan_usaha';
    
  public function asosiasi()
  {
    return $this->belongsTo('App\Asosiasi', 'asosiasi_id');
  }
}
