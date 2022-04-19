import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import Header from "./Headers/Header";

function Menu(){
    return(
        <Fragment>
            <Header color="h-violeta" titulo='Damu' logo="logo"/>
            <div id="menu">
                <nav className="container">
                    <ul>
                        <li><Link to="/medicacion">Medicación</Link></li>
                        <li><Link to="/diagnosticos">Mis diagnósticos</Link></li>
                        <li><Link to="/medicos">Médicos</Link></li>
                        <li><Link to="#">Turnos</Link></li>
                        <li><Link to="#">Estudios</Link></li>
                        <li><Link to="#">Mi perfil</Link></li>
                    </ul>
                </nav>
            </div>
        </Fragment>

    );
}

export default Menu;