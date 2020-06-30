<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ApprovalTransaction extends Model
{
  protected $table = 'approval_transaction';
    
  public function team()
  {
    return $this->belongsTo('App\Team', 'team_id');
  }
    
  public function provinsi()
  {
    return $this->belongsTo('App\Provinsi', 'id_propinsi_reg');
  }
    
  public function kualifikasi()
  {
    return $this->belongsTo('App\Kualifikasi', 'id_kualifikasi');
  }
}
