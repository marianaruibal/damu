import React, {Fragment, useEffect, useState} from 'react';
import Header from "./Headers/Header";
import Agregar from "./iconos/Agregar";
import Modal from "./Modal";
import ModalEditar from "./ModalEditar";
import {Link} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../firebase/firebase.config";
import BotonEliminar from "./iconos/BotonEliminar";
import BotonEditar from "./iconos/BotonEditar";

function Diagnostico(){

    const user = auth?.currentUser?.uid;

    const [diagnostico, setDiagnostico] = useState([])
    const [modal, setModal] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    useEffect(()=>{
        const getDiagnosis = async()=>{
            try{
                const querySnapshot = await getDocs(collection(db, 'users', user, 'diagnosis'));
                const docs = [];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id: doc.id});
                });
                setDiagnostico(docs);
            }catch(error){
                console.log(error);
            }

        }
        getDiagnosis();
    },[diagnostico])

    return(
        <Fragment>
            <Header color="h-violeta" titulo="Mis diagnósticos" />
            <span className="cerrar"><Link to="/">Cerrar modal</Link></span>
            <div className="s-medicos box">
                <div className="content">

                    <p>Listado de diagnósticos:</p>
                    {diagnostico.length === 0 && <p className="sin-datos">No ha agregado ningún diagnóstico aún.</p>}

                    {
                        diagnostico.map(diagnostico =>(
                            <div className="datos-secciones" key={diagnostico.id}>
                            <ul>
                                <li><span>Diagnóstico: </span>{diagnostico.diagnosis}</li>
                                <li><span>Fecha del diagnóstico:</span> {diagnostico.date}</li>
                                <li><span>Médico responsable del diagnóstico:</span> {diagnostico.doctor}</li>
                                <li><span>Otros datos:</span> {diagnostico.others}</li>
                            </ul>
                                <div>
                                    <BotonEliminar id={diagnostico.id} collection={'diagnosis'}/>
                                    <BotonEditar setModalEditar={setModalEditar}/>

                                </div>

                                {modalEditar &&
                                <ModalEditar
                                    titulo="Editar diagnóstico"
                                    color="h-naranja headerSec"
                                    setModalEditar={setModalEditar}
                                    formulario="diagnostico"
                                    id={diagnostico.id}
                                />}
                        </div>
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