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
    <div className="App">
      <NavbarSuperior />
      {value ==="perfil" &&
        <IniciarSesion/>
      }
      {value==="QR"&&
        <QRscan/>
      }
      {value ==="menu" &&
        <SliderH/>  &&
        <CardProductos/>
      }
      {/*  <AdminCard /> */}
      <NavbarInferior />
    </div>
  );
}
/*
const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin-card" component={AdminCardPage} />
                <Route path="/admin-product" component={AdminProductPage} />
                <Route path="/pay-confirm" component={PayConfirmPage} />
                <Route path="/slider-h" component={SliderHPage} />
                <Route exact path="/" component={AdminCardPage} /> {}
            </Switch>
        </Router>
    );
};
*/

export default App;