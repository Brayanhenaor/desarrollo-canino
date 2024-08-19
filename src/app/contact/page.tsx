import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { IconButton } from "@mui/material";
import { anton } from "../utils/fonts/fonts";

const ContactPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 items-center text-[#8B4513]">

        <div className="flex flex-col items-center">
          <h2 className={`${anton.className} text-3xl`}>Contáctanos</h2>
          <p>Te orientamos y resolvemos todas tus dudas</p>
        </div>

        <div className="flex flex-col items-center">
          <IconButton>
            <InstagramIcon className="text-[70px] text-[#8B4513]" />
          </IconButton>

          <span className={`${anton.className} text-xl`}>@desarrollo_canino</span>
        </div>

        <div className="flex flex-col items-center text-[#0D7C66]">
          <IconButton>
            <WhatsAppIcon className="text-[70px] text-[#0D7C66]" />
          </IconButton>

          <span className={`${anton.className} text-xl`}>+57 302 7603654</span>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;