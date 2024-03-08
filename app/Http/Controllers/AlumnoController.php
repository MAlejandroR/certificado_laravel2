<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlumnoRequest;
use App\Http\Requests\UpdateAlumnoRequest;
use App\Models\Alumno;
use Illuminate\Http\Request;



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
        //Necesito serializarlo para pasarlo al js
        $alumnoJson = $alumno->toJson();
        $idiomasDisponiblesJson=json_encode($idiomas_disponibles);
        return view ("alumnos.edit", compact("alumnoJson","idiomasDisponiblesJson"));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        info ("Estoy en update");

        $alumno = Alumno::findOrFail($id);
        info($alumno);
        $datos = $request->input();
        info ($datos);
        $alumno->update($datos);
        info ($alumno);



        $alumnos = Alumno::paginate(10);

        return view ("alumnos.listado",["alumnos"=>$alumnos]);

        // Aquí deberías manejar la actualización de los idiomas relacionados

        // Esto podría implicar eliminar idiomas existentes, agregar nuevos, etc.


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
