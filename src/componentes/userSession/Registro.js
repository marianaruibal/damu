import React, {useContext, useState} from 'react';
import Header from "../Headers/Header";
import {UserContext} from "../../context/UserProvider";
import {Link, useNavigate} from "react-router-dom";


const  Registro = () => {

    const { registerUser } = useContext(UserContext);

    const [data, setData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        passRepeat: '',
    });
    const [errors, setErrors] = useState({});

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
         console.log('procesando form: ', data.email, data.password);
         const localErrors = {};

         if(!data.name){
             localErrors.name = "El campo nombre es obligatorio";
         }else if(data.name.length < 2 ){
             localErrors.name = "El nombre debe tener al menos 2 carácteres"
         }else if(data.name.length > 21 ){
             localErrors.name = "El nombre debe tener menos de 20 carácteres"
         }

         if(!data.surname){
             localErrors.surname = "El campo apellido es obligatorio";
         }else if(data.surname.length < 2 ){
             localErrors.surname = "El apellido debe tener al menos 2 carácteres"
         }else if(data.surname.length > 21 ){
             localErrors.surname = "El apellido debe tener menos de 20 carácteres"
         }

         if(!data.password){
             localErrors.password = "El campo contraseña es obligatorio";
         }else if(data.password.length < 6 ){
             localErrors.password = "La contraseña debe tener al menos 6 carácteres"
         }

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


         if(!data.passRepeat){
             localErrors.passRepeat = "El campo repetir contraseña es obligatorio";
         }else if(data.password !== data.passRepeat ){
             localErrors.passRepeat = "Las contraseñas ingresadas no son iguales"
         }

         if(Object.entries(localErrors).length > 0){
             setErrors(localErrors);
             return;
         }
         setErrors({});

         fetchUser();
     }

    async function fetchUser(){
        const localErrors = {};
        try{
           await registerUser(data.name, data.surname ,data.email, data.password);
            navegate("/iniciarsesion");
        }catch(error){
            console.log(error.code);

            switch(error.code){
                case 'auth/email-already-in-use':
                    localErrors.email = "El email ya se encuentra registrado" ;
                    break;
                case 'auth/invalid-email':
                    localErrors.email = "El email tiene un formato incorrecto" ;
                    break;
            }

            if(Object.entries(localErrors).length > 0){
                setErrors(localErrors);
                return;
            }
            setErrors({});
        }
    }


    return (
        <>

            <div className="registro">
                <Header color="h-naranja" titulo='Registro'/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre</label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={data.name}
                            onChange={handleFormControl}
                            aria-describedby={errors.name? "error-name" : null}
                        />
                        {errors.name &&
                        <div id="error-name" className="errors-validation">
                            <span>Error:</span>
                            <span>{errors.name}</span>
                        </div>
                        }
                    </div>

                    <div>
                        <label htmlFor="surname">Apellido</label>

                        <input
                            id="surname"
                            type="text"
                            name="surname"
                            placeholder="Apellido"
                            value={data.surname}
                            onChange={handleFormControl}
                            aria-describedby={errors.surname? "error-surname" : null}
                        />
                        {errors.surname &&
                        <div id="error-surname" className="errors-validation">
                            <span>Error:</span>
                            <span>{errors.surname}</span>
                        </div>
                        }
                    </div>

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
                    </div>

                    <div>
                        <label htmlFor="passRepeat">RepetirContraseña</label>

                        <input
                            id="passRepeat"
                            type="password"
                            name="passRepeat"
                            placeholder="Repetir contraseña"
                            value={data.passRepeat}
                            onChange={handleFormControl}
                            aria-describedby={errors.passRepeat? "error-passRepeat" : null}
                        />
                        {errors.passRepeat &&
                        <div id="error-passRepeat" className="errors-validation">
                            <span>Error:</span>
                            <span>{errors.passRepeat}</span>
                        </div>
                        }
                    </div>

                    <input type="submit" value="Registrarse"/>
                </form>
                <div >
                    <p>Ya eres miembro? <Link to="/iniciarsesion">Iniciar Sesión</Link> </p>
                </div>
            </div>

        </>
    );
};

export default Registro;