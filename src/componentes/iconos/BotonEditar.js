import React from 'react';
import {auth} from "../../firebase/firebase.config";


function BotonEditar(props){


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