import React, {useState} from 'react';
import {auth, db} from "../../firebase/firebase.config";

import {doc,  deleteDoc, getDocs, collection, getDoc, where} from "firebase/firestore";

function BotonEditar(props){
    //console.log(props.setModalEditar);

    const user = auth?.currentUser?.uid;
    const handleOnClick = () => {
        props.setModalEditar(true);
    }


    return(
        <>
            <button className="boton-editar" onClick={handleOnClick}>Editar</button>
        </>
    );
}
export default BotonEditar;