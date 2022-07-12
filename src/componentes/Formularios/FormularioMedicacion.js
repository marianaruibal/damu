import React, {useState} from 'react';
import {auth, db} from "../../firebase/firebase.config";
import {collection, addDoc} from "firebase/firestore";

function FormularioMedicacion({setModal}){

    const user = auth?.currentUser?.uid;

    const [data, setData] = useState({
        name: '',
        amount: '',
        type: '',
        motive: '',
    });
    const [errors, setErrors] = useState({});


    function handleFormControl(ev){
        const name = ev.target.name;
        setData({
            ...data,
            [name]:ev.target.value
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const localErrors = {};


        if(data.name === null || data.name.trim() === '' ){
            localErrors.name = 'El campo nombre de la medicación debe completarse.';
        }

        if(data.motive === null || data.motive.trim() === '' ){
            localErrors.motive = 'El campo motivo de la medicación debe completarse.';
        }

        if(data.amount === null || data.amount === '' ){
            localErrors.amount = 'El campo dosis debe completarse.';
        }else if(isNaN(data.amount)){

            localErrors.amount = 'Solo puede ingresar números en este campo';
        }

        if(data.type === '' ){
            localErrors.type = 'Debe seleccionar una opción.';
        }

        if(Object.entries(localErrors).length > 0){
            setErrors(localErrors);
            console.log(localErrors);
            return;
        }
        setErrors({});

        addToMedicine();

        setModal(false);
        console.log(setModal)

    }

    const addToMedicine = async() => {
        await addDoc(collection(db, 'users', user, 'medicine'),{
            name: data.name,
            amount: data.amount,
            type: data.type,
            motive: data.motive,
        })

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre de la medicación</label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nombre de la medicación"
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
                    <label htmlFor="name">Motivo/diagnóstico</label>

                    <input
                        id="motive"
                        type="text"
                        name="motive"
                        placeholder="Motivo/diagnóstico"
                        value={data.motive}
                        onChange={handleFormControl}
                        aria-describedby={errors.motive? "error-motive" : null}
                    />
                    {errors.motive &&
                    <div id="error-name" className="errors-validation">
                        <span>Error:</span>
                        <span>{errors.motive}</span>
                    </div>
                    }
                </div>
                <div>
                    <label htmlFor="amount">Dosis</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        min="0"
                        placeholder="Cantidad"
                        value={data.amount}
                        onChange={handleFormControl}
                        aria-describedby={errors.amount? "error-amount" : null}
                    />
                    {errors.amount &&
                    <div id="error-amount" className="errors-validation">
                        <span>Error:</span>{errors.amount}
                    </div>
                    }
                </div>

                <div>
                    <label htmlFor="type">Tipo</label>
                    <select
                        id="type"
                        name="type"
                        value={data.type}
                        onChange={handleFormControl}
                        aria-describedby={errors.type? "error-type" : null}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Comprimidos">Comprimidos</option>
                        <option value="Cucharadas">Cucharadas</option>
                        <option value="Cápsulas">Cápsulas</option>
                        <option value="Inyecciones">Inyecciones</option>
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                    </select>
                    {errors.type &&
                    <div id="error-type" className="errors-validation">
                        <span>Error:</span>{errors.type}
                    </div>
                    }
                </div>

                <input type="submit" value="Guardar"/>
            </form>
        </div>
    );
}
export default FormularioMedicacion;