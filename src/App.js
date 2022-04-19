
import { Route, Routes } from 'react-router-dom';

import Medicamentos from "./componentes/Medicacion";
import Medicos from "./componentes/Medicos";
import Menu from "./componentes/Menu";
import Diagnostico from "./componentes/Diagnostico";

function App() {
    return (
        <div className="App">
                <Routes>
                    <Route path='/' element={ <Menu/> } exact/>
                    <Route path='/medicacion' element={ <Medicamentos/> } />
                    <Route path='/medicos' element={ <Medicos/> } />
                    <Route path='/diagnosticos' element={ <Diagnostico/> } />

                </Routes>
        </div>
    );
}

export default App;