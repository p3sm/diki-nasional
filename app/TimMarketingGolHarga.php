<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimMarketingGolHarga extends Model
{
  protected $connection = 'mysql';
  protected $table = 'tim_marketing_gol_harga';
  protected $primaryKey = 'id';
    
  public function detail()
  {
    return $this->hasMany('App\TimMarketingGolHargaDetail', 'gol_harga_id');
  }
}
