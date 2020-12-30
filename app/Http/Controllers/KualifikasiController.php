<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Kualifikasi;

class KualifikasiController extends Controller
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
    public function index()
    {
        // return view('personal/index');
    }

    public function apiGetList(Request $request)
    {
      if($request->profesi && $request->profesi == 1){
        if(Auth::user()->tipe_akun == 3 && Auth::user()->marketing->kualifikasi_type == "UTAMA"){
          $kualifikasi = Kualifikasi::where("id", 1)->get();
        } else {
          $kualifikasi = Kualifikasi::where("id", "!=", 1)->get();
        }
      } else {
        $kualifikasi = Kualifikasi::all();
      }

    	return response()->json($kualifikasi, 200);
    }
}
