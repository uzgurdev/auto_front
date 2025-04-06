import { TypeCard } from "components";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const PopularProductTypes = () => {
  const { recs } = useSelector((state: RootState) => state.ui);
  return (
    <div className="w-full my-[100px] text-center font-[400] text-[32px]">
      Foydalanuvchilar orasida eng mashhur <br /> avtomobil aksesuarlari
      <div className="flex flex-wrap items-center justify-between gap-8 mt-[50px]">
        {recs.mostOrdered?.map((item) => (
          <TypeCard key={item._id} {...{ ...item }} />
        ))}
      </div>
    </div>
  );
};

export default PopularProductTypes;
