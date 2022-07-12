import React, {Fragment, useEffect, useState} from "react";
import Header from "./Headers/Header";
import {Link} from "react-router-dom";
import Modal from "./Modal";
import ModalEditar from "./ModalEditar";
import Agregar from "./iconos/Agregar";
import {auth, db} from "../firebase/firebase.config";
import {collection, getDocs} from "firebase/firestore";
import BotonEliminar from "./iconos/BotonEliminar";
import BotonEditar from "./iconos/BotonEditar";

function Medicacion(){

    const user = auth?.currentUser?.uid;

    const [medicamentos, setMedicamentos] = useState([])
    const [modal, setModal] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    useEffect(()=>{
        const getMedicine = async()=>{
            try{
                const querySnapshot = await getDocs(collection(db, 'users', user, 'medicine'));
                const docs = [];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id: doc.id});
                });
               // console.log(docs)
                setMedicamentos(docs);
            }catch(error){
                console.log(error);
            }

        }
        getMedicine();
    },[medicamentos])

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
                            <div className="datos-secciones" key={medicamento.id}>
                                <ul>
                                    <li><span>Medicación: </span>{medicamento.name}</li>
                                    <li><span>Cantidad:</span> {medicamento.amount} {medicamento.type}</li>
                                    <li><span>Motivo/diagnóstico:</span> {medicamento.motive}</li>
                                </ul>
                                <div>
                                    <BotonEliminar id={medicamento.id} collection={'medicine'}/>
                                    <BotonEditar setModalEditar={setModalEditar}/>
                                </div>

                                {modalEditar &&
                                <ModalEditar
                                    titulo="Editar medicación"
                                    color="h-naranja headerSec"
                                    setModalEditar={setModalEditar}
                                    formulario="medicacion"
                                    id={medicamento.id}
                                />}
                            </div>
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