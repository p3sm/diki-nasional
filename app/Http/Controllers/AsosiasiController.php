<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asosiasi;

class AsosiasiController extends Controller
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

    public function apiGetList()
    {
      $asosiasi = Asosiasi::all();

    	return response()->json($asosiasi, 200);
    }
}
