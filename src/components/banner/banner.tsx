import { useSelector } from "react-redux";
import { useTranslation } from "../../lang";
import { RootState } from "../../store/store";
import RIGHT_IMAGE from "../../assets/images/banner_image.png";

interface BannerProps {
  idx?: number;
  onHandle?(): void;
}

const Banner = ({ idx }: BannerProps) => {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="w-full h-[550px] bg-bg-secondary rounded-[10px] flex items-center justify-around mb-[100px] px-[50px]">
      <div className="context w-1/2 h-full font-Poppins font-[500] text-border-dark text-sm pt-[140px]">
        <p className="text-primary">
          {t(`banner_${idx ?? 1}_sub_title` as any)}
        </p>
        <p className="text-4xl pb-[10px] leading-normal">
          {t(`banner_${idx ?? 1}_title` as any)}
        </p>
        <button className="font-[400] bg-border-medium rounded-full px-6 py-[10px]">
          {t("more")}
        </button>
      </div>
      <div className="image w-1/2 h-full grid place-items-center">
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
