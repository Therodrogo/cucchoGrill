import React, { useState, useEffect } from "react";

const messages = [
  "Estamos ubicados en el corazón de la ciudad, ¡ven a visitarnos!",
  "Ofrecemos productos de la más alta calidad, seleccionados cuidadosamente para ti.",
  "Disfruta de nuestras especialidades caseras hechas con amor y dedicación.",
  "Nuestros chefs utilizan ingredientes frescos y locales en cada plato.",
  "Ven y prueba nuestras deliciosas hamburguesas y pizzas, ¡te encantarán!",
  "Ofrecemos descuentos diarios en productos seleccionados, ¡no te los pierdas!"
];

const Carrousel = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">{messages[currentMessageIndex]}</h2>
      </div>
    </div>
  );
};

export default Carrousel;
