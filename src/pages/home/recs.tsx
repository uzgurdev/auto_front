import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { Carousel } from "components";

import DEMO_PRODUCTS from "demo";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { HomeApi } from "modules";
import { Store } from "store";
import { UIActions } from "store/slices";

const RecommendationSec = () => {
  const navigate = useNavigate();

  const [{ currentCategory, recs }, setState] = useState({
    currentCategory: "all",
    recs: [] as any,
  });
  const { languages } = useSelector((state: RootState) => state.ui);

  const categories = useRef(["all", "wheels", "brakes", "lights"]);

  useEffect(() => {
    const recs = async () => {
      const { data } = await HomeApi.Api.Recs();
      const products = Object.values(data.data.mostOrderedByCategory)
        .map((item) => item.products)
        .flat();
        
      Store.dispatch(UIActions.setRecs(data.data));
      setState((prev) => ({ ...prev, recs: products }));

      categories.current = [
        "all",
        ...Object.values(data.data.mostOrderedByCategory).map(
          (item) => item.category
        ),
      ];
    };
    recs();
  }, []);

  const handleViewAll = () => {
    navigate(`/${languages}/products`);
  };

  return (
    <div className="popular flex flex-col gap-10 mt-[100px]">
      <div className="header flex items-center">
        <h2 className="font-bold text-2xl text-border-dark">
          Ommabop mahsulotlar
        </h2>

        <span className="divider w-[2px] h-[30px] bg-border-dark opacity-50 mx-[30px]"></span>

        <div className="btns flex items-center justify-evenly gap-[10px]">
          {categories.current.map((item, idx) => (
            <button
              key={idx}
              className={`text-sm font-[400] ${
                currentCategory === item
                  ? "py-[6px] px-6 text-primary bg-bg-secondary rounded-full"
                  : "text-text-extra-light"
              }`}
              onClick={() =>
                setState((prev) => ({ ...prev, currentCategory: item }))
              }
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <Carousel
        products={recs}
        onViewAll={handleViewAll}
        currentCategory={currentCategory} // Pass currentCategory to Carousel
      />
    </div>
  );
};

export default RecommendationSec;
