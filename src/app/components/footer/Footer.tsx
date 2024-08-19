import { poppins } from "@/app/utils/fonts/fonts";
import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-col mt-10 justify-center items-center bg-[#8B4513] text-[#FFF5E4] rounded-tr-full w-screen px-2 py-8">
      <Image src="/logo.png" width={250} height={100} alt="logo" />
        <span className={poppins.className}>Sitio web desarrollador por <b>Brayan Henao</b></span>
    </div>
  );
};
