import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "components";

const Price = () => {
  const [rotation, setRotation] = useState(0);
  const [priceRange, setPriceRange] = useState([10, 800]);
  const [isDragging, setIsDragging] = useState<null | "min" | "max">(null);
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const min = 0;
  const max = 1000;
  const step = 10;
  const range = max - min;

  const getPercentage = useCallback(
    (value: number) => {
      return ((value - min) / range) * 100;
    },
    [range]
  );

  const getValueFromPosition = useCallback(
    (percentage: number) => {
      const rawValue = (percentage / 100) * range + min;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(Math.max(steppedValue, min), max);
    },
    [min, max, range, step]
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isDragging) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = clientX - rect.left;
      const percentage = Math.min(
        Math.max((position / rect.width) * 100, 0),
        100
      );
      const newValue = getValueFromPosition(percentage);

      setPriceRange((prev) => {
        if (isDragging === "min") {
          if (newValue < prev[1] - step) {
            return [newValue, prev[1]];
          }
        } else if (isDragging === "max") {
          if (newValue > prev[0] + step) {
            return [prev[0], newValue];
          }
        }
        return prev;
      });
    },
    [isDragging, getValueFromPosition, step]
  );

  useEffect(() => {
    const handleMouseMove = (e: any) => handleMove(e.clientX);
    const handleMouseUp = () => setIsDragging(null);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  const formatPrice = (value: number) => `$${value}`;

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
        <p className="font-Poppins font-medium text-lg">Narx</p>

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
        <div className="slider py-10 px-8">
          <div className="w-full">
            <div
              ref={sliderRef}
              className="relative w-full bg-gray-200 rounded-full cursor-pointer"
              style={{ height: "6px" }}
              onClick={(e) => {
                if (isDragging || !sliderRef.current) return;
                const rect = sliderRef.current.getBoundingClientRect();
                const position = e.clientX - rect.left;
                const percentage = (position / rect.width) * 100;
                const newValue = getValueFromPosition(percentage);

                // Determine which thumb to move based on distance
                const minDistance = Math.abs(
                  getPercentage(priceRange[0]) - percentage
                );
                const maxDistance = Math.abs(
                  getPercentage(priceRange[1]) - percentage
                );

                setPriceRange((prev) =>
                  minDistance <= maxDistance
                    ? [newValue, prev[1]]
                    : [prev[0], newValue]
                );
              }}
            >
              <div
                className="line bg-primary absolute top-0 h-full rounded-full"
                style={{
                  left: `${getPercentage(priceRange[0])}%`,
                  width: `${
                    getPercentage(priceRange[1]) - getPercentage(priceRange[0])
                  }%`,
                }}
              ></div>

              {/* Min Thumb */}
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md cursor-grab active:cursor-grabbing"
                style={{ left: `${getPercentage(priceRange[0])}%` }}
                onMouseDown={() => setIsDragging("min")}
              />

              {/* Max Thumb */}
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md cursor-grab active:cursor-grabbing"
                style={{ left: `${getPercentage(priceRange[1])}%` }}
                onMouseDown={() => setIsDragging("max")}
              />
            </div>
          </div>

          <div className="price mt-5">
            <input
              type="text"
              name="min"
              id="min"
              readOnly
              value={formatPrice(priceRange[1])}
              className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center px-[10px] inline-block float-right"
            />

            <input
              type="text"
              name="max"
              id="max"
              readOnly
              value={formatPrice(priceRange[0])}
              className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center px-[10px] inline-block"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;
