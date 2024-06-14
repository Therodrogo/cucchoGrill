import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const sections = [
  {
    title: "Comida Casera",
    items: [
      {
        title: "Paella",
        description: "Arroz, mariscos, azafrán",
        img: "https://i.ibb.co/XsWgP0n/paella.jpg",
        price: "$15.000",
      },
      {
        title: "Enchiladas",
        description: "Tortillas, pollo, salsa roja",
        img: "https://i.ibb.co/t4Tf605/enchiladas.jpg",
        price: "$11.900",
      },
    ],
  },
  {
    title: "Hamburguesas",
    items: [
      {
        title: "Rodeo",
        description: "Carne, queso, lechuga, tomate",
        img: "https://i.ibb.co/xGYy8Kf/hamburguesa1.jpg",
        price: "$8.000",
      },
      {
        title: "Cheese Burger",
        description: "Carne, Pepinillos , queso, cebolla",
        img: "https://i.ibb.co/5ks3LNn/hamburguesa2.jpg",
        price: "$9.500",
      },
    ],
  },
  {
    title: "Pizzas",
    items: [
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
    ],
  },
];

export default function App() {
  return (
    <div className="container mx-auto p-4">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
            {section.items.map((item, itemIndex) => (
              <Card shadow="sm" key={itemIndex} isPressable onPress={() => console.log("item pressed")}>
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
      ))}
    </div>
  );
}
