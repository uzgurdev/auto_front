import { TypeCard } from "components";
import React from "react";

const PartTypes = () => {
  return (
    <div className="w-full my-[100px] text-center font-[400] text-[32px]">
      Eng sara avtomobil ehtiyot qisimlari turlari
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

export default PartTypes;
