import React, {Fragment, useEffect, useState} from "react";
import Header from "./Headers/Header";
import {Link} from "react-router-dom";
import Modal from "./Modal";
import Agregar from "./iconos/Agregar";
import DatosMedicacion from "./DatosMedicacion";

function Medicacion(){

    const [medicamentos, setMedicamentos] = useState([])
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        const allMedicines = async() => {
            const response = await fetch('http://localhost:4000/medicines')
            const parsed = await response.json();
            setMedicamentos(parsed);
        }
        allMedicines();
    });

    return(
        <Fragment>
            <Header color="h-naranja" titulo="Medicación" />
            <span className="cerrar"><Link to="/">Cerrar modal</Link></span>
            <div className="s-medicos box">
                <div className="content">

                    <p>Listado de medicamentos:</p>
                    {medicamentos.length == 0 &&
                    <p className="sin-datos">No ha agregado ningún medicamento aún.</p>}

                    {
                        medicamentos.map(medicamento =>(
                            <DatosMedicacion
                                key={medicamento.id}
                                nombre={medicamento.name}
                                cantidad={medicamento.amount}
                                tipo={medicamento.type}
                            />
                        ))
                    }

                    {modal &&
                    <Modal
                        titulo="Nueva medicación"
                        color="h-naranja headerSec"
                        setModal={setModal}
                        formulario="medicacion"
                    />}
                </div>
                <Agregar  setModal={setModal} boton="Agregar medicación" color="agregar vta" />
            </div>

        </Fragment>
    );
}

export default Medicacion;