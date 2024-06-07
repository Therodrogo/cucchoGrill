import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AdminCard = () => {
  const handleAction = (action, item) => {
    alert(`Acción: ${action} en ${item}`);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-t">
        <span>Administrar</span>
        <span>Acciones</span>
      </div>
      <ListboxWrapper>
        <Listbox aria-label="Actions">
          <ListboxItem key="pedidos">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <img src="https://example.com/pedidos.jpg" alt="Pedidos" className="w-8 h-8 rounded-full mr-2" />
                Pedidos
              </div>
              <div className="flex items-center space-x-2">
                <FaEye className="text-gray-500 cursor-pointer" onClick={() => handleAction('view', 'Pedidos')} />
                <FaEdit className="text-pink-500 cursor-pointer" onClick={() => handleAction('edit', 'Pedidos')} />
                <FaTrash className="text-pink-500 cursor-pointer" onClick={() => handleAction('delete', 'Pedidos')} />
              </div>
            </div>
          </ListboxItem>
          <ListboxItem key="promociones">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <img src="https://example.com/promociones.jpg" alt="Promociones" className="w-8 h-8 rounded-full mr-2" />
                Promociones
              </div>
              <div className="flex items-center space-x-2">
                <FaEye className="text-gray-500 cursor-pointer" onClick={() => handleAction('view', 'Promociones')} />
                <FaEdit className="text-pink-500 cursor-pointer" onClick={() => handleAction('edit', 'Promociones')} />
                <FaTrash className="text-pink-500 cursor-pointer" onClick={() => handleAction('delete', 'Promociones')} />
              </div>
            </div>
          </ListboxItem>
          <ListboxItem key="productos">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <img src="https://example.com/productos.jpg" alt="Productos" className="w-8 h-8 rounded-full mr-2" />
                Productos
              </div>
              <div className="flex items-center space-x-2">
                <FaEye className="text-gray-500 cursor-pointer" onClick={() => handleAction('view', 'Productos')} />
                <FaEdit className="text-pink-500 cursor-pointer" onClick={() => handleAction('edit', 'Productos')} />
                <FaTrash className="text-pink-500 cursor-pointer" onClick={() => handleAction('delete', 'Productos')} />
              </div>
            </div>
          </ListboxItem>
          <ListboxItem key="usuarios">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <img src="https://example.com/usuarios.jpg" alt="Usuarios" className="w-8 h-8 rounded-full mr-2" />
                Usuarios
              </div>
              <div className="flex items-center space-x-2">
                <FaEye className="text-gray-500 cursor-pointer" onClick={() => handleAction('view', 'Usuarios')} />
                <FaEdit className="text-pink-500 cursor-pointer" onClick={() => handleAction('edit', 'Usuarios')} />
                <FaTrash className="text-pink-500 cursor-pointer" onClick={() => handleAction('delete', 'Usuarios')} />
              </div>
            </div>
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
    </div>
  );
};

export default AdminCard;