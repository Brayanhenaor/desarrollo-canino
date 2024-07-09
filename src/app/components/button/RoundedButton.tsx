import { color } from "@/app/utils/colors/color";
import { poppins } from "@/app/utils/fonts/fonts";
import React from "react";

interface Props {
  text: string;
  color: string;
  bgColor: string;
  className: string;
  [x:string]: any;
}
export const RoundedButton = ({
  text,
  color,
  bgColor,
  className,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={`${poppins.className} bg-${bgColor} ${className} text-white font-medium py-2 px-4 rounded-full`}
    >
      {text}
    </button>
  );
};
