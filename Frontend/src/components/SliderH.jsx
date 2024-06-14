import React from "react";

const allProducts = [
  {
    name: "Paella",
    description: "Arroz, mariscos, azafrán",
    price: "$15.000",
    imageUrl: "https://ibb.co/hWgjNQG",
  },
  {
    name: "Enchiladas",
    description: "Tortillas, pollo, salsa roja",
    price: "$11.900",
    imageUrl: "https://ibb.co/W649Xr1",
  },
  {
    name: "Cheeseburger",
    description: "Carne, queso, lechuga, tomate",
    price: "$8.000",
    imageUrl: "https://ibb.co/gwdGFbP",
  },
  {
    name: "Bacon Burger",
    description: "Carne, tocino, queso, cebolla",
    price: "$9.500",
    imageUrl: "https://ibb.co/RNQKcxB",
  },
  {
    name: "PROCCIUTO RUCOLA",
    description: "Salsa de Pizza, Queso Mozzarella, Procciuto Crudo, Tomate Cherry, Rucula",
    price: "$12.500",
    imageUrl: "https://fudo-apps-storage.s3.sa-east-1.amazonaws.com/production/150061/common/products/8",
  },
  {
    name: "CARBONARA",
    description: "Salsa Bianche, Queso Mozzarella, Cebolla Morada, Champiñón y Tocino",
    price: "$10.500",
    imageUrl: "https://fudo-apps-storage.s3.sa-east-1.amazonaws.com/production/150061/common/products/23",
  }
];

const getRandomProducts = (num) => {
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const SliderH = () => {
  const products = getRandomProducts(4);

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

