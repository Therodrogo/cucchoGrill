import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const discounts = [
  {
    title: "Rodeo",
    description: "Carne, queso, lechuga, tomate",
    img: "https://i.ibb.co/xGYy8Kf/hamburguesa1.jpg",
    originalPrice: "$10.000",
    discountPrice: "$8.000",
  },
  {
    title: "Cheese Burger",
    description: "Carne, Pepinillos, queso, cebolla",
    img: "https://i.ibb.co/5ks3LNn/hamburguesa2.jpg",
    originalPrice: "$12.000",
    discountPrice: "$9.500",
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
