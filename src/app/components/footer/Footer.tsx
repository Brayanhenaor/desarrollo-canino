import { poppins } from "@/app/utils/fonts/fonts";
import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#FFDAB9] rounded-tr-full mt-10 w-screen px-2 py-8">
      <Image src="/logo.png" width={250} height={100} alt="logo" />
        <span className={poppins.className}>Sitio web desarrollador por <b>Brayan Henao</b></span>
    </div>
  );
};
