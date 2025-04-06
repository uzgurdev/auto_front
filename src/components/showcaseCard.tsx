import { FC } from "react";

interface ShowcaseCardProps {
  imageUrl: string;
  title?: string;
  subTitle?: string;
  cta?: string;
}

const ShowcaseCard: FC<ShowcaseCardProps> = ({
  imageUrl,
  title,
  subTitle,
  cta,
}) => {
  return (
    <div
      className="w-[650px] h-[350px] flex flex-col items-start justify-center pl-[45px] rounded-[10px]"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }}
    >
      <h2 className="font-[500] text-[42px] text-text-orange">
        Michlen <br /> shinalari
      </h2>
      <p className="font-[400] text-xs text-bg-primary">Premium sifat</p>

      <button className="mt-5 px-[17px] py-[9px] bg-bg-primary text-text-secondary rounded-full">
        Xarid Qilish
      </button>
    </div>
  );
};

export default ShowcaseCard;
