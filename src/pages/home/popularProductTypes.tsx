import React from "react";
import { TypeCard } from "components";

const PopularProductTypes = () => {
  return (
    <div className="w-full my-[100px] text-center font-[400] text-[32px]">
      Foydalanuvchilar orasida eng mashhur <br /> avtomobil aksesuarlari
      <div className="flex flex-wrap items-center justify-between gap-8 mt-[50px]">
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
        <TypeCard />
      </div>
    </div>
  );
};

export default PopularProductTypes;
