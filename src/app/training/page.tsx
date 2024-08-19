import React from "react";
import { anton } from "../utils/fonts/fonts";
const TrainingPage = () => {
    return (
        <div className="w-screen">

            <div className="relative">
                <img src="training.webp" className="w-full h-[600px] object-cover" />
                <div className="bg-black/80 absolute w-full h-full top-0" />
                <h3 className={`m-5 absolute bottom-0 text-white text-3xl ${anton.className}`}>
                    ADIESTRAMIENTO<br />
                    <span className="text-[#FFF5E4] text-4xl">PARA SUS NECESIDADES</span>
                </h3>
            </div>

            <section className="container mx-auto">
                INFORMACION
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, voluptatem praesentium rerum sint quam perferendis ad! Aut sint, illum neque unde, dolor labore, impedit veniam repudiandae alias veritatis quae dolorum?
            </section>
        </div>
    );
};

export default TrainingPage;