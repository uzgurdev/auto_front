import React, { FC } from "react";

import LIGHTS from "../../assets/images/lights.png";
import BRAKE_SYSTEM from "../../assets/images/brake_system.png";

interface IDiscountSectionProps {
  discount?: number;
  expDate?: string;
}

const DiscountSection: FC<IDiscountSectionProps> = ({ discount, expDate }) => {
  return (
    <div className="w-full mb-[100px] flex md:flex-row flex-col items-center justify-between">
      <img loading="lazy" src={LIGHTS} alt="lights" />
      <div className="context text-center">
        <p className="title font-[500] text-[28px] md:text-[36px]">
          <span className="text-primary">{!discount ? 50 : discount}%</span>{" "}
          chegirma <br /> ostida xarid qiling!
        </p>
        <p className="sub-title font-[400] text-xs md:text-sm">
          $100 dan ortiq xarid qiling va {!discount ? 50 : discount}% chegirma
          yuting !
        </p>
        <button className="w-[150px] h-[50px] mt-10 rounded-[10px] bg-primary text-bg-primary">
          Xarid Qilish
        </button>
      </div>
      <img loading="lazy" src={BRAKE_SYSTEM} alt="brake system" />
    </div>
  );
};

export default DiscountSection;
