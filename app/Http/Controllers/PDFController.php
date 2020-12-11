<?php

namespace App\Http\Controllers;

use mikehaertl\wkhtmlto\Pdf;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PDFController extends Controller
{
    public function index(Request $request)
    {
      $pdf = new Pdf([
        'commandOptions' => ['useExec' => true],
      ]);

      if($request->or == "landscape"){
        $pdf->setOptions(array(
            'orientation' => 'landscape'
        ));
      }

      $pdf->addPage(env("APP_URL") . $request->src . "?profesi=" . $request->profesi . "&data=" . $request->data);
      // $pdf->binary = 'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf';
      $pdf->binary = '/usr/local/bin/wkhtmltopdf';

      if (!$pdf->send()) {
          $error = $pdf->getError();
          echo $error;
      }
    }
}
