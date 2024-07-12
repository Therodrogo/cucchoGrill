import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Avatar, User } from "@nextui-org/react";

import { updateLogin } from "../app/slides/example2";
import { useDispatch } from "react-redux";
import { updateString } from "../app/slides/example";


export default function App() {

  const dispatch = useDispatch();

  const handleUpdateLogin = (valor) => {
    dispatch(updateLogin(valor));
  };

  const handleUpdate = (valor) => {
    dispatch(updateString(valor));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>

      <p className="text-primario text-4xl font-semibold sm:text-5xl" style={{ textAlign: "center", marginTop: "10%", marginBottom: "20px" }}>
        Administrar Recursos
      </p>

      <Button variant="flat" className="bg-primario " style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}>
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">
            lunch_dining
          </span>
          <p style={{ textAlign: "center" }}>Productos</p>

          <span className="material-icons-outlined">
            lunch_dining
          </span>
        </div>
      </Button>
      
      <Button variant="flat" className="bg-primario " style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}>
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">
            fastfood
          </span>
          <p style={{ textAlign: "center" }}>Promociones</p>
          <span className="material-icons-outlined">
            fastfood
          </span>
        </div>
      </Button>
      <Button variant="flat" className="bg-primario " style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}>
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">
            restaurant
          </span>
          <p style={{ textAlign: "center" }}>Pedidos en curso</p>
          <span className="material-icons-outlined">
            restaurant
          </span>
        </div>
      </Button>
      <Button variant="flat" className="bg-primario " style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}>
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">
            manage_search
          </span>
          <p style={{ textAlign: "center" }}>Historial de pedidos</p>
          <span className="material-icons-outlined">
            manage_search
          </span>
        </div>
      </Button>
      <Button variant="flat" className="bg-primario " style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%", height: "50px", color: "white", fontSize: "1.3em" }}>
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span className="material-icons-outlined">
            manage_accounts
          </span>
          <p style={{ textAlign: "center" }}>Administrar usuarios</p>
          <span className="material-icons-outlined">
            manage_accounts
          </span>
        </div>
      </Button>


      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", color: "white", marginRight: "2%" }}>
        <Button onClick={() => { handleUpdateLogin("nologin"), handleUpdate("home") }} className="bg-fondo text-white">
          <span style={{ color: "white" }} className="material-icons-outlined">
            logout
          </span>
          Cerrar Sesión

        </Button>
      </div>

    </div>
  );
}
