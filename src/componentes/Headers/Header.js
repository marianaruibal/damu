import React from 'react';

function Header(props){
    return(
        <header className={props.color}>
            <h1 className={props.logo ? props.logo : ''}>{props.titulo}</h1>
        </header>
    );
}
export default Header;