
import { Route, Routes } from 'react-router-dom';

import Medicamentos from "./componentes/Medicacion";
import Medicos from "./componentes/Medicos";
import Menu from "./componentes/Menu";
import Diagnostico from "./componentes/Diagnostico";
import Perfil from "./componentes/Perfil";
import IniciarSesion from "./componentes/userSession/IniciarSesion";
import Registro from "./componentes/userSession/Registro";
import RequireAuth from "./componentes/userSession/RequireAuth";
import {useContext} from "react";
import {UserContext} from "./context/UserProvider";


function App() {

    const { user } = useContext(UserContext);
    if(user === false ){
        return <p>Loading...</p>
    }
    return (
        <div className="App">
                <Routes>
                    <Route path='/' element={
                        <RequireAuth>
                            <Menu/>
                        </RequireAuth>

                    } exact/>
                    <Route path='/medicacion' element={
                        <RequireAuth>
                            <Medicamentos/>
                        </RequireAuth>

                    } />
                    <Route path='/medicos' element={
                        <RequireAuth>
                            <Medicos/>
                        </RequireAuth>
                         } />
                    <Route path='/diagnosticos' element={
                        <RequireAuth>
                            <Diagnostico/>
                        </RequireAuth>
                         } />
                    <Route path='/perfil' element={
                        <RequireAuth>
                            <Perfil/>
                        </RequireAuth>

                    } />

                    <Route path='/iniciarsesion' element={ <IniciarSesion/> } />
                    <Route path='/registro' element={ <Registro/> } />
                </Routes>
        </div>
    );
}

export default App;