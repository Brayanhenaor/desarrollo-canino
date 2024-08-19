"use client";
import Image from "next/image";
import { anton, poppins } from "./utils/fonts/fonts";
import { color } from "./utils/colors/color";
import { RoundedButton } from "./components/button/RoundedButton";
import { Services } from "./components/plans/Plans";
import { ImageList, ImageListItem } from "@mui/material";

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
];

export default function Home() {
  return (
    <main className="w-screen bg-[#FFF5E4] flex justify-center overflow-x-hidden">
      <div className="">
        <div className="flex flex-col gap-10">
          <section
            className="flex p-4 w-full items-center gap-10 justify-center"
          >
            <div className="flex flex-col justify-center items-center">
              <Image
                alt="p"
                src={'/profile.png'}
                width={170}
                height={170} />
              <span className={`font-bold ${anton.className} text-2xl text-[#8B4513]`}>SANTIAGO</span>
              <span className={`${poppins.className} text-sm text-[#8B4513 mb-2`}>Educador canino</span>
              <p className={`text-center max-w-[50%] text-lg ${poppins.className}`}>
                Hola, soy
                <b> Santiago</b>, adiestrador canino con X experiencia... Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni soluta officia libero. Dicta perspiciatis nostrum veniam placeat ea repellat natus cupiditate. Officiis ab ad aut consectetur aperiam error esse!
              </p>
            </div>

          </section>

          <section
            id="adiestramiento"
            className="flex px-4 py-10 flex-col-reverse bg-[#8B4513] text-[#FFF5E4] w-full md:flex-row items-center gap-10 justify-center"
          >
            <div >
              <div className="container mx-auto flex flex-col mb-2">
                <h2
                  className={`${poppins.className} mb-2 text-4xl font-bold text-[${color.black}]`}
                >
                  Adiestramiento canino <br /> en Medellin
                </h2>
                <span className={poppins.className}>
                  Te ayudamos a mejorar el vinculo con tu perro, mejorar
                  conductas no deseadas <br /> y
                  <b> tener un perro equilibrado</b>
                </span>
              </div>
              <RoundedButton
                text="Quiero una asesoria"
                bgColor="[#6A9C89]"
                color="white"
                className="hover:bg-[#C1D8C3] transition-all"
                onClick={() => {
                  window.open(
                    "https://wa.me/+573027603654",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              />
            </div>

            <div className="relative">
              <div className="absolute w-full h-full bg-[#6A9C89] top-0 rounded-full"></div>
              <Image
                className="relative"
                src={"/doberman.png"}
                alt="doberman"
                width={400}
                height={400}
              />
            </div>
          </section>

          <section
            id="guarderia"
            className="flex p-4 flex-col w-full md:flex-row items-center gap-10 justify-center"
          >
            <img
              className="w-full h-full max-w-[400px] object-cover rounded-full"
              src={"/manada.jpg"}
              alt="belga"
              width={400}
              height={400}
            />
            <div>
              <div className="flex flex-col mb-2">
                <h2
                  className={`${poppins.className} mb-2 text-4xl font-bold text-[${color.black}]`}
                >
                  Guarderia canina <br /> en Medellin
                </h2>
                <span className={poppins.className}>
                  Servicio de hotel y guarderia canina, cuidamos a tu peludo{" "}
                  <br />
                  <b> como en casa</b>
                </span>
              </div>

              <RoundedButton
                text="Quiero información"
                bgColor="[#6A9C89]"
                color="white"
                className="hover:bg-[#C1D8C3] transition-all"
                onClick={() => {
                  window.open(
                    "https://wa.me/+573027603654",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              />
            </div>
          </section>


          <Services />
          <section
            className="flex p-4 flex-col w-full md:flex-row items-center gap-10 justify-center"
          >
            <ImageList variant="masonry" cols={3} gap={8}>
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </section>
        </div>
      </div>
    </main>
  );
}
