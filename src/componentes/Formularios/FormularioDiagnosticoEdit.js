import React, {useEffect, useState} from 'react';
import {auth, db} from "../../firebase/firebase.config";
import {setDoc, getDoc, doc} from "firebase/firestore";

function FormularioDiagnosticoEdit(props){

    const user = auth?.currentUser?.uid;

    const [data, setData] = useState({
        diagnosis: '',
        date: '',
        doctor: '',
        others: '',
    });
    const [errors, setErrors] = useState({});


    useEffect(()=>{
        const getDiagnosis = async()=>{
            try{
                const diagnosis = await getDoc(doc(db, 'users', user, 'diagnosis', props.id));

                setData(diagnosis.data());

            }catch(error){
                console.log(error);
            }

        }
        getDiagnosis();
    },[])

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

        if(data.diagnosis === null || data.diagnosis.trim() === '' ){
            localErrors.diagnosis = 'El campo diagnóstico debe completarse.';
        }
        if(data.doctor === '' ){
            localErrors.doctor = 'El campo médico debe completarse.';
        }
        if(data.date === null || data.date.trim() === '' ){
            localErrors.date = 'El campo fecha debe completarse.';
        }

        if(Object.entries(localErrors).length > 0){
            setErrors(localErrors);

            return;
        }
        setErrors({});

        setToDiagnosis();

        props.setModalEditar(false);
    }

    const setToDiagnosis = async() => {

        try{
            await setDoc(doc(db, 'users', user, 'diagnosis', props.id),{
                diagnosis: data.diagnosis,
                date: data.date,
                doctor: data.doctor,
                others: data.others,
            })
        }catch(error){
            console.log(error.message);
        }

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="diagnosis">Diagnóstico</label>

                    <input
                        id="diagnosis"
                        type="text"
                        name="diagnosis"
                        placeholder="Diagnóstico/ enfermedad"
                        value={data.diagnosis}
                        onChange={handleFormControl}
                        aria-describedby={errors.diagnosis? "error-diagnosis" : null}
                    />
                    {errors.diagnosis &&
                    <div id="error-diagnosis" className="errors-validation">
                        <span>Error:</span>
                        <span>{errors.diagnosis}</span>
                    </div>
                    }
                </div>
                <div>
                    <label htmlFor="date">Fecha del diagnóstico</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={data.date}
                        onChange={handleFormControl}
                        aria-describedby={errors.date? "error-date" : null}
                    />
                    {errors.date &&
                    <div id="error-date" className="errors-validation">
                        <span>Error:</span>{errors.date}
                    </div>
                    }
                </div>

                <div>
                    <label htmlFor="doctor">Doctor</label>

                    <input
                        id="doctor"
                        type="text"
                        name="doctor"
                        placeholder="Médico que realizó el diagnóstico"
                        value={data.doctor}
                        onChange={handleFormControl}
                        aria-describedby={errors.doctor? "error-doctor" : null}
                    />
                    {errors.doctor &&
                    <div id="error-doctor" className="errors-validation">
                        <span>Error:</span>
                        <span>{errors.doctor}</span>
                    </div>
                    }
                </div>

                <div className="mb-5">
                    <label  className="block text-gray-700 uppercase font-bold" htmlFor="others">Otros datos</label>
                    <textarea id="others"
                              name="others"
                              placeholder="Información adicional..."
                              value={data.others}
                              onChange={handleFormControl}
                    ></textarea>

                </div>

                <input type="submit" value="Guardar"/>
            </form>
        </div>
    );
}
export default FormularioDiagnosticoEdit;