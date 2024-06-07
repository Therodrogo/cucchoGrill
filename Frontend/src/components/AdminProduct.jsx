import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AdminProduct = () => {
  const handleAction = (action, item) => {
    alert(`Acción: ${action} en ${item}`);
  };

  const products = [
    {
      name: "Arroz con Pechuga de Pollo",
      price: 6000,
      description: "1 vaso de bebida mediano",
      imageUrl: "https://via.placeholder.com/40x40?text=A"
    },
    {
      name: "Cazuela de Vacuno",
      price: 7000,
      description: "1 vaso de bebida mediano",
      imageUrl: "https://via.placeholder.com/40x40?text=C"
    },
    {
      name: "Hamburguesa Triple",
      price: 8000,
      description: "1 vaso de bebida mediano",
      imageUrl: "https://via.placeholder.com/40x40?text=H"
    },
    {
      name: "Pescado Frito",
      price: 4500,
      description: "1 vaso de bebida mediano",
      imageUrl: "https://via.placeholder.com/40x40?text=P"
    },
    {
      name: "Ramen Grande",
      price: 9000,
      description: "1 vaso de bebida mediano",
      imageUrl: "https://via.placeholder.com/40x40?text=R"
    }
  ];

  return (
    <div className="flex flex-col gap-2 p-4 border rounded shadow-lg">
      <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-t font-bold">
        <span>Promociones</span>
        <span>Precio</span>
        <span>Acciones</span>
      </div>
      <div className="bg-white rounded-b">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-2 border-b last:border-b-0">
            <div className="flex items-center">
              <img src={product.imageUrl} alt={product.name} className="w-8 h-8 rounded-full mr-2" />
              <div className="flex flex-col">
                <span className="font-medium">{product.name}</span>
                <span className="text-gray-500 text-sm">{product.description}</span>
              </div>
            </div>
            <div className="text-right w-24 font-medium">${product.price.toLocaleString()}</div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-gray-500 cursor-pointer" onClick={() => handleAction('view', product.name)} />
              <FaEdit className="text-pink-500 cursor-pointer" onClick={() => handleAction('edit', product.name)} />
              <FaTrash className="text-pink-500 cursor-pointer" onClick={() => handleAction('delete', product.name)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;
