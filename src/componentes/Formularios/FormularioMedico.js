import React, {useState} from 'react';

function FormularioMedico(){

    const [data, setData] = useState({
        name: '',
        specialty: '',
        direction: '',
        phone: '',
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
        //let num = preg_replace( '/\D+/', '', data.phone);
        let regExp = new RegExp('^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/D');


        if(data.name == null || data.name.trim() == '' ){
            localErrors.name = 'El campo nombre del médico debe completarse.';
        }
        if(data.specialty == '' ){
            localErrors.specialty = 'Debe seleccionar una opción.';
        }
        if(data.direction == null || data.direction.trim() == '' ){
            localErrors.direction = 'El campo dirección debe completarse.';
        }
        if(data.phone == null || data.phone.trim() == '' ){
            localErrors.phone = 'El campo telefóno debe completarse.';
        }else if(isNaN(data.phone)){

            localErrors.phone = 'Solo puede ingresar números en este campo';

        }

        if(Object.entries(localErrors).length > 0){
            setErrors(localErrors);
            console.log(localErrors);
            return;
        }
        setErrors({});



        fetchDoctors();
    }

    async function fetchDoctors(){
        const response = await fetch('http://localhost:4000/doctors', {
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
                    <label htmlFor="name">Nombre médico</label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Nombre del médico"
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
                    <label htmlFor="specialty">Especialidad</label>
                    <select
                        id="specialty"
                        name="specialty"
                        value={data.specialty}
                        onChange={handleFormControl}
                        aria-describedby={errors.specialty? "error-specialty" : null}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Clinico">Clínico</option>
                        <option value="Dermatólogo">Dermatologo</option>
                    </select>
                    {errors.specialty &&
                    <div id="error-specialty" className="errors-validation">
                        <span>Error:</span>{errors.specialty}
                    </div>
                    }
                </div>

                <div>
                    <label htmlFor="direction">Dirección</label>
                    <input
                        id="direction"
                        name="direction"
                        type="text"
                        placeholder="Dirección del médico"
                        value={data.direction}
                        onChange={handleFormControl}
                        aria-describedby={errors.direction? "error-direction" : null}
                    />
                    {errors.direction &&
                    <div id="error-direction" className="errors-validation">
                        <span>Error:</span>{errors.direction}
                    </div>
                    }
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(Código de área) Teléfono"
                        value={data.phone}
                        onChange={handleFormControl}
                        aria-describedby={errors.phone? "error-phone" : null}
                    />
                    {errors.phone &&
                    <div id="error-phone" className="errors-validation">
                        <span>Error:</span>{errors.phone}
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
export default FormularioMedico;