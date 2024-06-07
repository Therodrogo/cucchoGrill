import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const PayConfirm = () => {
  const orders = [
    {
      name: "Tony Reichert",
      email: "tony.reichert@example.com",
      order: "Pedido 1",
      details: "Productos, Promociones",
      total: "$X.XXX",
      imageUrl: "https://via.placeholder.com/40?text=TR"
    },
    {
      name: "Zoey Lang",
      email: "zoey.lang@example.com",
      order: "Pedido 2",
      details: "Productos, Promociones",
      total: "$X.XXX",
      imageUrl: "https://via.placeholder.com/40?text=ZL"
    },
    {
      name: "Jane Fisher",
      email: "jane.fisher@example.com",
      order: "Pedido 3",
      details: "Productos, Promociones",
      total: "$X.XXX",
      imageUrl: "https://via.placeholder.com/40?text=JF"
    },
    {
      name: "Mesa 1",
      email: "william.howard@example.com",
      order: "Pedido 4",
      details: "Productos, Promociones",
      total: "$X.XXX",
      imageUrl: "https://via.placeholder.com/40?text=M1"
    },
    {
      name: "Kristen Copper",
      email: "kristen.cooper@example.com",
      order: "Pedido 5",
      details: "Productos, Promociones",
      total: "$X.XXX",
      imageUrl: "https://via.placeholder.com/40?text=KC"
    }
  ];

  const handleAction = (action, item) => {
    alert(`Acción: ${action} en ${item}`);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border rounded shadow-lg">
      <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-t font-bold">
        <span>Nombre/Mesa</span>
        <span>Pedido</span>
        <span>Pagar</span>
        <span>Estado</span>
      </div>
      <div className="bg-white rounded-b">
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between p-2 border-b last:border-b-0">
            <div className="flex items-center">
              <img src={order.imageUrl} alt={order.name} className="w-8 h-8 rounded-full mr-2" />
              <div className="flex flex-col">
                <span className="font-medium">{order.name}</span>
                <span className="text-gray-500 text-sm">{order.email}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{order.order}</span>
              <span className="text-gray-500 text-sm">{order.details}</span>
            </div>
            <div className="text-right w-24 font-medium">{order.total}</div>
            <div>
              <FaPlusCircle className="text-green-500 cursor-pointer" onClick={() => handleAction('confirm', order.name)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayConfirm;
