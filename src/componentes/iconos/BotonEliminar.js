import React from 'react';
import {auth, db} from "../../firebase/firebase.config";

import {doc,  deleteDoc} from "firebase/firestore";

function BotonEliminar(props){

    const user = auth?.currentUser?.uid;


    const deleteElement = async () =>{

        await deleteDoc(doc(db, 'users', user, props.collection , props.id));
    }

    return(
        <>
            <button className="boton-eliminar" onClick={deleteElement}>Eliminar</button>
        </>
    );
}
export default BotonEliminar;