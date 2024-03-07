import React, {useState, useEffect} from 'react'

export default function EditarAlumno({alumnoInicial, idiomasDisponibles}) {


    const actualizarAlumno=async (id)=>{
        const url = `http://localhost:8000/alumnos/${id}`; // Cambia esto por la URL real de tu API
        console.log ("url "+url);
        const alumnoData = {
            nombre: alumnoInicial.nombre, // Asumiendo que estas propiedades existen en tu estado
            apellidos: alumnoInicial.apellidos,
            direccion: alumnoInicial.direccion,
            idiomas: idiomas, // Este es el estado que contiene los nombres de los idiomas
        };
        // Obtener el token CSRF del meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


        try {
            const response = await fetch(url, {
                method: 'PUT', // o 'POST', según corresponda a tu API
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken, // Incluir el token CSRF aquí
                    // Asegúrate de incluir cualquier otro header necesario, como tokens de autenticación
                },
                body: JSON.stringify(alumnoData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log('Datos actualizados con éxito:', responseData);
            // Aquí puedes manejar cualquier acción post-actualización, como mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error al actualizar los datos del alumno:', error);
        }
    }

    // console.log("EditarAlumno: alumno inicial" + alumnoInicial);
    // console.log("Editar Alumno: Idiomas Disponibles " + idiomasDisponibles);
    // alumnoInicial = JSON.parse(alumnoInicial);
    console.log("alumno inicial " + alumnoInicial.nombre);

    const [nombre, setNombre] = useState(alumnoInicial.nombre);
    const [apellidos, setApellidos] = useState(alumnoInicial.apellidos);
    const [direccion, setDireccion] = useState(alumnoInicial.direccion);

    // Estado para almacenar y actualizar los idiomas del alumno
    const [idiomas, setIdiomas] = useState([]);

    // Utiliza useEffect para establecer los idiomas una vez que el componente se monta y cuando `alumnoInicial` cambie
    useEffect(() => {
        if (alumnoInicial.idiomas && Array.isArray(alumnoInicial.idiomas)) {
            const nombresIdiomas = alumnoInicial.idiomas.map(idioma => idioma.idioma);
            setIdiomas(nombresIdiomas);
        }
    }, [alumnoInicial]);

    // Agregar un nuevo idioma al listado
    const agregarIdioma = idioma => {
        console.log("en agregarIdioma " + idioma);
        if (!idiomas.includes(idioma)) {
            setIdiomas([...idiomas, idioma]);
            console.log("en agregarIdioma  idiomas " + idiomas);
        }
    };

    // Eliminar un idioma del listado
    const eliminarIdioma = (idiomaAEliminar) => {
        console.log(`Eliminar idioma -${idiomaAEliminar}-`);
        setIdiomas(idiomas.filter(idioma => idioma !== idiomaAEliminar));
        console.log(idiomas);
    };


    return (
        <>

            <div className="card bg-base-100 shadow-xl ">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Detalles del Alumno</h2>
                    <div className="grid grid-cols-3">
                        <div className="border border-2 w-1/3">
                            <fieldset>
                                <label className="label">
                                    <span className="label-text">Nombre:</span>
                                </label>
                                <input
                                    onChange={e => setNombre(e.target.value)}
                                    type="text" name="nombre" value={nombre}
                                       className="input input-bordered input-info w-full max-w-xs"/>

                                <label className="label">
                                    <span className="label-text">Apellidos:</span>
                                </label>
                                <input
                                    onChange={e => setApellidos(e.target.value)}
                                    type="text" name="apellidos" value={apellidos}
                                       className="input input-bordered input-info w-full max-w-xs"/>

                                <label className="label">
                                    <span className="label-text">Dirección:</span>
                                </label>
                                <input
                                    onChange={e => setDireccion(e.target.value)}
                                    type="text" name="direccion" value={direccion}
                                       className="input input-bordered input-info w-full max-w-xs"/>
                            </fieldset>
                        </div>

                        <fieldset className="border border-blue-500 rounded-2xl p-5">
                            <legend>Idiomas que habla</legend>

                            {idiomas.map((idioma, index) => (
                                <div key={index} className="flex flex-row justify-between w-1/3">
                                    {idioma}
                                    <button onClick={() => eliminarIdioma(idioma)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>


                                    </button>
                                </div>))}
                            Añadir idioma

                            <select onChange={(e) => agregarIdioma(e.target.value)}>
                                <option value="" disabled>Selecciona un idioma</option>
                                {/* Asumiendo que `idiomasDisponibles` es una lista de idiomas disponibles */}
                                {idiomasDisponibles.map(idioma => (
                                    <option key={idioma} value={idioma}>{idioma}</option>
                                ))}
                            </select>
                        </fieldset>
                    </div>
                    <button onClick={()=>actualizarAlumno(alumnoInicial.id)} className="btn btn-primary">Actualizar Alumno</button>
                </div>
            </div>
        </>
    );
}
