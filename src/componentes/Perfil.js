import React, {Fragment, useState} from "react";
import Header from "./Headers/Header";
import {Link, useNavigate} from "react-router-dom";
import {auth, db} from "../firebase/firebase.config";
import {signOut} from "firebase/auth";
import {updateDoc, doc} from 'firebase/firestore';

const Perfil = () => {

    const user = auth?.currentUser?.email;

    const navegate = useNavigate();

    const logOut = async()=>{
        await updateDoc(doc(db,"users", auth.currentUser.uid),{
            online: false
        });
        await signOut(auth);
        return navegate("/iniciarsesion");

    }


    return(
        <div className="perfil">
            <Header color="h-naranja" titulo='Mi perfil'/>

                <p>{ user }</p>

            <Link to="/" >Volver</Link>



            <button className="cerrar-sesion" onClick={logOut}>Cerrar Sesión</button>
        </div>
    );

}

export default Perfil;