import React, {useState} from 'react';
import CerrarModal from "./iconos/CerrarModal";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebase/firebase.config";
import HeaderSecundario from "./Headers/HeaderSecundario";

function ModalContrasenia(props){

    const [data, setData] = useState({
        emailForget: '',
    });
    const [errors, setErrors] = useState({});

    function handleFormControl(ev){
        const name = ev.target.name;
        setData({
            ...data,
            [name]:ev.target.value
        })
    }
    const handleSubmit = (e) =>{

        e.preventDefault();
        const localErrors = {};

        if(!data.emailForget){
            localErrors.emailForget = "Debe ingresar un email" ;
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.emailForget)){
            localErrors.emailForget = "El email ingresado no es válido" ;
        }

        if(Object.entries(localErrors).length > 0){
            setErrors(localErrors);
            console.log(localErrors);
            return;
        }
        setErrors({});

        if(data.emailForget){
           sendPasswordResetEmail(auth, data.emailForget)
               .then(function() {
                   setErrors({});
                   props.setModal(false);

               })
               .catch(function(error) {
                   console.log(error);
                   localErrors.emailForget = "Email no registrado";

                   if(Object.entries(localErrors).length > 0){
                       setErrors(localErrors);
                       console.log(localErrors);
                       return;
                   }
               });



        }



    }

    return(
        <div className="mi-modal recuperar">
            <CerrarModal setModal={props.setModal}/>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="emailForget">Nombre de la medicación</label>

                        <input
                            id="email"
                            type="email"
                            name="emailForget"
                            placeholder="Ingrese su correo electrónico"
                            value={data.emailForget}
                            onChange={handleFormControl}
                            aria-describedby={errors.emailForget? "emailForget" : null}
                        />
                        {errors.emailForget &&
                        <div id="error-emailForget" className="errors-validation">
                            <span>Error:</span>
                            <span>{errors.emailForget}</span>
                        </div>
                        }
                    </div>

                    <input type="submit" value="Recuperar contraseña" className="recuperarContraseña" />
                </form>
        </div>
    );
}
export default ModalContrasenia;