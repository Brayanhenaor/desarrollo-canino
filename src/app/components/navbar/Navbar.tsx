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
  const [hash, setHash] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setHash(window.location.hash);
  }, [hash]);

  const handleOpenMenu = () => {
    setShowMenu(prev => !prev)
  };

  return (
    <div className={`${anton.className} w-screen text-[#8B4513] bg-[#FFF5E4] flex items-center justify-around p-5`}>
      <Image src="/logo-dark.png" width={250} height={100} alt="logo" />
      <ul className="hidden sm:flex gap-4">
        {routes.map((route) => (
          <li
            key={route.route}
            onClick={() => {
              router.push(route.route);
              setHash(window.location.hash);
            }}
            className={`cursor-pointer text-xl text-${color.black
              } ${pathname === route.route ? "font-bold text-black" : ""
              }`}
          >
            {route.name.toUpperCase()}
          </li>
        ))}
      </ul>
      <AiOutlineMenu size={30} onClick={handleOpenMenu} className="sm:hidden" />

      {showMenu && (
        <div className="w-screen top-0 z-30 h-screen bg-black/80 fixed">
          <div className="w-full h-full flex gap-3 flex-col justify-center items-center animate__animated animate__animated animate__animated animate__fadeIn">
            {routes.map((route) => (
              <h3 key={route.route} className="cursor-pointer text-white text-2xl">
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
  );
};
