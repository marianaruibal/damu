import React, {useEffect, useState} from 'react';
import {auth, db} from "../../firebase/firebase.config";
import {getDoc, doc, setDoc} from "firebase/firestore";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";

function FormularioMedicoEdit(props){

    const user = auth?.currentUser?.uid;

    const [data, setData] = useState({
        name: '',
        specialty: '',
        direction: '',
        phone: '',
        others: '',
    });
    const [errors, setErrors] = useState({});

    const[coordinates, setCoordinate] = useState({
        lat: -34.6037389,
        lng: -58.3815704
    });

    const [address, setAddress] = useState('');

    useEffect(()=>{
        const getDoctor = async()=>{
            try{
                const doctor = await getDoc(doc(db, 'users', user, 'doctors', props.id));

                setData(doctor.data());
                setAddress(doctor.data().direction);
                handleSelectAddress(doctor.data().direction);

            }catch(error){
                console.log(error);
            }

        }
        getDoctor();
    },[])

    const handleOnChangeAddress = (value) => {

        setAddress(value)

    }
    const handleSelectAddress = async (value) => {

        setAddress(value)

        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        setCoordinate(latLng)
    }

    const [ libraries ] = useState(['places']);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCQxJ5p_CSaeqGVDojpXIIGVPJCzE-WSqI',
        libraries,
    })

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
            localErrors.name = 'El campo nombre del médico debe completarse.';
        }
        if(data.specialty === '' ){
            localErrors.specialty = 'Debe seleccionar una opción.';
        }
        if(address === null || address.trim() === '' ){
            localErrors.direction = 'El campo dirección debe completarse.';
        }
        if(data.phone === null || data.phone.trim() === '' ){
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

        setToDoctors();

        props.setModalEditar(false);
    }

    const setToDoctors = async() => {
        await setDoc(doc(db, 'users', user, 'doctors', props.id),{
            name: data.name,
            specialty: data.specialty,
            direction: address,
            phone: data.phone,
            others: data.others,
        })

    }
    if(!isLoaded){
        return <div>Loading...</div>
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
                        <option value="Ginecologo">Ginecólogo</option>
                        <option value="Traumatologo">Traumatólogo</option>
                        <option value="Oftalmólogo">Oftalmólogo</option>
                    </select>
                    {errors.specialty &&
                    <div id="error-specialty" className="errors-validation">
                        <span>Error:</span>{errors.specialty}
                    </div>
                    }
                </div>
                

                <div>
                    <label htmlFor="direction">Dirección</label>
                    <PlacesAutocomplete value={address} onChange={handleOnChangeAddress} onSelect={handleSelectAddress}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: "Dirección del médico",
                                    })}
                                    id="direction"
                                    name="direction"
                                    type="text"
                                    value={address}
                                    aria-describedby={errors.direction? "error-direction" : null}

                                />
                                <div className="suggestions">
                                    {loading && <p>Loading...</p>}
                                    {suggestions.map((suggestions) =>{
                                        const style = suggestions.active ?
                                            {backgroundColor: "#3D358A", color:'white', cursor: "pointer"}:
                                            {backgroundColor: "#ffffff", cursor: "pointer"}

                                        return (
                                            <div {...getSuggestionItemProps(suggestions, {style})}>
                                                {suggestions.description}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    {errors.direction &&
                    <div id="error-direction" className="errors-validation">
                        <span>Error:</span>{errors.direction}
                    </div>
                    }

                    <GoogleMap zoom={15}
                               center={coordinates}
                               mapContainerStyle={{width: '85%', height: '300px'}}
                               mapContainerClassName={"map-container"}
                               options={{
                                   fullscreenControl: false,
                                   mapTypeControl: false,
                                   streetViewControl: false,
                               }}

                    >
                        {!address? '' : <MarkerF position={coordinates} />}

                    </GoogleMap>
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
export default FormularioMedicoEdit;