import React from 'react';
import HeaderSecundario from "./Headers/HeaderSecundario";
import FormularioMedicoEdit from "./Formularios/FormuladioMedicoEdit";
import FormularioMedicacionEdit from "./Formularios/FormularioMedicacionEdit";
import CerrarModal from "./iconos/CerrarModal";
import FormularioDiagnosticoEdit from "./Formularios/FormularioDiagnosticoEdit";


function ModalEditar(props){

    return(
        <div className="mi-modal">
            <HeaderSecundario titulo={props.titulo} color={props.color}/>
            <CerrarModal setModalEditar={props.setModalEditar}/>

            {props.formulario === 'medico'?
                <FormularioMedicoEdit id={props.id} setModalEditar={props.setModalEditar}/> :
                props.formulario === 'medicacion'?
                    <FormularioMedicacionEdit id={props.id} setModalEditar={props.setModalEditar}/> :
                    props.formulario === 'diagnostico'?
                        <FormularioDiagnosticoEdit id={props.id} setModalEditar={props.setModalEditar}/>:
                        null
            }

        </div>
    );
}
export default ModalEditar;