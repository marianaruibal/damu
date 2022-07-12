import React from 'react';

function Agregar(props){

    const handleOnClick = () => {
        props.setModal(true);
    }

    return(
        <div className="button">
            <span onClick={handleOnClick} className={props.color}>{props.boton}</span>

        </div>
    );
}
export default Agregar;