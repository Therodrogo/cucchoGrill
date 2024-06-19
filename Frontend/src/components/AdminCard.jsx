import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Avatar, User } from "@nextui-org/react";

export default function App() {
  return (
    <div style={{ display: "flex",flexDirection: "column", width: "100%", height: "100%" }}>
      <p className="text-primario text-4xl font-semibold sm:text-5xl" style={{textAlign:"center",marginTop:"10px",marginBottom:"20px"}}>
        Administrar Recursos
      </p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

        <Button isIconOnly style={{ width: "200px", height: "100px", margin: "2%" }} variant="flat">
          <img src="https://i.ibb.co/YW69BzD/arroz.jpg" alt="" />

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
          <img src="https://i.ibb.co/6tq6hKF/5ff36f208185b-890x533.jpg" alt="" />
          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Pedidos </p>
          </div>
        </Button>
        <Button isIconOnly style={{ width: "200px", height: "100px", margin: "2%" }} variant="flat">
          <img style={{maxHeight:"100%",maxWidth:"none"}} src="https://i.ibb.co/kDCrkX5/usuario-de-computadoras.jpg" alt="" />

          <div style={{ position: "absolute", bottom: "0", background: "rgba(31,17,32,0.4)", width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "1.2em", color: "white", fontWeight: "100" }} > Usuarios </p>
          </div>

        </Button>


      </div>





    </div>
  );
}
