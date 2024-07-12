import React, { useState } from "react";

import { Button, Card, CardBody } from "@nextui-org/react";

import { useSelector,useDispatch } from "react-redux";

import { updateLogin } from "./app/slides/example2";
import { updateString } from "./app/slides/example"; 


export default function App() {

    const [menu, setMenu] = useState(false)
    const login = useSelector((state) => state.example2.value);

    const dispatch = useDispatch();

    const handleUpdateLogin = (valor) => {
        dispatch(updateLogin(valor));
    };
    const handleUpdate = (valor) => {
        dispatch(updateString(valor));
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100vw", background: "#1F1120", minHeight: "70px", zIndex: "1000", position: "fixed", top: "0" }}>

                {menu ? (
                    <>
                        <span onClick={() => { setMenu(false) }} className="material-icons-outlined" style={{ color: "white", fontSize: "50px", marginLeft: "2%" }}>
                            close
                        </span>


                    </>
                ) : (
                    <>
                        <span onClick={() => { setMenu(true) }} className="material-icons-outlined" style={{ color: "white", fontSize: "50px", marginLeft: "2%" }}>
                            menu
                        </span>
                    </>
                )
                }

                <img src="https://i.ibb.co/vcGtSnh/logoblanco.png" alt="" style={{ height: "60px" }} />

                <div style={{ color: "#1F1120", cursor: "none", width: "50px" }}></div>
            </div>


            {menu && (
                <div style={{boxShadow:"10px 10px 15px rgba(0, 0, 0, 0.5)",  width: "40%", borderEndStartRadius: "12px", borderBottomRightRadius: "12px", background: "white", position: "fixed", zIndex: "1001", marginTop: "70px", display: "flex", flexDirection: "column" }}>
                    <Button variant="light" radius="none">
                        Inicio
                    </Button>
                    <Button variant="light" radius="none">
                        Promociones
                    </Button>
                    <Button variant="light" radius="none">
                        Descuentos
                    </Button>

                    {login == "login" && (
                        <div onClick={()=>{ handleUpdateLogin("nologin"),handleUpdate("home"), setMenu(false) }}  style={{ borderEndStartRadius: "12px", borderBottomRightRadius: "12px", background: "#DDBD8C", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }} radius="none">
                            <p style={{ color: "white", textAlign: "center" }}>Cerrar Sesión</p>
                        </div>
                    )}

                </div>
            )}

        </>
    );
}
