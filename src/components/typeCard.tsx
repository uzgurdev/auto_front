import React from "react";
import BRAKE_PADS from "../assets/images/brake_pad.png";

interface TypeCardProps {
  id: string;
  imgUrl: string;
  name: string;
}

const TypeCard = () => {
  return (
    <div className="text-base font-[400] min-w-[220px] h-[250px] border rounded-[20px] grid place-items-center px-5 cursor-pointer">
      <img loading="lazy" src={BRAKE_PADS} alt="brake pads" />
      <div className="bg-bg-tertiary w-full h-[2px] relative grid place-items-center">
        <span className="bg-primary w-[10px] h-[10px] absolute bottom-[-14px] rounded-full p-2 border-8 border-bg-primary"></span>
      </div>
      Tormoz prokladkalari
    </div>
  );
};

export default TypeCard;
