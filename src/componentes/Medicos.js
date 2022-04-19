import React, {Fragment, useEffect, useState} from 'react';
import Header from "./Headers/Header";
import Agregar from "./iconos/Agregar";
import Modal from "./Modal";
import DatosMedico from "./DatosMedico";
import {Link} from "react-router-dom";

function Medicos(){

    const [medicos, setMedicos] = useState([])
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        const allDoctors = async() => {
            const response = await fetch('http://localhost:4000/doctors')
            const parsed = await response.json();
            setMedicos(parsed);
        }
        allDoctors();
    });

    return(
        <Fragment>
            <Header color="h-violeta" titulo="Médicos" />
            <span className="cerrar"><Link to="/">Cerrar modal</Link></span>
            <div className="s-medicos box">
                <div className="content">

                <p>Listado de médicos a los cuales concurre:</p>
                    {medicos.length == 0 && <p className="sin-datos">No ha agregado ningún médico aún.</p>}

                    {
                        medicos.map(medico =>(
                            <DatosMedico
                                key={medico.id}
                                nombre={medico.name}
                                especialidad={medico.specialty}
                                direccion={medico.direction}
                                telefono={medico.phone}
                                otros={medico.others}
                            />
                        ))
                    }

                    {modal && <Modal
                        titulo="Nuevo médico"
                        color="h-violeta headerSec"
                        setModal={setModal}
                        formulario="medico"
                    />}
                </div>
                <Agregar  setModal={setModal} boton="Agregar médico" color="agregar nja" />
            </div>

        </Fragment>

    );
}

export default Medicos;