import React, {useContext, useState} from 'react';
import Header from "../Headers/Header";
import {UserContext} from "../../context/UserProvider";
import {Link, useNavigate} from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import {auth, db} from "../../firebase/firebase.config";
import {doc, getDoc, setDoc, Timestamp} from "firebase/firestore";
import Modal from "../Modal";
import ModalContrasenia from "../ModalContrasenia";


function IniciarSesion(){

    const { loginUser } = useContext(UserContext);

    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const [modal, setModal] = useState(false);

    const navegate = useNavigate();

    function handleFormControl(ev){
        const name = ev.target.name;
        setData({
            ...data,
            [name]:ev.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log('usuario loggeado: ', data.email, data.password);
        const localErrors = {};

        if(!data.email){
            localErrors.email = "El campo email es obligatorio" ;
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)){
            localErrors.email = "El email ingresado no es válido" ;
        }

        if(!data.password){
            localErrors.password = "El campo contraseña es obligatorio";
        }else if(data.password.length < 6 ){
            localErrors.password = "La contraseña debe tener al menos 6 carácteres"
        }

        if(Object.entries(localErrors).length > 0){
            setErrors(localErrors);
            console.log(localErrors);
            return;
        }
        setErrors({});

        fetchUser();
    }

    async function fetchUser(){
        try{
            await loginUser(data.email, data.password);
            navegate("/");
        }catch(error){
            console.log(error.message);
        }
    }
    function singInWithGoogle(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((response)=>{
                const docRef = doc(db, "users", response.user.uid);
                const docSnap = getDoc(docRef);
                console.log(response);
                if(docSnap.exists){
                    console.log('El usuario existe');
                }else{
                    setDoc(doc(db, "users", response.user.uid),{
                        uid: response.user.uid,
                        name: response._tokenResponse.firstName,
                        surname: response._tokenResponse.lastName,
                        email: response.user.email,
                        online: true,
                        createdAt: Timestamp.fromDate(new Date())

                    })
                }
                return navegate("/");;
            })
    }

    const handleForgetPassword = ()=>{
        setModal(true);
        if(data.email){
            sendPasswordResetEmail(auth, data.email)
        }
    }

    return(
        <div className="iniciar-sesion">
            <Header color="h-violeta" titulo='Damu' logo="logo"/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleFormControl}
                        aria-describedby={errors.email? "error-email" : null}
                    />
                    {errors.email &&
                    <div id="error-email" className="errors-validation">
                        <span>Error:</span>
                        <span>{errors.email}</span>
                    </div>
                    }
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={data.password}
                        onChange={handleFormControl}
                        aria-describedby={errors.password? "error-password" : null}
                    />
                    {errors.password &&
                    <div id="error-password" className="errors-validation">
                        <span>Error:</span>
                        <span>{errors.password}</span>
                    </div>
                    }
                    <p>¿Olvidaste la contraseña? <span onClick={handleForgetPassword} className="orange">Haz click aquí</span></p>


                </div>

                <input type="submit" value="Iniciar Sesion"/>
            </form>
            {modal &&
            <ModalContrasenia
                setModal={setModal}
            />}

            <div className="button-user">
                <Link to="/registro">Registrarse</Link>
            </div>
            <div className="button-user">
                <button onClick={singInWithGoogle}>Iniciar sesión con Google</button>
            </div>
        </div>
    );
}
export default IniciarSesion;