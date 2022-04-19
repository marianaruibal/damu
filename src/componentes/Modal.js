import React, {useState} from 'react';
import HeaderSecundario from "./Headers/HeaderSecundario";
import FormularioMedico from "./Formularios/FormularioMedico";
import FormularioMedicacion from "./Formularios/FormularioMedicacion";
import CerrarModal from "./iconos/CerrarModal";
import FormularioDiagnostico from "./Formularios/FormularioDiagnostico";
<HeaderSecundario titulo="Nuevo médico" color="h-violeta headerSec"/>

function Modal(props){

    return(
        <div className="mi-modal">
            <HeaderSecundario titulo={props.titulo} color={props.color}/>
            <CerrarModal setModal={props.setModal}/>

            {props.formulario == 'medico'?
                <FormularioMedico/> :
                props.formulario == 'medicacion'?
                    <FormularioMedicacion/> :
                    props.formulario == 'diagnostico'?
                        <FormularioDiagnostico/>:
                    null
            }

        </div>
    );
}
export default Modal;