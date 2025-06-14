import { TypeCard } from "components";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "store/store";

const PopularProductTypes = () => {
  const navigate = useNavigate();
  const { recs, languages } = useSelector((state: RootState) => state.ui);

  const handleClick = (name: string) => {
    navigate(`/${languages}/products?q=${name}`);
  };
  return (
    <div className="w-full my-[100px] text-center font-[400] text-[32px]">
      Foydalanuvchilar orasida eng mashhur <br /> avtomobil aksesuarlari
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-[50px]">
        {recs.mostOrdered?.map((item) => (
          <TypeCard
            key={item._id}
            {...{ ...item, onClick: () => handleClick(item.name) }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PopularProductTypes);
