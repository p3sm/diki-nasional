<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\ApiKey;
use App\User;
use App\ApprovalTransaction;
use App\PersonalRegTA;
use App\PersonalRegTT;
use Carbon\Carbon;

class ReportController extends Controller
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
        return view('report/index');
        // return view('pengajuan_99/indexSKA');
    }

    public function apiGetList(Request $request)
    {
      $transaction = ApprovalTransaction::where('owner', Auth::user()->id);
      
      if($request->from) $transaction->where('tgl_registrasi', '>=', Carbon::createFromDate($request->from));
      
      if($request->to) $transaction->where('tgl_registrasi', '<=', Carbon::createFromDate($request->to));
      
      if($request->sertifikat) $transaction->where('tipe_sertifikat', $request->sertifikat);
      
      if($request->provinsi) $transaction->where('id_propinsi_reg', $request->provinsi);
      
      if($request->asosiasi) $transaction->where('id_asosiasi_profesi', $request->asosiasi);

      $transaction = $transaction->get();

      return response()->json($transaction, 200);
    }
}
