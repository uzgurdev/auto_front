import { useSelector } from "react-redux";
import { useTranslation } from "../../lang";
import { RootState } from "../../store/store";
import RIGHT_IMAGE from "../../assets/images/banner_image.png";
import { useNavigate } from "react-router";

interface BannerProps {
  idx?: number;
  onHandle?(): void;
}

const Banner = ({ idx }: BannerProps) => {
  const navigate = useNavigate();
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="w-full md:h-[550px] bg-bg-secondary rounded-[10px] flex md:flex-row items-center justify-around mb-[100px] px-[50px] flex-col h-[587px]">
      <div className="context md:w-1/2 h-full font-Poppins font-[500] text-border-dark text-sm md:pt-[140px] w-full pt-[20px] order-2">
        <p className="text-primary ">
          {t(`banner_${idx ?? 1}_sub_title` as any)}
        </p>
        <p className="md:text-4xl text-2xl pb-[10px] leading-normal">
          {t(`banner_${idx ?? 1}_title` as any)}
        </p>
        <button
          className="font-[400] bg-border-medium rounded-full md:px-6 py-[10px] px-[15px] sm:text-xs"
          onClick={() => navigate(`/${languages}/products`)}
        >
          {t("more")}
        </button>
      </div>
      <div className="image md:w-1/2 h-full grid place-items-center w-full order-1">
        <img
          loading="lazy"
          src={RIGHT_IMAGE}
          alt="brake pad"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
