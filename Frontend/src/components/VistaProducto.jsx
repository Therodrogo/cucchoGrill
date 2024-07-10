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
    const [precio, setPrecio] = useState(0);
    const [nombreIngrediente, setNombreIngrediente] = useState("");
    const [ingredientes, setIngredientes] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [foto, setFoto] = useState(null);
    const [visible, setVisible] = useState(true);

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalEditar, setVisibleModalEditar] = useState(false);
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
        if (!nombre.trim() || precio === 0 || !categoria.trim() || ingredientes.length === 0) {
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


    const cambiarVisibilidad = async (id) => {

        console.log(id)

        await db.actualizarVisibilidad(id)

        const obtenerProductos = async () => {
            const productos = await db.obtenerProductos();
            setMisProductos(productos);
        };

        obtenerProductos();
    }

    const [productoSeleccionado, setProductoSelecionado] = useState()

    const obtenerProductoId = async (id) => {

        const productoid = await db.obtenerProductoId(id)

        setProductoSelecionado(id)

        console.log(productoid)

        setNombre(productoid.nombre)
        setPrecio(productoid.precio)
        setIngredientes(productoid.ingredientes)
        setCategoria(productoid.categoria)
        setVisible(productoid.visible)
        setFoto(productoid.foto)
    }

    const handleSubmitEditar = async () => {
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
                        const producto = { _id: productoSeleccionado, nombre, precio, ingredientes, categoria, foto: downloadURL, visible };
    
                        await db.editarProducto(producto);
    
                        console.log("Producto actualizado:", producto);
                        setVisibleModalEditar(false);
    
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Exito!",
                            text: "Producto actualizado con exito.",
                            showConfirmButton: false,
                            showCloseButton: true,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-popup',
                                title: 'swal2-title',
                            }
                        });
    
                        setLoading(false);
    
                        setMisProductos((prevProductos) =>
                            prevProductos.map((p) => (p._id === productoSeleccionado ? producto : p))
                        );
                    });
                }
            );
        } else {
            const producto = { _id: productoSeleccionado, nombre, precio, ingredientes, categoria, foto: "", visible };
    
            await db.editarProducto(producto);
    
            console.log("Producto actualizado:", producto);
    
            setVisibleModalEditar(false);
    
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Exito!",
                text: "Producto actualizado con exito.",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
    
            setMisProductos((prevProductos) =>
                prevProductos.map((p) => (p._id === productoSeleccionado ? producto : p))
            );
        }
    };
    
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "2%" }}>
                <Button isIconOnly style={{ position: "absolute" }}>
                    <span style={{ color: "#454545" }} className="material-icons-outlined">
                        chevron_left
                    </span>
                </Button>
                <div>

                </div>
                <p className="text-primario" style={{ textAlign: "center", fontSize: "1.5em" }}>
                    Productos
                </p>
                <div>

                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "end", alignItems: "center", margin: "2%" }}>
                <p>Crear producto</p>
                <Button isIconOnly radius="full" className="bg-primario" style={{ color: "white", marginLeft: "2%" }} variant="flat" onClick={() => { setVisibleModal(true) }}>
                    <span className="material-icons-outlined">
                        add
                    </span>
                </Button>
            </div>


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

            <Table style={{ overflowX: "hidden" }} aria-label="Example static collection table">
                <TableHeader>

                    <TableColumn>Nombre</TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Stock</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    {misProductos.map((producto, index) => (
                        <TableRow key={index}>

                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>
                                <User

                                    avatarProps={{
                                        src: producto.foto,
                                    }}
                                />
                            </TableCell>
                            <TableCell style={{ width: "20%" }}>${producto.precio}</TableCell>
                            <TableCell>
                                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                                    <span className="material-icons-outlined">
                                        {producto.visible ? "visibility" : "visibility_off"}
                                    </span>
                                </div>

                            </TableCell>
                            <TableCell style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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

                                                <Button variant="flat" onClick={() => { cambiarVisibilidad(producto._id) }}>
                                                    Cambiar Disponibilidad
                                                </Button>
                                            </DropdownItem>
                                            <DropdownItem key="ingredientes">
                                                Ver ingredientes
                                            </DropdownItem>




                                            <DropdownItem onClick={() => { obtenerProductoId(producto._id), setVisibleModalEditar(true) }} key="editar">
                                                Editar
                                            </DropdownItem>





                                            <DropdownItem style={{ color: "red" }} key="eliminar">
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


            <Modal style={{ maxHeight: "80%", overflow: "scroll" }} placement={"center"} isOpen={visibleModalEditar} onOpenChange={() => { setVisibleModalEditar(false) }}>
                <ModalContent>
                    {(onClose2) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Editar producto</ModalHeader>
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
                                <Button className="bg-primario" style={{ color: "white" }} onClick={handleSubmitEditar} disabled={loading}>
                                    {loading ? "Cargando..." : "Crear"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
