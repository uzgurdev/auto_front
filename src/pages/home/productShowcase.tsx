import React from "react";
import { ShowcaseCard } from "components";

import SHOWCASE_WHEEL from "../../assets/images/wheel_showcase.png";
import SHOWCASE_BRAKE from "../../assets/images/brake_showcase.png";

const ProductShowcase = () => {
  return (
    <div className="w-full mb-[100px] flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-between">
      <ShowcaseCard imageUrl={SHOWCASE_WHEEL} />
      <ShowcaseCard imageUrl={SHOWCASE_BRAKE} />
    </div>
  );
};

export default ProductShowcase;
