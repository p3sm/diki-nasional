<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\ApiKey;
use App\User;
use App\Pengajuan99;
use App\PersonalRegTA;
use Carbon\Carbon;

class Pengajuan99Controller extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function naik()
    {
        return view('pengajuan_99/index');
        // return view('pengajuan_99/indexSKA');
    }
    public function delete()
    {
        return view('pengajuan_99/delete');
    }

    public function apiGetList(Request $request)
    {
      $pengajuan = PersonalRegTA::where('created_by', Auth::user()->id);
      
      if($request->from) $pengajuan->where('Tgl_Registrasi', '>=', Carbon::createFromDate($request->from));
      
      if($request->to) $pengajuan->where('Tgl_Registrasi', '<=', Carbon::createFromDate($request->to));
      
      if($request->provinsi) $pengajuan->where('ID_Propinsi_reg', $request->provinsi);
      
      if($request->asosiasi) $pengajuan->where('ID_Asosiasi_Profesi', $request->asosiasi);

      $pengajuan = $pengajuan->get();

      foreach($pengajuan as $value){
          $value->personal;
          $value->provinsi;
      }

        return response()->json($pengajuan, 200);
    }
}
