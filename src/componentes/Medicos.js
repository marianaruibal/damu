import React, {Fragment, useEffect, useState} from 'react';
import Header from "./Headers/Header";
import Agregar from "./iconos/Agregar";
import Modal from "./Modal";
import ModalEditar from "./ModalEditar";
import {Link} from "react-router-dom";
import {auth, db} from "../firebase/firebase.config";
import {collection, getDocs} from "firebase/firestore";
import BotonEliminar from "./iconos/BotonEliminar";
import BotonEditar from "./iconos/BotonEditar";

function Medicos(){

    const user = auth?.currentUser?.uid;

    const [medicos, setMedicos] = useState([])
    const [modal, setModal] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    useEffect(()=>{
        const getDoctor = async()=>{
            try{
                const querySnapshot = await getDocs(collection(db, 'users', user, 'doctors'));
                const docs = [];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id: doc.id});
                });
                setMedicos(docs);
            }catch(error){
                console.log(error);
            }

        }
        getDoctor();
    },[medicos])

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
                            <div className="datos-secciones" key={medico.id}>
                                <ul>
                                    <li><span>{medico.specialty}:</span> {medico.name}</li>
                                    <li><span>Dirección:</span> {medico.direction}</li>
                                    <li><span>Telefono:</span> {medico.phone}</li>
                                    <li><span>Otros datos:</span> {medico.others}</li>
                                </ul>
                                <div>
                                    <BotonEliminar id={medico.id} collection={'doctors'}/>
                                    <BotonEditar setModalEditar={setModalEditar}/>
                                </div>

                                {modalEditar &&
                                <ModalEditar
                                    titulo="Editar médico"
                                    color="h-naranja headerSec"
                                    setModalEditar={setModalEditar}
                                    formulario="medico"
                                    id={medico.id}
                                />}

                            </div>
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