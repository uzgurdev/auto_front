import { FC, memo, useEffect, useState } from "react";

import ENGINE_BLOCK_iCON from "assets/images/engine_block.png";
import GEAR_iCON from "assets/images/gear_icon.png";
interface TypeCardProps {
  id: string;
  image: string;
  name: string;
  count: number;
  onClick: () => void;
}

const IMG_URL = process.env.REACT_APP_IMAGE_URL;
const placeholderImages = [ENGINE_BLOCK_iCON, GEAR_iCON];

const TypeCard: FC<Partial<TypeCardProps>> = ({
  id,
  image,
  name,
  onClick,
  count,
}) => {
  const [{ imageUrl }, setState] = useState({
    imageUrl: "",
  });

  useEffect(() => {
    const getImage = async () => {
      if (imageUrl) return;

      if (!image?.includes("https")) {
        const imageData = await fetch(
          `${IMG_URL}${image?.replace(".jpg", "")}`,
          {
            method: "GET",
          }
        );

        const blob = await imageData.blob();
        const url = URL.createObjectURL(blob);
        setState((prev) => ({ ...prev, imageUrl: url }));
      }
    };
    getImage();
  }, [image, imageUrl]);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className="text-base font-[400] min-w-[150px] md:min-w-[220px] h-[250px] border rounded-[20px] grid place-items-center px-5 cursor-pointer sm:text-xs"
      onClick={handleClick}
    >
      <img
        loading="lazy"
        src={`${
          !image.includes("picsum")
            ? image
            : placeholderImages[
                Math.floor(Math.random() * placeholderImages.length)
              ]
        }`}
        alt={name}
        className="h-[150px] w-auto"
      />
      <div className="bg-bg-tertiary w-full h-[2px] relative grid place-items-center">
        <span className="bg-primary w-[10px] h-[10px] absolute bottom-[-14px] rounded-full p-2 border-8 border-bg-primary"></span>
      </div>
      {name}
    </div>
  );
};

export default memo(TypeCard);
