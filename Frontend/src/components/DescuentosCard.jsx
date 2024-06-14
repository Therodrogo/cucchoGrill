import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const discounts = [
  {
    title: "Paella",
    description: "Arroz, mariscos, azafrán",
    img: "https://ibb.co/hWgjNQG",
    originalPrice: "$15.000",
    discountPrice: "$12.000",
  },
  {
    title: "Enchiladas",
    description: "Tortillas, pollo, salsa roja",
    img: "https://ibb.co/W649Xr1",
    originalPrice: "$11.900",
    discountPrice: "$9.500",
  },
  {
    title: "Cheeseburger",
    description: "Carne, queso, lechuga, tomate",
    img: "https://ibb.co/gwdGFbP",
    originalPrice: "$8.000",
    discountPrice: "$6.500",
  },
  {
    title: "Bacon Burger",
    description: "Carne, tocino, queso, cebolla",
    img: "https://ibb.co/RNQKcxB",
    originalPrice: "$9.500",
    discountPrice: "$7.500",
  },
  {
    title: "PROCCIUTO RUCOLA",
    description: "Salsa de Pizza, Queso Mozzarella, Procciuto Crudo, Tomate Cherry, Rucula",
    img: "https://fudo-apps-storage.s3.sa-east-1.amazonaws.com/production/150061/common/products/8",
    originalPrice: "$12.500",
    discountPrice: "$10.000",
  },
  {
    title: "CARBONARA",
    description: "Salsa Bianche, Queso Mozzarella, Cebolla Morada, Champiñón y Tocino",
    img: "https://fudo-apps-storage.s3.sa-east-1.amazonaws.com/production/150061/common/products/23",
    originalPrice: "$10.500",
    discountPrice: "$8.500",
  },
];

const DescuentosCard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Descuentos del Día</h2>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
        {discounts.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="flex flex-col text-small justify-between p-2">
              <b>{item.title}</b>
              <p className="text-default-500">{item.description}</p>
              <p className="text-default-500 line-through">{item.originalPrice}</p>
              <p className="text-red-500 font-bold">{item.discountPrice}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DescuentosCard;