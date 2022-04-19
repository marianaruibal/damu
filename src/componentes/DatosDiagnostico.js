import React, {useState} from 'react';

function DatosDiagnostico(props){

    const {diagnostico, fecha, doctor, otros, id} = props;

    return(
        <div className="datos-secciones">
            <ul>
                <li><span>Diagnóstico:</span>{diagnostico}</li>
                <li><span>Fecha del diagnóstico:</span> {fecha}</li>
                <li><span>Médico responsable del diagnóstico:</span> {doctor}</li>
                <li><span>Otros datos:</span> {otros}</li>
            </ul>

        </div>
    );
}
export default DatosDiagnostico;