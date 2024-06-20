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
      <p className="text-primario text-4xl font-semibold sm:text-5xl" style={{ textAlign: "center", marginTop: "10px", marginBottom: "20px" }}>
        Administrar Recursos
      </p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

        <Button isIconOnly style={{ width: "200px", height: "100px", margin: "2%" }} variant="flat">
          <img src="https://i.ibb.co/tBPC2fw/3e99fa77-2f5a-4ed9-bc65-2f3759ebaae5.jpg" alt="" />

          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Productos </p>
          </div>

        </Button>
        <Button isIconOnly style={{ width: "100%", height: "100px", margin: "2%" }} variant="flat">
          <img src="https://i.ibb.co/sPCdYyF/hambuergueza.jpg" alt="" />
          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Promociones </p>
          </div>
        </Button>

      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
      <Button isIconOnly style={{ width: "100%", height: "100px", margin: "2%" }} variant="flat">
          <img src="https://i.ibb.co/DKWxLXr/Firefly-pedidos-en-curso-de-comida-mostrando-comida-14133.jpg" alt="" />
          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Pedidos en curso  </p>
          </div>
        </Button>
        <Button isIconOnly style={{ width: "200px", height: "100px", margin: "2%" }} variant="flat">
          <img style={{ maxHeight: "100%", maxWidth: "none" }} src="https://i.ibb.co/kDCrkX5/usuario-de-computadoras.jpg" alt="" />

          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Usuarios </p>
          </div>

        </Button>


      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

        <Button isIconOnly style={{ width: "100%", height: "100px", margin: "2%" }} variant="flat">
          <img style={{maxHeight:"100%",maxWidth:"none"}} src="https://cdn-icons-png.flaticon.com/512/11181/11181309.png" alt="" />
          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Historial de Pedidos </p>
          </div>
        </Button>
     

      </div>
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
