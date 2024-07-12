import React from 'react';
import NavbarSuperior from './NavbarSuperior';
import AdminCard from './components/AdminCard';
import IniciarSesion from "./components/IniciarSesion"
import QRscan2 from "./components/QRScan2"
import NavbarInferior from './NavbarInferior';
import { useSelector, useDispatch } from 'react-redux';
import SliderH from './components/SliderH';
import CardProductos from './components/CardProductos';
import Carrousel from './components/Carrousel';
import Novedades from './components/Novedades';
import DescuentosCard from './components/DescuentosCard';

import VistaPedido from "./components/VistaPedido"


import VistaProducto from "./components/VistaProducto"
import VistaPromocion from "./components/VistaPromocion"


import PromocionIndividual from "./components/PromoIndividual"

import ResumenPedido from "./components/ResumenPedido"


function App() {
  const value = useSelector((state) => state.example.value);
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>

      <NavbarSuperior />

      <div className='contenidoCentral' style={{ display: "flex", flexDirection: "column", overflow: "auto", height: "82vh", marginTop: "70px" }} >

        {value === "home" &&
          <>
          <Carrousel />
          <Novedades />
          </>
        }

        {value === "perfil" &&
          <IniciarSesion />
        }
        {value === "QR" &&
          <QRscan2 />
        }
        {value === "menu" &&
          <div>
            <CardProductos />
            
          </div>
        }
        {value === "descuento" &&
          <>
          <SliderH />
          <DescuentosCard />
          </>
        }
        {value === "login" &&
          <>
          <AdminCard/>
          </>
        }
         {value === "pedido" &&
          <>
          <VistaPedido/>
          </>
        }

      </div>

      <NavbarInferior />

    </div>
  );
}

export default App;