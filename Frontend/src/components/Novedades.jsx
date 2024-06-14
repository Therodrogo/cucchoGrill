import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const novedades = [
  {
    title: "Paella",
    description: "Arroz, mariscos, azafrán",
    img: "https://ibb.co/hWgjNQG",
    price: "$15.000",
  },
  {
    title: "Enchiladas",
    description: "Tortillas, pollo, salsa roja",
    img: "https://ibb.co/W649Xr1",
    price: "$11.900",
  },
  {
    title: "Cheeseburger",
    description: "Carne, queso, lechuga, tomate",
    img: "https://ibb.co/gwdGFbP",
    price: "$8.000",
  },
  {
    title: "Bacon Burger",
    description: "Carne, tocino, queso, cebolla",
    img: "https://ibb.co/RNQKcxB",
    price: "$9.500",
  },
  {
    title: "PROCCIUTO RUCOLA",
    description: "Salsa de Pizza, Queso Mozzarella, Procciuto Crudo, Tomate Cherry, Rucula",
    img: "https://fudo-apps-storage.s3.sa-east-1.amazonaws.com/production/150061/common/products/8",
    price: "$12.500",
  },
  {
    title: "CARBONARA",
    description: "Salsa Bianche, Queso Mozzarella, Cebolla Morada, Champiñón y Tocino",
    img: "https://fudo-apps-storage.s3.sa-east-1.amazonaws.com/production/150061/common/products/23",
    price: "$10.500",
  },
];

const Novedades = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Novedades</h2>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
        {novedades.map((item, index) => (
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
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Novedades;
