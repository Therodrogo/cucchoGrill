import React, { useState } from "react";
import { Modal, Chip, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [nombreIngrediente, setNombreIngrediente] = useState(""); // Nuevo estado para el nombre del ingrediente
    const [ingredientes, setIngredientes] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [foto, setFoto] = useState("");
    const [visible, setVisible] = useState(true);

    const handleAgregarIngrediente = (e) => {
        if (e.key === "Enter" && nombreIngrediente.trim() !== "") {
            setIngredientes([...ingredientes, nombreIngrediente]); // Agregar el nombreIngrediente al estado de ingredientes
            setNombreIngrediente(""); // Limpiar el campo de input de ingredientes
        }
    };

    const handleEliminarIngrediente = (index) => {
        const newIngredientes = [...ingredientes];
        newIngredientes.splice(index, 1);
        setIngredientes(newIngredientes);
    };

    const handleSubmit = () => {
        const producto = { nombre, precio, ingredientes, categoria, foto, visible };
        console.log("Producto creado:", producto);
        // Aquí puedes agregar la lógica para enviar el producto a tu backend
    };

    return (
        <>
            <Button variant="bordered" onPress={onOpen}>Crear Producto</Button>
            <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear producto</ModalHeader>
                            <ModalBody>
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
                                <Input
                                    variant="underlined"
                                    label="Ingredientes"
                                    placeholder="Presiona Enter para agregar"
                                    value={nombreIngrediente} // Usar el estado nombreIngrediente en lugar de e.target.value
                                    onChange={(e) => setNombreIngrediente(e.target.value)}
                                    onKeyDown={handleAgregarIngrediente}
                                />
                                <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                                    {ingredientes.map((ingrediente, index) => (
                                        <div key={index} >
                                            <Chip onClose={() => handleEliminarIngrediente(index)} >
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
                                <Input
                                    variant="underlined"
                                    label="Foto"
                                    placeholder="URL de la foto"
                                    value={foto}
                                    onChange={(e) => setFoto(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={() => { handleSubmit(); onClose(); }}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
