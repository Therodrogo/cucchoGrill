import React, { useState, useEffect } from "react";
import { Button, ModalFooter, Card, Badge, Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import db from '../services/db';
import "../components/VistaPedido.css"

import PedidoCurso from "../app/slides/PedidoCurso";
import { useSelector, useDispatch } from 'react-redux';
import { updatePedidoCurso } from "../app/slides/PedidoCurso"

import PromoIndividual from "./PromoIndividual"

function App() {

    const value = useSelector((state) => state.pedidoCurso.value);
    const dispatch = useDispatch();

    const handleUpdatePedido = (valor) => {
        dispatch(updatePedidoCurso(valor));
    };

    const [misPromociones, setMisPromociones] = useState([]);
    const [productos, setProductos] = useState({});
    const [pedido, setPedido] = useState([]);
    const [modalPedido, setModalPedido] = useState(false);

    useEffect(() => {
        const obtenerPromociones = async () => {
            const promociones = await db.obtenerPromociones();
            setMisPromociones(promociones);
        };

        obtenerPromociones();
    }, []);

    const agregarPedido = (promocion) => {
        setPedido([...pedido, promocion]);
    };

    const quitarDelPedido = (indexToRemove) => {
        setPedido(pedido.filter((_, index) => index !== indexToRemove));
    };

    const obtenerProductoPorId = async (id) => {
        if (!productos[id]) {
            const producto = await db.obtenerProductoPorId(id);
            setProductos((prevProductos) => ({
                ...prevProductos,
                [id]: producto
            }));
        }
        return productos[id];
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

        return <span id={`producto-${index}-${idx}`}>{nombreProducto === null ? "Cargando..." : nombreProducto}, </span>;
    };

    return (
        <div>
            {value == 0 && (
                <>
                    <Modal placement="center" isOpen={modalPedido} onOpenChange={(open) => setModalPedido(open)}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Resumen</ModalHeader>
                                    <ModalBody>
                                        {pedido.map((promo, index) => (
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }} key={index}>
                                                <p>{promo.nombre}</p>
                                                <Button onClick={() => quitarDelPedido(index)} isIconOnly color="warning">
                                                    <span style={{ color: "white" }} className="material-icons-outlined">
                                                        remove
                                                    </span>
                                                </Button>
                                            </div>
                                        ))}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={()=>{handleUpdatePedido(1)}}  style={{ color: "white" }} className="bg-primario"> Siguiente</Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    <div style={{ display: "flex", background: "#DDBD8C", justifyContent: "space-between", alignItems: "center", padding: "2%" }}>
                        <div>
                            <Button isIconOnly variant="light" radius="none">
                                <span style={{ color: "#1F1120" }} className="material-icons-outlined">
                                    chevron_left
                                </span>
                            </Button>
                        </div>
                        <p className="text-primario" style={{ textAlign: "center", fontSize: "1em" }}>
                            Seleccione sus promociones
                        </p>
                        <div>
                            <Badge onClick={() => setModalPedido(true)} style={{ marginTop: "5px", marginRight: "5px" }} content={pedido.length} color="danger">
                                <Button variant="shadow" onClick={() => setModalPedido(true)} isIconOnly radius="full">
                                    <span style={{ color: "#1F1120" }} className="material-icons-outlined">
                                        assignment
                                    </span>
                                </Button>
                            </Badge>
                        </div>
                    </div>

                    <div style={{ display: "flex", width: "100%", overflow: "auto", height: "75vh", paddingBottom: "20px", paddingTop: "10px", flexWrap: "wrap" }}>
                        {misPromociones.map((promocion, index) => (
                            <Card key={index} style={{ width: '45%', height: '180px', margin: '2%' }}>
                                <div style={{
                                    width: '162px',
                                    height: '162px',
                                    backgroundImage: `url(${promocion.fotoPromo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                ></div>
                                <section style={{ padding: '10px', height: '100%' }}>
                                    <div>
                                        <p style={{ fontSize: '0.8em' }}>{promocion.nombre}</p>
                                        <div className="marquee-container">
                                            <p className="marquee-text">
                                                {promocion.productos.map((productoId, idx) => (
                                                    <ProductoAsync key={idx} index={index} idx={idx} productoId={productoId} db={db} />
                                                ))}
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", width: "142px" }}>
                                            <div>$ {promocion.precioOferta}</div>
                                            <Button onClick={() => agregarPedido(promocion)} size='sm' className='bg-otro' radius='full' isIconOnly>
                                                <span style={{ fontSize: '1.4em', color: 'white' }} className='material-icons-outlined'>
                                                    add
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            </Card>
                        ))}
                    </div>
                </>
            )}


            {value ==1  &&(
                <>
                    <PromoIndividual pedidoElegido={pedido} />
                </>
            )}

        </div>
    );

}

export default App;
