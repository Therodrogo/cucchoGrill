import React, { useState, useEffect } from "react";
import { Modal, Chip, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import db from '../services/db';

const PayConfirm = () => {
  const [misPedidos, setMisPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const obtenerPedidos = async () => {
      const productos = await db.obtenerPedidos();
      setMisPedidos(productos);
    };

    obtenerPedidos();
  }, []);

  const handleRowClick = (pedido) => {
    setSelectedPedido(pedido);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPedido(null);
  };

  return (
    <div>
      <Table style={{ overflowX: "hidden" }} aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Cliente</TableColumn>
          <TableColumn></TableColumn>
          <TableColumn>Mesa</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Pedido</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          {misPedidos.map((pedido, index) => (
            <TableRow key={index} onClick={() => handleRowClick(pedido)}>
              <TableCell>{pedido.cliente}</TableCell>
              <TableCell>
                <User
                  avatarProps={{
                    src: pedido.foto,
                  }}
                />
              </TableCell>
              <TableCell>{pedido.mesa}</TableCell>
              <TableCell>${pedido.precio}</TableCell>
              <TableCell>{pedido.pedido}</TableCell>
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
                        <Button variant="flat" onClick={() => { cambiarVisibilidad(pedido.id) }}>
                          Cambiar Disponibilidad
                        </Button>
                      </DropdownItem>
                      <DropdownItem onClick={() => { verIngredientes(pedido.ingredientes), setVerIngredientesModal(true) }} key="ingredientes">
                        Ver ingredientes
                      </DropdownItem>
                      <DropdownItem onClick={() => { obtenerPedidoId(pedido.id), setVisibleModalEditar(true) }} key="editar">
                        Editar
                      </DropdownItem>
                      <DropdownItem onClick={() => { eliminarPedido(pedido.id) }} style={{ color: "red" }} key="eliminar">
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

      {selectedPedido && (
        <Modal open={isModalVisible} onClose={closeModal}>
          <ModalHeader>
            <h4>Información del Pedido</h4>
          </ModalHeader>
          <ModalBody>
            <p><strong>Cliente:</strong> {selectedPedido.cliente}</p>
            <p><strong>Mesa:</strong> {selectedPedido.mesa}</p>
            <p><strong>Precio:</strong> ${selectedPedido.precio}</p>
            <p><strong>Pedido:</strong> {selectedPedido.pedido}</p>
            <User avatarProps={{ src: selectedPedido.foto }} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default PayConfirm;
