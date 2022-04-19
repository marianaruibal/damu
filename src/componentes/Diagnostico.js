import React, {Fragment, useEffect, useState} from 'react';
import Header from "./Headers/Header";
import Agregar from "./iconos/Agregar";
import Modal from "./Modal";
import DatosDiagnostico from "./DatosDiagnostico";
import {Link} from "react-router-dom";

function Diagnostico(){

    const [diagnostico, setDiagnostico] = useState([])
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        const allDiagnosis = async() => {
            const response = await fetch('http://localhost:4000/diagnosis')
            const parsed = await response.json();
            setDiagnostico(parsed);
        }
        allDiagnosis();
    });

    return(
        <Fragment>
            <Header color="h-violeta" titulo="Mis diagnósticos" />
            <span className="cerrar"><Link to="/">Cerrar modal</Link></span>
            <div className="s-medicos box">
                <div className="content">

                    <p>Listado de diagnósticos:</p>
                    {diagnostico.length == 0 && <p className="sin-datos">No ha agregado ningún diagnóstico aún.</p>}

                    {
                        diagnostico.map(diagnostico =>(
                            <DatosDiagnostico
                                key={diagnostico.id}
                                diagnostico={diagnostico.diagnosis}
                                fecha={diagnostico.date}
                                doctor={diagnostico.doctor}
                                otros={diagnostico.others}
                            />
                        ))
                    }

                    {modal && <Modal
                        titulo="Nuevo diagnóstico"
                        color="h-violeta headerSec"
                        setModal={setModal}
                        formulario="diagnostico"
                    />}
                </div>
                <Agregar  setModal={setModal} boton="Agregar diagnóstico" color="agregar nja" />
            </div>

        </Fragment>

    );
}

export default Diagnostico;