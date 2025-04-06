import RIGHT_IMAGE from "../../assets/images/banner_image.png";

interface Banner {
  idx?: number;
  onHandle(): void;
}

const Banner = ({ idx }: { idx?: number }) => {
  return (
    <div className="w-full h-[550px] bg-bg-secondary rounded-[10px] flex items-center justify-around mb-[100px] px-[50px]">
      <div className="context w-1/2 h-full font-Poppins font-[500] text-border-dark text-sm pt-[140px]">
        <p className="text-primary">banner_{idx ?? 1}_sub_title</p>
        <p className="text-4xl pb-[10px] leading-normal">
          Zavod tomonidan ishlab chiqarilgan tormoz <br /> sistemalari
        </p>
        <button className="font-[400] bg-border-medium rounded-full px-6 py-[10px]">
          Batafsil
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
