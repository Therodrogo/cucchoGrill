import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, User } from "@nextui-org/react";
import db from "../services/db"; // Asegúrate de tener este servicio configurado para obtener los detalles de las promociones
import { useSelector, useDispatch } from 'react-redux';
import Swal from "sweetalert2";

import { updatePedidoCurso } from "../app/slides/PedidoCurso";
import { updateString } from "../app/slides/example";

export default function ResumenPedido({ resumenPedido }) {

    const [promociones, setPromociones] = useState([]);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const value = useSelector((state) => state.pedidoCurso.value);
    const valueMesa = useSelector((state) => state.cliente.value);
    const dispatch = useDispatch();

    const handleUpdatePedido = (valor) => {
        dispatch(updatePedidoCurso(valor));
    };

    const handleUpdate = (valor) => {
        dispatch(updateString(valor));
    };

    useEffect(() => {
        const obtenerDetallesPromociones = async () => {
            try {
                const detalles = await Promise.all(resumenPedido.map(async (promo) => {
                    const detallePromo = await db.obtenerPromocionId(promo.promocion);
                    return detallePromo;
                }));
                setPromociones(detalles);

                // Calcular el precio total
                const total = detalles.reduce((acc, promo) => acc + promo.precioOferta, 0);
                setTotalPrecio(total);
            } catch (error) {
                console.error("Error al obtener los detalles de las promociones:", error);
            }
        };

        obtenerDetallesPromociones();
    }, [resumenPedido]);

    const generarPedido = async () => {
        const pedidoFinal = {
            nombreCliente: "",
            numMesa: parseInt(valueMesa),
            promociones: resumenPedido,
            productos: [],
            estado: "Pendiente de pago"
        };

        await db.crearPedido(pedidoFinal);

        handleUpdatePedido(3)

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Pedido Creado",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
            }
        });
    };

    const volverInicio =()=>{

        handleUpdatePedido(0)
        handleUpdate("home")
    }

    return (
        <>
            {value == 2 && (
                <>
                    <div style={{ display: "flex", background: "#DDBD8C", justifyContent: "space-between", alignItems: "center", padding: "2%" }}>
                        <div>
                            <Button onClick={() => { handleUpdatePedido(1) }} isIconOnly variant="light" radius="none">
                                <span style={{ color: "#1F1120" }} className="material-icons-outlined">
                                    chevron_left
                                </span>
                            </Button>
                        </div>
                        <p className="text-primario" style={{ textAlign: "center", fontSize: "1em" }}>
                            Resumen
                        </p>
                        <div>

                        </div>
                    </div>
                    <Card style={{ margin: "5%" }}>
                        <CardBody>
                            <p style={{ textAlign: "center", fontSize: "1.8em" }}>Resumen del Pedido</p>
                            <p style={{ fontSize: "1.2em", textAlign: "center" }}>Promociones</p>
                            {promociones.map((promo, index) => (
                                <div key={index}>
                                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "1%" }}>
                                        <User
                                            name={promo.nombre}
                                            description={`$ ${promo.precioOferta}`}
                                            avatarProps={{
                                                src: promo.fotoPromo
                                            }}
                                        />
                                    </div>
                                    <p>Comentario: {resumenPedido.find(p => p.promocion === promo._id).comentario}</p>
                                </div>
                            ))}
                            <p style={{ textAlign: "center", fontSize: "1.5em", marginTop: "5%" }}>Precio Total: $ {totalPrecio}</p>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "5%" }}>
                                <Button color="warning" style={{ color: "white" }} onClick={generarPedido}>Generar Pedido</Button>
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}

            {value == 3 && (

                <>
                    <Card>
                        <CardBody>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <span style={{ fontSize: "15em", textAlign: "center", color:"#1F1120" }} className="material-icons-outlined">
                                    fastfood
                                </span>

                                <p style={{ textAlign: "center", fontSize: "1.5em", color:"#1F1120" }}>Listo! Ahora dirígete a la caja menciona tu número de mesa y completar el pago de tu pedido.
                                </p>

                                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop:"5%"}}>
                                    <Button onClick={()=>{volverInicio()}} className="bg-primario" style={{ color: "white" }}>¡Que lo disfrute!</Button>
                                </div>

                            </div>

                        </CardBody>
                    </Card>

                </>
            )}

        </>
    );
}
