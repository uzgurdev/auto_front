import { useRef, useState } from "react";
import { Icon } from "components";

const Colors = () => {
  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const colors = useRef([
    { code: "#8434E1", name: "purple" },
    { code: "#252525", name: "black" },
    { code: "#f32828", name: "red" },
    { code: "#F16F2B", name: "orange" },
    { code: "#345EFF", name: "navy" },
    { code: "#ffffff", name: "white" },
    { code: "#D67E3B", name: "broom" },
    { code: "#48BC4E", name: "green" },
    { code: "#FDC761", name: "yellow" },
    { code: "#E4E5E8", name: "grey" },
    { code: "#E08D9D", name: "pink" },
    { code: "#3FDEFF", name: "blue" },
  ]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setRotation((prev) => (prev === 0 ? 180 : 0));
  };

  return (
    <div className="w-full">
      <div
        className={`header border-${
          isOpen ? "y" : "t"
        } border-border-medium w-full p-5 flex items-center justify-between cursor-pointer`}
        onClick={handleClick}
      >
        <p className="font-Poppins font-medium text-lg">Rang</p>

        <Icon.Icon
          icon="icon-down"
          size="xs"
          color="var(--color-text-secondary)"
          radiusSize={0}
          iconSize="14px"
          rotate={rotation}
        />
      </div>

      {isOpen && (
        <div className="body w-full py-10 px-8">
          <div className="colors grid grid-cols-4 gap-[18px]">
            {colors.current.map((color) => (
              <div className="color flex flex-col items-center max-w-max">
                <span
                  className={`code bg-[${color.code}] min-w-9 h-9 rounded-xl`}
                ></span>
                <p className="mt-[18px] text-sm font-semibold font-Poppins text-text-muted">
                  {color.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Colors;
