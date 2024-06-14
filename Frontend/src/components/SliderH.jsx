import React from "react";

const allProducts = [
  {
    name: "Paella",
    description: "Arroz, mariscos, azafrán",
    imageUrl: "https://i.ibb.co/XsWgP0n/paella.jpg",
    price: "$15.000",
  },
  {
    name: "Enchiladas",
    description: "Tortillas, pollo, salsa roja",
    imageUrl: "https://i.ibb.co/t4Tf605/enchiladas.jpg",
    price: "$11.900",
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