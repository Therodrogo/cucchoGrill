import React, { useState, useEffect } from "react";
import { Modal, Chip, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { storage } from "../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import db from '../services/db';

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [nombreIngrediente, setNombreIngrediente] = useState("");
    const [ingredientes, setIngredientes] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [foto, setFoto] = useState(null);
    const [visible, setVisible] = useState(true);

    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [misProductos, setMisProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            const productos = await db.obtenerProductos();
            setMisProductos(productos);
        };

        obtenerProductos();
    }, []);

    const handleAgregarIngrediente = (e) => {
        if (e.key === "Enter" && nombreIngrediente.trim() !== "") {
            setIngredientes([...ingredientes, nombreIngrediente]);
            setNombreIngrediente("");
        }
    };

    const handleAgregarIngredienteBoton = () => {
        if (nombreIngrediente.trim() !== "") {
            setIngredientes([...ingredientes, nombreIngrediente]);
            setNombreIngrediente("");
        }
    };

    const handleEliminarIngrediente = (index) => {
        const newIngredientes = [...ingredientes];
        newIngredientes.splice(index, 1);
        setIngredientes(newIngredientes);
    };

    const validateFields = () => {
        if (!nombre.trim() || !precio.trim() || !categoria.trim() || ingredientes.length === 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "No debe existir campos vacios.",
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

        if (foto) {
            setLoading(true);
            const storageRef = ref(storage, `fotos/${nombre}`);
            const uploadTask = uploadBytesResumable(storageRef, foto);

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
                        const producto = { nombre, precio, ingredientes, categoria, foto: downloadURL, visible };

                        await db.crearProducto(producto);

                        console.log("Producto creado:", producto);

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Exito!",
                            text: "Producto añadido con exito.",
                            showConfirmButton: false,
                            showCloseButton: true,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-popup',
                                title: 'swal2-title',
                            }
                        });

                        setLoading(false);
                        setVisibleModal(false);
                        setMisProductos((prev) => [...prev, producto]);
                    });
                }
            );
        } else {
            const producto = { nombre, precio, ingredientes, categoria, foto: "", visible };

            await db.crearProducto(producto);

            console.log("Producto creado:", producto);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Exito!",
                text: "Producto añadido con exito.",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });

            setVisibleModal(false);
            setMisProductos((prev) => [...prev, producto]);
        }
    };

    const handleFotoChange = (e) => {
        if (e.target.files[0]) {
            setFoto(e.target.files[0]);
        }
    };

    return (
        <>
            <Button variant="bordered" onClick={() => { setVisibleModal(true) }}>Crear Producto</Button>
            <Modal style={{ maxHeight: "80%", overflow: "scroll" }} placement={"center"} isOpen={visibleModal} onOpenChange={() => { setVisibleModal(false) }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear producto</ModalHeader>
                            <ModalBody>
                                {error && <div style={{ color: "red" }}>{error}</div>}
                                <Input
                                    variant="underlined"
                                    label="Nombre"
                                    placeholder="Nombre del producto"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Input
                                    variant="underlined"
                                    label="Precio"
                                    placeholder="Precio del producto"
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    required
                                />
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
                                    <Input
                                        variant="underlined"
                                        label="Ingredientes"
                                        placeholder="Presiona Enter para agregar"
                                        value={nombreIngrediente}
                                        onChange={(e) => setNombreIngrediente(e.target.value)}
                                        onKeyDown={handleAgregarIngrediente}
                                    />
                                    <Button onClick={handleAgregarIngredienteBoton} size="sm" className="bg-fondo" style={{ marginTop: "20px" }} isIconOnly radius="full">
                                        <span style={{ color: "white", fontSize: "1.4em" }} className="material-icons-outlined">
                                            add
                                        </span>
                                    </Button>
                                </div>

                                <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                                    {ingredientes.map((ingrediente, index) => (
                                        <div key={index}>
                                            <Chip onClose={() => handleEliminarIngrediente(index)}>
                                                {ingrediente}
                                            </Chip>
                                        </div>
                                    ))}
                                </div>
                                <Input
                                    variant="underlined"
                                    label="Categoría"
                                    placeholder="Categoría del producto"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-primario" style={{ color: "white" }} onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Cargando..." : "Crear"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    {misProductos.map((producto, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div style={{ width: "100%" }} className="flex items-center gap-x-3">
                                    <img
                                        src={producto.foto || "https://via.placeholder.com/150"}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <p className="text-gray-700 text-sm font-medium">
                                            {producto.nombre}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell style={{ width: "20%" }}>${producto.precio}</TableCell>
                            <TableCell style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button size="sm" isIconOnly variant="flat">
                                            <span className="material-icons-outlined">
                                                more_vert
                                            </span>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Dynamic Actions">

                                        <DropdownItem key={1}>
                                            <div style={{display:"flex", height:"30px"}}>
                                                <span class="material-icons-outlined">
                                                    visibility
                                                </span>
                                                <p style={{marginLeft:"10px"}}>
                                                    Disponible
                                                </p>
                                            </div>
                                            <Button variant="flat">Cambiar Disponiblinidad</Button>
                                            
                                        </DropdownItem>
                                        <DropdownItem key={4}>
                                            Ver ingredientes
                                        </DropdownItem>
                                        <DropdownItem key={2}>
                                            Editar
                                        </DropdownItem>
                                        <DropdownItem style={{ color: "red" }} key={3}>
                                            Eliminar
                                        </DropdownItem>

                                    </DropdownMenu>
                                </Dropdown>



                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
