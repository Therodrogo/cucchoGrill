import React, { useState, useEffect } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { updatePedidoCurso } from "../app/slides/PedidoCurso";
import ResumenPedidoVista from "./ResumenPedido";
import Swal from "sweetalert2";
import db from "../services/db";
import "../components/VistaPedido.css";

export default function App(props) {
    const value = useSelector((state) => state.pedidoCurso.value);
    const dispatch = useDispatch();

    const handleUpdatePedido = (valor) => {
        dispatch(updatePedidoCurso(valor));
    };

    const cambiar = (e)=>{
        console.log("entradsadasdsadsadsad")
        dispatch(updatePedidoCurso(e));
    }

    const { pedidoElegido } = props;

    const [resumenPedido, setResumenPedido] = useState([]);
    const [comentarios, setComentarios] = useState({});

    useEffect(() => {
        // Inicializar resumenPedido con las promociones elegidas y sin comentarios
        const inicialResumen = pedidoElegido.map(promo => ({
            promocion: promo._id,
            comentario: ''
        }));
        setResumenPedido(inicialResumen);
    }, [pedidoElegido]);

    const handleComentarioChange = (index, comentario) => {
        setComentarios(prevComentarios => ({
            ...prevComentarios,
            [index]: comentario
        }));
    };

    const agregarPedidoFinal = (promo, index) => {
        const data = {
            promocion: promo._id,
            comentario: comentarios[index] || ''
        };

        // Verificar si la promoción ya existe en resumenPedido
        const indexExistente = resumenPedido.findIndex(p => p.promocion === data.promocion);

        if (indexExistente !== -1) {
            // Si ya existe, reemplazar el comentario
            const nuevoResumen = [...resumenPedido];
            nuevoResumen[indexExistente] = data;
            setResumenPedido(nuevoResumen);
        } else {
            // Si no existe, agregar nuevo
            setResumenPedido(prevResumen => [...prevResumen, data]);
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Comentario agregado",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
            }
        });
    };

    const ProductoAsync = ({ index, idx, productoId, db }) => {
        const [nombreProducto, setNombreProducto] = useState(null);

        useEffect(() => {
            const obtenerProducto = async () => {
                try {
                    const producto = await db.obtenerProductoId(productoId);
                    if (producto) {
                        setNombreProducto(producto.nombre);
                    } else {
                        setNombreProducto("Producto no encontrado");
                    }
                } catch (error) {
                    console.error(`Error al obtener producto con ID ${productoId}:`, error);
                    setNombreProducto("Error al cargar producto");
                }
            };

            obtenerProducto();
        }, [productoId, db]);

        return <span style={{ fontSize: "1.3em" }} id={`producto-${index}-${idx}`}>{nombreProducto === null ? "Cargando..." : nombreProducto}, </span>;
    };

    return (
        <>
            {value === 1 && (
                <>
                    <div style={{ display: "flex", background: "#DDBD8C", justifyContent: "space-between", alignItems: "center", padding: "2%" }}>
                        <div>
                            <Button onClick={() => { handleUpdatePedido(0) }} isIconOnly variant="light" radius="none">
                                <span style={{ color: "#1F1120" }} className="material-icons-outlined">
                                    chevron_left
                                </span>
                            </Button>
                        </div>
                        <p className="text-primario" style={{ textAlign: "center", fontSize: "1em" }}>
                            Agrega comentario
                        </p>
                        <div></div>
                    </div>
                    {pedidoElegido.map((promo, index) => (
                        <Card key={index} style={{ margin: "5%" }}>
                            <div>
                                <div style={{
                                    width: '100%',
                                    height: '162px',
                                    backgroundImage: `url(${promo.fotoPromo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}></div>
                                <div style={{ display: "flex", flexDirection: "column", margin: "5%" }}>
                                    <p style={{ fontSize: "1.5em" }}>{promo.nombre}</p>
                                    <div className="marquee-container">
                                        <p className="marquee-text">
                                            {promo.productos.map((productoId, idx) => (
                                                <ProductoAsync key={idx} index={index} idx={idx} productoId={productoId} db={db} />
                                            ))}
                                        </p>
                                    </div>
                                    <p style={{ fontSize: "1.2em" }}>$ {promo.precioOferta}</p>
                                    <p style={{ fontSize: "0.7em" }}>Si desea agregar o quitar algo háganos un comentario adicional.</p>
                                    <Input
                                        variant="underlined"
                                        label="Comentario Adicional (opcional)"
                                        onChange={(e) => handleComentarioChange(index, e.target.value)}
                                    />
                                    <Button onClick={() => agregarPedidoFinal(promo, index)}> Confirmar </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <div style={{ justifyContent: "end", display: "flex", marginBottom: "5%", marginRight: "5%" }}>
                        <Button onClick={() => cambiar(2)} style={{ color: "white" }} className="bg-primario">
                            Siguiente
                        </Button>
                    </div>
                </>
            )}

            {(value == 2||value == 3) && (
                <>
                    <ResumenPedidoVista resumenPedido={resumenPedido}/>
                </>
            )}
        </>
    );
}
