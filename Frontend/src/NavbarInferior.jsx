import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import MenuIcon from './assets/icons/Menu.svg';
import DescuentoIcon from "./assets/icons/Porciento.svg"
import PerfilIcon from "./assets/icons/perfil.svg"
import HomeIcon from "./assets/icons/home.svg"
import "./icon.css"

export default function App() {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100vw", background: "#1F1120", minHeight: "70px", position: "fixed", bottom: "0", left: "0", zIndex: "1000" }}>

                <Button radius="full" variant="light" size="sm" style={{ color: "white", height: "50px" }} >
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <img className="menu-icon" src={HomeIcon} alt="" />
                        <p style={{paddingTop:"5px"}}>Inicio</p>
                    </div>
                </Button>
                <Button radius="full" variant="light" size="sm" style={{ color: "white", height: "50px" }} >
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <img className="menu-icon" src={MenuIcon} alt="" />
                        <p style={{paddingTop:"5px"}}>Menu</p>
                    </div>
                </Button>
                <div style={{display:"flex",background:"#1F1120",position:"relative", bottom:"30px", height:"70px",width:"70px",justifyContent:"center",alignItems:"center",borderRadius:"100px"}}>
                    <Button isIconOnly className="bg-fondo" radius="full" variant="light" size="lg" style={{ color: "white",height:"60px",width:"60px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img style={{ height: "35px" }} src="https://i.ibb.co/3kt2kVs/QR-copia.png" alt="" />

                        </div>
                    </Button>
                </div>

                <Button  variant="light" size="sm" style={{ color: "white", height: "50px",width:"64px" }} >
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <img className="menu-icon" src={DescuentoIcon} alt="" />
                        <p style={{paddingTop:"5px"}}>Descuentos</p>
                    </div>
                </Button>
                <Button radius="full" variant="light" size="sm" style={{ color: "white", height: "50px" }} >
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <img className="menu-icon" src={PerfilIcon} alt="" />
                        <p style={{paddingTop:"5px"}}>Perfil</p>
                    </div>
                </Button>






            </div>
        </>
    );
}
