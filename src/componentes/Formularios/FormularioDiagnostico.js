import React, {useState} from 'react';

function FormularioDiagnostico(){


    const [data, setData] = useState({
        diagnosis: '',
        date: '',
        doctor: '',
        others: '',
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

        if(data.diagnosis == null || data.diagnosis.trim() == '' ){
            localErrors.diagnosis = 'El campo diagnóstico debe completarse.';
        }
        if(data.doctor == '' ){
            localErrors.doctor = 'El campo médico debe completarse.';
        }
        if(data.date == null || data.date.trim() == '' ){
            localErrors.date = 'El campo fecha debe completarse.';
        }

        if(Object.entries(localErrors).length > 0){
            setErrors(localErrors);
            console.log(localErrors);
            return;
        }
        setErrors({});

        fetchDiagnosis();


    }

    async function fetchDiagnosis(){
        const response = await fetch('http://localhost:4000/diagnosis', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
            }
        });

        const parsed = await response.json();
        return parsed.success;
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
export default FormularioDiagnostico;