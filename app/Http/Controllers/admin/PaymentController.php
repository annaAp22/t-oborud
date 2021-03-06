<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function __construct() {
        $this->authorize('index', new \App\Models\Order());
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $payments = Payment::orderBy('id', 'desc')->withTrashed()->paginate(10);

        return view('admin.payments.index', ['payments' => $payments]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.payments.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(\App\Http\Requests\admin\PaymentRequest $request)
    {
        $data = $request->all();
        $data['img'] = Payment::saveImg($request);
        Payment::create($data);
        return redirect()->route('admin.payments.index')->withMessage('Способ оплаты добавлен');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $payment = Payment::findOrFail($id);
        return view('admin.payments.edit', ['payment' => $payment]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(\App\Http\Requests\admin\PaymentRequest $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $data = $request->all();
        if($img = Payment::saveImg($request)) {
            $data['img'] = $img;
            $payment->deleteImg();
        }
        $payment->update($data);
        return redirect()->route('admin.payments.index')->withMessage('Способ оплаты изменен');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Payment::destroy($id);
        return redirect()->route('admin.payments.index')->withMessage('Способ оплаты удален');
    }


    /**
     * Востановление мягко удаленной категории
     * @param $id
     * @return mixed
     */
    public function restore($id) {
        Payment::withTrashed()->find($id)->restore();
        return redirect()->route('admin.payments.index')->withMessage('Способ оплаты востановлен');
    }

}
