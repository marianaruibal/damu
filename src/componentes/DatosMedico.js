import React, {useState} from 'react';

function DatosMedico(props){

    const {nombre, especialidad, direccion, telefono, otros, id} = props;

    return(
        <div className="datos-secciones">
            <ul>
                <li><span>{especialidad}:</span> {nombre}</li>
                <li><span>Dirección:</span> {direccion}</li>
                <li><span>Telefono:</span> {telefono}</li>
                <li><span>Otros datos:</span> {otros}</li>
            </ul>

        </div>
    );
}
export default DatosMedico;