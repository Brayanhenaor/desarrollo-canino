import { poppins } from "@/app/utils/fonts/fonts";
import React from "react";

const plans = [
  {
    name: "Valoración online",
    description: "Valoración de los problemas conductuales de tu peludo.",
    image: "dog1.jpg",
  },
  {
    name: "Valoración presencial",
    description:
      "Reunion presencial para valorar el mejor plan para tu peludo.",
    image: "services2.jpg",
  },
  {
    name: "Obediencia basica",
    description:
      "Reunion presencial para valorar el mejor plan para tu peludo.",
    image: "services2.jpg",
  },
  {
    name: "Obediencia avanzada",
    description:
      "Reunion presencial para valorar el mejor plan para tu peludo.",
    image: "services3.jpg",
  },
  {
    name: "Modificacion de conducta",
    description:
      "Reunion presencial para valorar el mejor plan para tu peludo.",
    image: "services4.jpg",
  },
];
export const Services = () => {
  return (
    <section className={poppins.className}>
        <h2 className="font-bold text-3xl flex justify-center">Servicios</h2>
      <div className="flex flex-wrap justify-center">
        {plans.map((plan, index) => (
          <div className="basis-full md:basis-1/2 lg:basis-1/3 overflow-hidden p-2" key={index}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                className="w-full h-[250px] object-cover rounded-lg"
                src={plan.image}
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <div className="absolute p-5 inset-0 gap-1 flex-col flex justify-end items-center">
                <h3 className="text-white text-2xl font-bold">{plan.name}</h3>
                <p className="text-white text-center">{plan.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
