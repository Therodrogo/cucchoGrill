import React from "react";

import { Button, Card, CardBody } from "@nextui-org/react";

export default function App() {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100vw", background: "#1F1120", minHeight: "70px",zIndex:"1000", position:"fixed", top:"0" }}>

                <span className="material-icons-outlined" style={{ color: "white", fontSize: "50px", marginLeft: "2%" }}>
                    menu
                </span>



                <img src="https://i.ibb.co/vcGtSnh/logoblanco.png" alt="" style={{ height: "60px" }} />

                <div style={{ color: "#1F1120", cursor: "none", width: "50px" }}></div>
            </div>
        </>
    );
}
