import './bootstrap';
import '../css/app.css';

import React from 'react';
import {createRoot} from 'react-dom/client';
import EditarAlumno from './Pages_React/EditarAlumno';



const editarAlumnoEl = document.getElementById('react-editar-alumno');
console.log("estoy en app con editar alumno "+editarAlumnoEl.title)

// Asegúrate de que el elemento existe

if (editarAlumnoEl) {
    const alumnoInicial =JSON.parse( editarAlumnoEl.getAttribute('data-alumnoInicial'));
    const idiomasDisponibles = JSON.parse(editarAlumnoEl.getAttribute('data-idiomasDisponibles'));
    // console.log ("En app.jsx con alumnoInicial "+alumnoInicial);

    // const idiomasDisponibles = JSON.parse(editarAlumnoEl.getAttribute('data-idiomasdisponibles'));

    // Utiliza createRoot para montar el componente
    const root = createRoot(editarAlumnoEl); // Crea un root

    root.render(
        <EditarAlumno
            alumnoInicial={alumnoInicial}
            idiomasDisponibles={idiomasDisponibles}
        />
    );
}
