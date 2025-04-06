import { Icon } from "components";
import { useState } from "react";
import Category from "./category";
import Price from "./price";
import Colors from "./colors";
import Position from "./position";

interface FiltersProps {}

const data: any[] = [{ name: "Porch" }, { name: "Mercedes" }];

const Filters: React.FC<FiltersProps> = ({}) => {
  return (
    <div className="bg-white rounded-lg border border-border-medium w-[295px] mb-[50px]">
      <div className="header w-full flex items-center justify-between py-5 px-5 border-b border-border-medium">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>

        <Icon.Icon
          icon="icon-products-filters"
          size="sm"
          color="var(--color-text-muted)"
          radiusSize={0}
        />
      </div>

      <div className="category py-7 px-5 grid gap-4 mt-0">
        <Category {...{ data }} />
        <Category {...{ data }} />
        <Category {...{ data }} />
      </div>

      <Price />

      <Colors />

      <Position />
    </div>
  );
};

export default Filters;
