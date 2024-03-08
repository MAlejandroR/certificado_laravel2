import './bootstrap';
import '../css/app.css';

import React from 'react';
import {createRoot} from 'react-dom/client';
import EditarAlumno from './Pages_React/EditarAlumno';
import Tabla1 from './Pages_React/Tabla1.jsx';
import Tabla2 from './Pages_React/Tabla2.jsx';

const react_tabla1 = document.getElementById("react-tabla1");
const react_tabla2 = document.getElementById("react-tabla2");
const react_editarAlumno = document.getElementById("react-editar-alumno");

if (react_tabla1) {
    const n = react_tabla1.getAttribute("data-numero");
    createRoot(react_tabla1).render(<Tabla1 numero={n}/>);
}
if (react_tabla1)
    createRoot(react_tabla2).render(<Tabla2/>);
if (react_editarAlumno) {
    const alumnoInicial = JSON.parse(react_editarAlumno.getAttribute('data-alumnoInicial'));
    const idiomasDisponibles = JSON.parse(react_editarAlumno.getAttribute('data-idiomasDisponibles'));
    createRoot(react_editarAlumno).render(<EditarAlumno
        alumnoInicial={alumnoInicial}
        idiomasDisponibles={idiomasDisponibles}
    />);
}

// if (document.getElementById("react-tabla1"))
//     createRoot(document.getElementById("react-tabla1")).render(<Tabla1 />)
// if (document.getElementById("react-tabla2"))
//     createRoot(document.getElementById("react-tabla2")).render(<Tabla2 />)
//
// const react_root = document.getElementById('root');
// const root = createRoot(react_root); // Crea un root
//  root.render(<Tabla1 />);
//  root.render(<Tabla2 />);
//  root.render(<EditarAlumno />);
//


{/*console.log("estoy en app con editar alumno "+editarAlumnoEl.title)*/
}

{/*// Asegúrate de que el elemento existe*/
}


{/*    // const idiomasDisponibles = JSON.parse(editarAlumnoEl.getAttribute('data-idiomasdisponibles'));*/
}

{/*    // Utiliza createRoot para montar el componente*/
}

{/*    root.render(*/
}
{/*        <EditarAlumno*/
}
{/*            alumnoInicial={alumnoInicial}*/
}
{/*            idiomasDisponibles={idiomasDisponibles}*/
}
{/*        />*/
}
{/*    );*/
}
{/*}*/
}
