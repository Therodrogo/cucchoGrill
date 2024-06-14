import React from 'react';

const products = [
  {
    name: "Nombre producto 1",
    description: "Descripción del producto o promo",
    price: "$10.00",
    imageUrl: "https://via.placeholder.com/150?text=Producto+1"
  },
  {
    name: "Nombre producto 2",
    description: "Descripción del producto o promo",
    price: "$20.00",
    imageUrl: "https://via.placeholder.com/150?text=Producto+2"
  },
  {
    name: "Nombre producto 3",
    description: "Descripción del producto o promo",
    price: "$30.00",
    imageUrl: "https://via.placeholder.com/150?text=Producto+3"
  },
  {
    name: "Nombre producto 4",
    description: "Descripción del producto o promo",
    price: "$40.00",
    imageUrl: "https://via.placeholder.com/150?text=Producto+4"
  },
  {
    name: "Nombre producto 5",
    description: "Descripción del producto o promo",
    price: "$50.00",
    imageUrl: "https://via.placeholder.com/150?text=Producto+5"
  }
];

const SliderH = () => {
  return (
    <div className="overflow-x-scroll flex space-x-4 p-4">
      {products.map((product, index) => (
        <div key={index} className="flex-shrink-0 w-64 p-4 rounded-lg shadow-lg bg-white">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
          <div className="p-2">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <p className="text-black font-bold">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderH;
