import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ModalContent } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import db from '../services/db';
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../app/slides/pedidoView";

const PayConfirm = () => {
  const dispatch = useDispatch();

  const handleViewChange = (view) => {
    dispatch(setView(view));
  };

  const [misPedidos, setMisPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const pedidos = await db.obtenerPedidos(); // Asumiendo que obtienes los detalles completos de los pedidos incluyendo las promociones
        setMisPedidos(pedidos);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
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

  const [promos, setPromos] = useState([])
  const [precioTotalPromo, setPrecioTotalPromo] = useState(0);

  const seleccionarPedido = async (promociones) => {
    try {
      const detallesPromos = await Promise.all(promociones.map(async (promocionT) => {
        const minipromo = await db.obtenerPromocionId(promocionT.promocion);

        const fullpromo = {
          minipromo,
          comentario: promocionT.comentario
        };

        return fullpromo;
      }));

      setPromos(detallesPromos);

      // Calcular el precio total de las promociones
      const total = detallesPromos.reduce((acc, promo) => acc + promo.minipromo.precioOferta, 0);
      setPrecioTotalPromo(total);

    } catch (error) {
      console.error("Error al seleccionar el pedido:", error);
    }
  };



  return (
    <div>
      <div style={{ display: "flex", background: "#DDBD8C", justifyContent: "space-between", alignItems: "center", padding: "2%" }}>
        <Button onClick={() => handleViewChange("home")} isIconOnly variant="light" radius="none" style={{ position: "absolute" }}>
          <span style={{ color: "#1F1120" }} className="material-icons-outlined">
            chevron_left
          </span>
        </Button>
        <div />
        <p className="text-primario" style={{ textAlign: "center", fontSize: "1.5em" }}>
          Pedidos
        </p>
        <div />
      </div>
      <Table style={{ overflowX: "hidden" }} aria-label="Tabla de Pedidos">
        <TableHeader>
          <TableColumn>Cliente/Mesa</TableColumn>
          <TableColumn>Promociones</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {misPedidos.map((pedido, index) => (
            <TableRow key={index}>
              <TableCell>
                <Button style={{fontSize:"2.4em",color:"white"}} variant="flat" className="bg-primario">
                  {pedido.numMesa}
                </Button>


              </TableCell>
              <TableCell>
                <Button onClick={() => { seleccionarPedido(pedido.promociones), setIsModalVisible(true) }}> Ver promos</Button>
              </TableCell>
              <TableCell>
                <p onClick={() => {}}>{pedido.estado}</p>
              </TableCell>
              <TableCell style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="bg-primario" style={{ color: "white" }} size="sm" isIconOnly variant="flat">
                      <span className="material-icons-outlined">
                        more_vert
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Opciones">
                    <DropdownItem key="disponibilidad">
                      <Button variant="flat" onClick={() => { /* Lógica para cambiar disponibilidad */ }}>
                        Cambiar Disponibilidad
                      </Button>
                    </DropdownItem>
                    <DropdownItem onClick={() => { /* Lógica para ver ingredientes */ }} key="ingredientes">
                      Ver ingredientes
                    </DropdownItem>
                    <DropdownItem onClick={() => { /* Lógica para editar */ }} key="editar">
                      Editar
                    </DropdownItem>
                    <DropdownItem onClick={() => { /* Lógica para eliminar */ }} style={{ color: "red" }} key="eliminar">
                      Eliminar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal placement="center" isOpen={isModalVisible} onOpenChange={() => setIsModalVisible(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Promociones del pedido</ModalHeader>
              <ModalBody>
                {promos.map((fullpromo, index) => (
                  <div key={index}>
                    <p style={{ fontSize: "1.3em" }}>{fullpromo.minipromo.nombre}</p>
                    <p style={{ fontSize: "1em", color: "#454545" }}>Comentario: {fullpromo.comentario}</p>


                  </div>
                ))}
                <p style={{ fontSize: "1.5em" }}>Precio Total: $ {precioTotalPromo} </p>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
};

export default PayConfirm;
