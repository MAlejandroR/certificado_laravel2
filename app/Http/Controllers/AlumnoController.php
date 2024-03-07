<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlumnoRequest;
use App\Http\Requests\UpdateAlumnoRequest;
use App\Models\Alumno;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $alumnos = Alumno::paginate(3);
         return view("alumnos.listado",["alumnos"=> $alumnos]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view ("alumnos.create");
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAlumnoRequest $request)
    {

        $valores =  $request->input();
        $alumno = new Alumno($valores);
        $alumno->save();
        session()->flash("status", "Se ha creado el alumno $alumno->nombre");
        $alumnos = Alumno::all();

        return view ("alumnos.listado",["alumnos"=>$alumnos]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Alumno $alumno)
    {
        return view ("alumnos.show", compact("alumno"));
    }

    /**
     * Show the form for editing the specified resource.
     */

        public function edit(Alumno $alumno)
    {
        $alumno->load('idiomas');
        $idiomas_disponibles=config("idiomas.idiomas");
        $alumnoJson = $alumno->toJson();
        $idiomasDisponiblesJson=json_encode($idiomas_disponibles);
        return view ("alumnos.edit", compact("alumnoJson","idiomasDisponiblesJson"));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAlumnoRequest $request, int $id)
    {


        $alumno = Alumno::findOrFail($id);

        $alumno->update($request->all());
        $datos = $request->input();
        info ("request $datos");
        info ("alumno $alumno");

        // Aquí deberías manejar la actualización de los idiomas relacionados

        // Esto podría implicar eliminar idiomas existentes, agregar nuevos, etc.


        return response()->json(['message' => 'Alumno actualizado con éxito', 'data' => $alumno]);
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alumno $alumno)
    {
        $alumno->delete();
        $alumnos = Alumno::all();
        return view ("alumnos.listado",["alumnos"=>$alumnos]);




    }
}
