import React from 'react';
import NavbarSuperior from './NavbarSuperior';
import AdminCard from './components/AdminCard';
import IniciarSesion from "./components/IniciarSesion"
import QRscan from "./components/QRscan"
import NavbarInferior from './NavbarInferior';
import { useSelector, useDispatch } from 'react-redux';
import SliderH from './components/SliderH';
import CardProductos from './components/CardProductos';

function App() {
  const value = useSelector((state) => state.example.value);
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>

      <NavbarSuperior />

      <div className='contenidoCentral' style={{ display: "flex", flexDirection: "column", overflow: "auto", height: "81vh", marginTop: "70px" }} >

        {value === "home" &&
          <>
          
          </>
        }

        {value === "perfil" &&
          <IniciarSesion />
        }
        {value === "QR" &&
          <QRscan />
        }
        {value === "menu" &&
          <div >
            <CardProductos />
          </div>
        }
        {value === "descuento" &&
          <SliderH />
        }

      </div>

      <NavbarInferior />

    </div>
  );
}

export default App;