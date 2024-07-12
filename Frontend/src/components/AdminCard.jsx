import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../app/slides/pedidoView";
import AdminProduct from './AdminProduct';
import PedidoView from '../app/slides/pedidoView';
import PayConfirm from './PayConfirm';
import VistaUsuarios from './VistaUsuarios'; // Importar el componente de usuarios
import VistaPromociones from './VistaPromocion'; // Importar el componente de promociones

export default function AdminCard() {
  const dispatch = useDispatch();
  const currentView = useSelector((state) => state.view.currentView);

  const handleViewChange = (view) => {
    dispatch(setView(view));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <p className="text-primario text-4xl font-semibold sm:text-5xl" style={{ textAlign: "center", marginTop: "10%", marginBottom: "20px" }}>
        Administrar Recursos
      </p>

      <Button 
        variant="flat" 
        className="bg-primario" 
        style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}
        onClick={() => handleViewChange('productos')}
      >
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">lunch_dining</span>
          <p style={{ textAlign: "center" }}>Productos</p>
          <span className="material-icons-outlined">lunch_dining</span>
        </div>
      </Button>

      <Button 
        variant="flat" 
        className="bg-primario" 
        style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}
        onClick={() => handleViewChange('promociones')}
      >
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">fastfood</span>
          <p style={{ textAlign: "center" }}>Promociones</p>
          <span className="material-icons-outlined">fastfood</span>
        </div>
      </Button>

      <Button 
        variant="flat" 
        className="bg-primario" 
        style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}
        onClick={() => handleViewChange('pedidos')}
      >
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">restaurant</span>
          <p style={{ textAlign: "center" }}>Pedidos en curso</p>
          <span className="material-icons-outlined">restaurant</span>
        </div>
      </Button>

      <Button 
        variant="flat" 
        className="bg-primario" 
        style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}
        onClick={() => handleViewChange('historial')}
      >
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">manage_search</span>
          <p style={{ textAlign: "center" }}>Historial de pedidos</p>
          <span className="material-icons-outlined">manage_search</span>
        </div>
      </Button>

      <Button 
        variant="flat" 
        className="bg-primario" 
        style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}
        onClick={() => handleViewChange('usuarios')}
      >
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">manage_accounts</span>
          <p style={{ textAlign: "center" }}>Administrar usuarios</p>
          <span className="material-icons-outlined">manage_accounts</span>
        </div>
      </Button>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", color: "white", marginRight: "2%" }}>
        <Button onClick={() => { handleViewChange('logout'); handleViewChange('home'); }} className="bg-fondo text-white">
          <span style={{ color: "white" }} className="material-icons-outlined">logout</span>
          Cerrar Sesión
        </Button>
      </div>

      {currentView === 'productos' && <AdminProduct />}
      {currentView === 'promociones' && <VistaPromociones />}
      {currentView === 'pedidos' && <PedidoView />}
      {currentView === 'historial' && <PayConfirm />}
      {currentView === 'usuarios' && <VistaUsuarios />}
    </div>
  );
}
