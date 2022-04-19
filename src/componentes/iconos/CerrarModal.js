import React, {Fragment} from 'react';

function CerrarModal({setModal}){

    const handleOcultarModal = () => {
        setModal(false);
    }

    return(
            <Fragment>
                <span className="cerrar" onClick={handleOcultarModal}>Cerrar modal</span>
            </Fragment>
    );
}
export default CerrarModal;