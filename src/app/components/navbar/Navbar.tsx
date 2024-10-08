"use client";
import 'animate.css';
import { color } from "@/app/utils/colors/color";
import { anton, poppins } from "@/app/utils/fonts/fonts";
import { routes } from "@/app/utils/router/routes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleOpenMenu = () => {
    setShowMenu(prev => !prev)
  };

  return (
    <>
      <div className={`hover:scale-105 transition-all hidden sm:block bg-[#6A9C89] ${anton.className} mt-2 z-10 shadow-xl px-6 py-3 rounded-full fixed left-1/2 transform -translate-x-1/2`}>
        <ul className="flex gap-4">
          {routes.map((route) => (
            <li
              key={route.route}
              onClick={() => {
                router.push(route.route);
              }}
              className={`cursor-pointer text-xl text-[#FFF5E4] ${pathname === route.route ? "font-bold text-white" : ""
                }`}
            >
              {route.name.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${anton.className} w-screen text-[#8B4513] bg-[#FFF5E4] flex items-center sm:justify-start justify-around p-5`}>
        <Image src="/logo-dark.png" width={250} height={100} alt="logo" />


        <AiOutlineMenu size={30} onClick={handleOpenMenu} className="sm:hidden" />

        {showMenu && (
          <div className="w-screen top-0 z-30 h-screen bg-black/80 fixed">
            <div className="w-full h-full flex gap-3 flex-col justify-center items-center animate__animated animate__animated animate__animated animate__fadeIn">
              {routes.map((route) => (
                <h3
                  onClick={() => {
                    router.push(route.route);
                    handleOpenMenu()
                  }}
                  key={route.route}
                  className="cursor-pointer text-white text-2xl">
                  {route.name}
                </h3>
              ))}
              <AiOutlineCloseCircle
                size={50}
                color="white"
                onClick={handleOpenMenu}
                className="mt-3 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </>

  );
};
