import React, {useState} from 'react';

function DatosMedicacion(props){

    const {nombre, cantidad, tipo, id} = props;

    return(
        <div className="datos-secciones">
            <ul>
                <li><span>Medicación:</span>{nombre}</li>
                <li><span>Cantidad:</span> {cantidad} {tipo}</li>
            </ul>

        </div>
    );
}
export default DatosMedicacion;