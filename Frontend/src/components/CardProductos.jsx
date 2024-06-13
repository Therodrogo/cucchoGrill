import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const sections = [
  {
    title: "Comida Casera",
    items: [
      {
        title: "Paella",
        description: "Arroz, mariscos, azafrán",
        img: "/images/paella.jpeg",
        price: "$15.00",
      },
      {
        title: "Enchiladas",
        description: "Tortillas, pollo, salsa roja",
        img: "/images/enchiladas.jpeg",
        price: "$12.00",
      },
    ],
  },
  {
    title: "Hamburguesas",
    items: [
      {
        title: "Cheeseburger",
        description: "Carne, queso, lechuga, tomate",
        img: "/images/cheeseburger.jpeg",
        price: "$8.00",
      },
      {
        title: "Bacon Burger",
        description: "Carne, tocino, queso, cebolla",
        img: "/images/bacon-burger.jpeg",
        price: "$9.50",
      },
    ],
  },
  {
    title: "Snacks",
    items: [
      {
        title: "Nachos",
        description: "Totopos, queso, jalapeños",
        img: "/images/nachos.jpeg",
        price: "$5.00",
      },
      {
        title: "Chips",
        description: "Papas fritas",
        img: "/images/chips.jpeg",
        price: "$3.50",
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
