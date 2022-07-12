import React, {Fragment} from 'react';

function CerrarModal(props){

    const handleOcultarModal = () => {
        if(props.setModalEditar){
            props.setModalEditar(false);
        }else{
            props.setModal(false);
        }

    }

    return(
            <Fragment>
                <span className="cerrar" onClick={handleOcultarModal}>Cerrar modal</span>
            </Fragment>
    );
}
export default CerrarModal;