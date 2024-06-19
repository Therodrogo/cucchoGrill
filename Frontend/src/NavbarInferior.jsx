import React, { useEffect } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import MenuIcon from './assets/icons/Menu.svg';
import DescuentoIcon from "./assets/icons/Porciento.svg"
import PerfilIcon from "./assets/icons/perfil.svg"
import HomeIcon from "./assets/icons/home.svg"
import HomeIconActive from "./assets/icons/homeactivo.png"
import MenuIconActive from './assets/icons/menuactivo.png';
import PerfilIconActive from "./assets/icons/perfilactivo.png"
import DescuentoIconActive from "./assets/icons/porcientoactivo.png"

import "./icon.css"

import { useSelector, useDispatch } from 'react-redux';
import { updateString } from "./app/slides/example";
import { updateLogin } from "./app/slides/example2";


export default function App() {


    const value = useSelector((state) => state.example.value);

    const login = useSelector((state) => state.example2.value);

    const dispatch = useDispatch();

    const handleUpdate = (valor) => {
        dispatch(updateString(valor));
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100vw", background: "#1F1120", minHeight: "70px", position: "fixed", bottom: "0", left: "0", zIndex: "1000" }}>

                {value === "home" ? (
                    <div onClick={() => handleUpdate("home")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <img className="menu-icon-active" src={HomeIconActive} alt="" />
                            <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center", color: "#DDBD8C" }}>Inicio</p>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => handleUpdate("home")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img className="menu-icon" src={HomeIcon} alt="" />
                            <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center" }}>Inicio</p>
                        </div>
                    </div>
                )
                }
                {value === "menu" ? (
                    <div onClick={() => handleUpdate("menu")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <img className="menu-icon-active" src={MenuIconActive} alt="" />
                            <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center", color: "#DDBD8C" }}>Menu</p>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => handleUpdate("menu")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img className="menu-icon" src={MenuIcon} alt="" />
                            <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center" }}>Menu</p>
                        </div>
                    </div>
                )}

                <div style={{ display: "flex", background: "#1F1120", position: "relative", bottom: "30px", height: "70px", width: "70px", justifyContent: "center", alignItems: "center", borderRadius: "100px" }}>
                    <Button onClick={() => handleUpdate("QR")} isIconOnly className="bg-fondo" radius="full" variant="light" size="lg" style={{ color: "white", height: "60px", width: "60px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img style={{ height: "35px" }} src="https://i.ibb.co/3kt2kVs/QR-copia.png" alt="" />

                        </div>
                    </Button>
                </div>

                {value === "descuento" ? (
                    <div onClick={() => handleUpdate("descuento")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <img className="menu-icon-active" src={DescuentoIconActive} alt="" />
                            <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center", color: "#DDBD8C" }}>Descuentos</p>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => handleUpdate("descuento")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img className="menu-icon" src={DescuentoIcon} alt="" />
                            <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center" }}>Descuentos</p>
                        </div>
                    </div>
                )}




                {login === "login" ? (
                    <>
                        {value === "login" ? (
                            <div onClick={() => handleUpdate("login")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                    {/*  <img className="menu-icon-active" src={PerfilIconActive} alt="" /> */}
                                    <span className="material-icons-outlined" style={{color:"#DDBD8C"}}>
                                        badge
                                    </span>
                                    <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center", color: "#DDBD8C" }}>Mi Perfil</p>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => handleUpdate("login")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                                <div style={{  display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                    {/* <img className="menu-icon" src={PerfilIcon} alt="" /> */}
                                    <span className="material-icons-outlined">
                                        badge
                                    </span>
                                    <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center" }}>Mi Perfil</p>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>

                        {value === "perfil" ? (
                            <div onClick={() => handleUpdate("perfil")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                    <img className="menu-icon-active" src={PerfilIconActive} alt="" />
                                    <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center", color: "#DDBD8C" }}>Perfil</p>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => handleUpdate("perfil")} style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "white", height: "50px", width: "64px" }} >
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <img className="menu-icon" src={PerfilIcon} alt="" />
                                    <p style={{ paddingTop: "5px", fontSize: "0.8em", textAlign: "center" }}>Perfil</p>
                                </div>
                            </div>
                        )}

                    </>
                )}



            </div>
        </>
    );
}
