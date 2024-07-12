import React, { useState, useEffect } from "react";
import { Modal, Chip, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, User } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { storage } from "../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import db from '../services/db';
import { useDispatch, useSelector } from "react-redux";

import { setView } from "../app/slides/pedidoView";

export default function Promociones() {
    const dispatch = useDispatch();

    const handleViewChange = (view) => {
        dispatch(setView(view));
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [nombre, setNombre] = useState("");
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [precioOferta, setPrecioOferta] = useState(0);
    const [fotoPromo, setFotoPromo] = useState(null);
    const [visible, setVisible] = useState(true);

    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [misPromociones, setMisPromociones] = useState([]);
    const [misProductos, setMisProductos] = useState([]);

    useEffect(() => {
        const obtenerPromociones = async () => {
            const promociones = await db.obtenerPromociones();
            setMisPromociones(promociones);
        };

        const obtenerProductos = async () => {
            const productos = await db.obtenerProductos();
            setMisProductos(productos);
        };

        obtenerPromociones();
        obtenerProductos();
    }, []);

    useEffect(() => {
        // Calcular el precio de oferta cuando cambia el descuento
        const calcularPrecioOferta = () => {
            const descuentoDecimal = parseFloat(descuento) / 100;
            const precioTotalFloat = parseFloat(precioTotal);
            const precioOfertaCalculado = precioTotalFloat * (1 - descuentoDecimal);
            setPrecioOferta(precioOfertaCalculado.toFixed(2)); // Redondear a dos decimales
        };

        calcularPrecioOferta();
    }, [descuento, precioTotal]);

    const validateFields = () => {
        if (!nombre.trim() || productosSeleccionados.length === 0 || precioTotal === 0 || descuento === 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "No deben existir campos vacíos y el descuento no puede ser 0.",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        setError("");

        if (fotoPromo) {
            setLoading(true);
            const storageRef = ref(storage, `fotosPromos/${nombre}`);
            const uploadTask = uploadBytesResumable(storageRef, fotoPromo);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progreso de la carga: ${progress}%`);
                },
                (error) => {
                    console.error("Error al cargar la imagen:", error);
                    setLoading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log("URL de la imagen subida:", downloadURL);

                        const ids = []
                        productosSeleccionados.forEach(element => {
                            console.log(element)
                            ids.push(element)
                        });
                        const promocion = { nombre, productos: ids, precioTotal, descuento, precioOferta, fotoPromo: downloadURL, visible };

                        const resp = await db.crearPromocion(promocion);

                        console.log("Promoción creada:", promocion);

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Éxito!",
                            text: "Promoción añadida con éxito.",
                            showConfirmButton: false,
                            showCloseButton: true,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-popup',
                                title: 'swal2-title',
                            }
                        });

                        setNombre("")
                        setProductosSeleccionados([])
                        setPrecioTotal(0)
                        setDescuento(0)
                        setPrecioOferta(0)
                        setFotoPromo(null)
                        setLoading(false);
                        setVisible(true)

                        setVisibleModal(false);
                        setMisPromociones((prev) => [...prev, promocion]);
                    });
                }
            );
        } else {
            const ids = []
            productosSeleccionados.forEach(element => {

                ids.push(element)
            });

            const promocion = { nombre, productos: ids, precioTotal, descuento, precioOferta, fotoPromo: "", visible };

            const resp = await db.crearPromocion(promocion);

            console.log("Promoción creada:", promocion);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Éxito!",
                text: "Promoción añadida con éxito.",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
            setNombre("")
            setProductosSeleccionados([])
            setPrecioTotal(0)
            setDescuento(0)
            setPrecioOferta(0)
            setFotoPromo(null)
            setLoading(false);
            setVisible(true)
            setVisibleModal(false);
            setMisPromociones((prev) => [...prev, promocion]);
        }
    };

    const handleFotoChange = (e) => {
        if (e.target.files[0]) {
            setFotoPromo(e.target.files[0]);
        }
    };

    const cambiarVisibilidad = async (id) => {
        console.log(id)

        await db.actualizarVisibilidadPromocion(id)

        const obtenerPromociones = async () => {
            const promociones = await db.obtenerPromociones();
            setMisPromociones(promociones);
        };

        obtenerPromociones();
    }

    const [promocionSeleccionada, setPromocionSeleccionada] = useState(null)

    const obtenerPromocionId = async (id) => {
        const promocion = await db.obtenerPromocionId(id)

        setPromocionSeleccionada(promocion._id)

        setNombre(promocion.nombre)
        setProductosSeleccionados(promocion.productos)
        setPrecioTotal(promocion.precioTotal)
        setDescuento(promocion.descuento)
        setPrecioOferta(promocion.precioOferta)
        setFotoPromo(promocion.fotoPromo)
        setVisible(promocion.visible)
    }

    const handleSubmitEditar = async () => {
        if (!validateFields()) {
            return;
        }

        setError("");

        if (fotoPromo) {
            setLoading(true);
            const storageRef = ref(storage, `fotosPromos/${nombre}`);
            const uploadTask = uploadBytesResumable(storageRef, fotoPromo);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progreso de la carga: ${progress}%`);
                },
                (error) => {
                    console.error("Error al cargar la imagen:", error);
                    setLoading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log("URL de la imagen subida:", downloadURL);

                        const ids = []
                        productosSeleccionados.forEach(element => {

                            ids.push(element)
                        });


                        const promocion = { _id: promocionSeleccionada, nombre, productos: ids, precioTotal, descuento, precioOferta, fotoPromo: downloadURL, visible };

                        await db.editarPromocion(promocion);

                        console.log("Promoción actualizada:", promocion);
                        setVisibleModal(false);

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Éxito!",
                            text: "Promoción actualizada con éxito.",
                            showConfirmButton: false,
                            showCloseButton: true,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-popup',
                                title: 'swal2-title',
                            }
                        });
                        setNombre("")
                        setProductosSeleccionados([])
                        setPrecioTotal(0)
                        setDescuento(0)
                        setPrecioOferta(0)
                        setFotoPromo(null)
                        setLoading(false);
                        setVisible(true)

                        setLoading(false);

                        setMisPromociones((prevPromociones) =>
                            prevPromociones.map((p) => (p._id === promocionSeleccionada ? promocion : p))
                        );
                    });
                }
            );
        } else {

            const ids = []
            productosSeleccionados.forEach(element => {

                ids.push(element)
            });

            const promocion = { _id: promocionSeleccionada, nombre, productos: ids, precioTotal, descuento, precioOferta, fotoPromo: "", visible };

            await db.editarPromocion(promocion);

            console.log("Promoción actualizada:", promocion);

            setVisibleModal(false);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Éxito!",
                text: "Promoción actualizada con éxito.",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
            setNombre("")
            setProductosSeleccionados([])
            setPrecioTotal(0)
            setDescuento(0)
            setPrecioOferta(0)
            setFotoPromo(null)
            setLoading(false);
            setVisible(true)

            setMisPromociones((prevPromociones) =>
                prevPromociones.map((p) => (p._id === promocionSeleccionada ? promocion : p))
            );
        }
    };

    const eliminarPromocion = async (id) => {
        try {
            await db.eliminarPromocion(id);

            setMisPromociones((prevPromociones) => prevPromociones.filter(promocion => promocion._id !== id));

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Promoción eliminada",
                text: "La promoción ha sido eliminada con éxito.",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
        } catch (error) {
            console.error("Error al eliminar la promoción:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "Hubo un problema al eliminar la promoción. Inténtalo de nuevo.",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
        }
    };

    return (
        <div>
            <div style={{ display: "flex", background: "#DDBD8C", justifyContent: "space-between", alignItems: "center", padding: "2%" }}>
                <Button onClick={()=>{handleViewChange("home")}} isIconOnly variant="light" radius="none" style={{ position: "absolute" }}>
                    <span style={{ color: "#1F1120" }} className="material-icons-outlined">
                        chevron_left
                    </span>
                </Button>
                <div>

                </div>
                <p className="text-primario" style={{ textAlign: "center", fontSize: "1.5em" }}>
                    Promociones
                </p>
                <div>

                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2%" }}>
                <p>Crear Promoción</p>
                <Button size="sm" isIconOnly radius="full" className="bg-primario" style={{ color: "white", marginLeft: "2%" }} variant="flat" onPress={onOpen}>
                    <span className="material-icons-outlined">
                        add
                    </span>
                </Button>
            </div>

            <Modal style={{ maxHeight: "80%", overflow: "scroll" }} placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar Promoción</ModalHeader>
                            <ModalBody>
                                <Input

                                    required
                                    label="Nombre de la Promoción"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    variant="underlined"
                                />
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="bordered">Seleccionar Productos</Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection actions"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="multiple"
                                        selectedKeys={productosSeleccionados}
                                        onSelectionChange={setProductosSeleccionados}
                                    >
                                        {misProductos.map(producto => (
                                            <DropdownItem key={producto._id}>{producto.nombre}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>



                                <Input
                                    required
                                    label="Precio Total"
                                    type="number"
                                    value={precioTotal}
                                    onChange={(e) => setPrecioTotal(e.target.value)}
                                    variant="underlined"
                                />
                                <Input
                                    required
                                    label="Descuento (%)"
                                    type="number"
                                    value={descuento}
                                    onChange={(e) => setDescuento(e.target.value)}
                                    variant="underlined"
                                />
                                <Input
                                    required
                                    label="Precio Oferta"
                                    type="number"
                                    value={precioOferta}
                                    onChange={(e) => setPrecioOferta(e.target.value)}
                                    variant="underlined"
                                />
                                <input type="file" onChange={handleFotoChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    color="success"
                                    variant="flat"
                                    onPress={promocionSeleccionada ? handleSubmitEditar : handleSubmit}
                                >
                                    {promocionSeleccionada ? "Actualizar" : "Añadir"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Table aria-label="Example table with dynamic content">
                <TableHeader>
                    <TableColumn>Promoción</TableColumn>
                    <TableColumn>Imagen</TableColumn>

                    <TableColumn>Precio Total</TableColumn>
                    <TableColumn>Descuento %</TableColumn>
                    <TableColumn>Precio Oferta</TableColumn>

                    <TableColumn>Visibilidad</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {misPromociones.map((promocion) => (
                        <TableRow key={promocion._id}>
                            <TableCell>{promocion.nombre}</TableCell>
                            <TableCell>
                                {promocion.fotoPromo && (
                                    <User
                                        avatarProps={{
                                            src: promocion.fotoPromo,
                                        }}
                                    />

                                )}
                            </TableCell>
                            <TableCell>$ {promocion.precioTotal}</TableCell>
                            <TableCell>{promocion.descuento} %</TableCell>
                            <TableCell>$ {promocion.precioOferta}</TableCell>

                            <TableCell>
                                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                                    <span className="material-icons-outlined">
                                        {promocion.visible ? "visibility" : "visibility_off"}
                                    </span>
                                </div>

                            </TableCell>
                            <TableCell>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "5px" }}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="bg-primario" style={{ color: "white" }} size="sm" isIconOnly variant="flat">
                                                <span className="material-icons-outlined">
                                                    more_vert
                                                </span>
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Dynamic Actions">

                                            <DropdownItem key="disponibilidad">
                                                <Button variant="flat" onClick={() => { }}>
                                                    Cambiar Disponibilidad
                                                </Button>
                                            </DropdownItem>

                                            <DropdownItem onClick={() => { }} key="ingredientes">
                                                Ver ingredientes
                                            </DropdownItem>

                                            <DropdownItem onClick={() => { }} key="editar">
                                                Editar
                                            </DropdownItem>

                                            <DropdownItem onClick={() => { }} style={{ color: "red" }} key="eliminar">
                                                Eliminar
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}
