import { useState } from "react";
import { Icon } from "components";

const Position = () => {
  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [positions, setPositions] = useState("");

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setRotation((prev) => (prev === 0 ? 180 : 0));
  };

  const handlePosition = (position: string) => {
    setPositions(position);
  };

  return (
    <div>
      <div
        className={`header border-${
          isOpen ? "y" : "t"
        } border-border-medium w-full p-5 flex items-center justify-between cursor-pointer`}
        onClick={handleClick}
      >
        <p className="font-Poppins font-medium text-lg">Joylashuvi</p>

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
        <div className="body w-full py-10 px-8 grid place-items-center">
          <div className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer" onClick={() => handlePosition("Oldi")}>
            Oldi
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="left grid gap-2">
              <div className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer" onClick={() => handlePosition("Oldi_o'ng")}>
                Oldi o'ng
              </div>
              <div className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer" onClick={() => {}}>
                Orqa o'ng
              </div>
            </div>
            <div className="right grid gap-2">
              <div className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer">
                Oldi chap
              </div>
              <div className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer">
                Orqa chap
              </div>
            </div>
          </div>

          <div className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center mt-2 cursor-pointer">
            Orqa
          </div>
        </div>
      )}
    </div>
  );
};

export default Position;
