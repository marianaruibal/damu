import React from 'react';

function HeaderSecundario(props){
    return(
        <div className={props.color}>
            <h2>{props.titulo}</h2>
        </div>
    );
}
export default HeaderSecundario;