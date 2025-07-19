import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Icon } from "components";
import { HomeApi } from "modules";
import { Store } from "store";
import { UIActions } from "store/slices";
import { RootState } from "store/store";
import { useTranslation } from "lang";

const Price = () => {
  const navigate = useNavigate();
  const { searchData, languages, priceRange } = useSelector(
    (state: RootState) => state.ui
  );
  const { t } = useTranslation(languages);
  const filters = searchData.filters;
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState<null | "min" | "max">(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Use Redux state for price range
  const min = priceRange.min;
  const max = priceRange.max;
  const currentPriceRange = priceRange.current;
  const step = 10;
  const range = max - min;
  // Extract current filter values from the filters string
  const currentFilters = useCallback(() => {
    if (!filters) return { producer: "", brand: "", model: "" };

    const params = new URLSearchParams(filters);
    return {
      producer: params.get("producer") || "",
      brand: params.get("brand") || "",
      model: params.get("model") || "",
    };
  }, [filters]); // Reset price range when main filters change

  useEffect(() => {
    const fetchPriceRange = async () => {
      setIsUpdating(true);
      const { producer, brand, model } = currentFilters();

      // Reset price range when filters change - just reset to default
      if (producer || brand || model) {
        // Reset to a consistent range when any filters are applied
        Store.dispatch(UIActions.setPriceRange({ min: 10, max: 500 }));
      } else {
        // No filters - reset to default wide range
        Store.dispatch(UIActions.resetPriceRange());
      }

      setTimeout(() => setIsUpdating(false), 300);
    };

    fetchPriceRange();
  }, [currentFilters]);

  const getPercentage = useCallback(
    (value: number) => {
      return ((value - min) / range) * 100;
    },
    [range, min]
  );

  const getValueFromPosition = useCallback(
    (percentage: number) => {
      const rawValue = (percentage / 100) * range + min;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(Math.max(steppedValue, min), max);
    },
    [min, max, range, step]
  );

  const performPriceSearch = useCallback(
    async (newPriceRange: number[]) => {
      try {
        const priceQuery = `minPrice=${newPriceRange[0]}&maxPrice=${newPriceRange[1]}`;
        const fullQuery = filters ? `${priceQuery}&${filters}` : priceQuery;

        const { data } = await HomeApi.Api.FilterSearch(fullQuery);

        Store.dispatch(
          UIActions.setSearchData({
            results: data.data,
            pagination: data.pagination,
            filters: fullQuery,
          })
        );

        // Navigate to products page with the new filters
        const searchParams = new URLSearchParams(fullQuery);
        navigate(`/${languages}/products?${searchParams.toString()}`);
      } catch (error) {
        console.error("Error during price filter search:", error);
      }
    },
    [filters, navigate, languages]
  );

  const handleMove = useCallback(
    async (clientX: number) => {
      if (!sliderRef.current || !isDragging) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const position = clientX - rect.left;
      const percentage = Math.min(
        Math.max((position / rect.width) * 100, 0),
        100
      );
      const newValue = getValueFromPosition(percentage);

      let newPriceRange = currentPriceRange;

      if (isDragging === "min") {
        if (newValue < currentPriceRange[1] - step) {
          newPriceRange = [newValue, currentPriceRange[1]];
        }
      } else if (isDragging === "max") {
        if (newValue > currentPriceRange[0] + step) {
          newPriceRange = [currentPriceRange[0], newValue];
        }
      }

      // Update Redux store immediately for smooth UI
      if (newPriceRange !== currentPriceRange) {
        Store.dispatch(
          UIActions.setPriceRangeCurrent(newPriceRange as [number, number])
        );
      }
    },
    [isDragging, getValueFromPosition, step, currentPriceRange]
  );

  useEffect(() => {
    const handleMouseMove = (e: any) => handleMove(e.clientX);
    const handleMouseUp = () => {
      setIsDragging(null);
      // Perform search when user stops dragging
      if (isDragging) {
        performPriceSearch(currentPriceRange);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMove, currentPriceRange, performPriceSearch]);

  const formatPrice = (value: number) => `$${value}`;

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setRotation((prev) => (prev === 0 ? 180 : 0));
  };

  return (
    <div className="w-full">
      {" "}
      <div
        className={`header border-${
          isOpen ? "y" : "t"
        } border-border-medium w-full p-5 flex items-center justify-between cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <p className="font-Poppins font-medium text-lg">Narx</p>
          {isUpdating && (
            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

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
              onClick={async (e) => {
                if (isDragging || !sliderRef.current) return;
                const rect = sliderRef.current.getBoundingClientRect();
                const position = e.clientX - rect.left;
                const percentage = (position / rect.width) * 100;
                const newValue = getValueFromPosition(percentage);

                // Determine which thumb to move based on distance
                const minDistance = Math.abs(
                  getPercentage(currentPriceRange[0]) - percentage
                );
                const maxDistance = Math.abs(
                  getPercentage(currentPriceRange[1]) - percentage
                );

                const newPriceRange =
                  minDistance <= maxDistance
                    ? [newValue, currentPriceRange[1]]
                    : [currentPriceRange[0], newValue]; // Update Redux store
                Store.dispatch(
                  UIActions.setPriceRangeCurrent(
                    newPriceRange as [number, number]
                  )
                );

                // Perform search with new price range
                await performPriceSearch(newPriceRange);
              }}
            >
              {" "}
              <div
                className="line bg-primary absolute top-0 h-full rounded-full"
                style={{
                  left: `${getPercentage(currentPriceRange[0])}%`,
                  width: `${
                    getPercentage(currentPriceRange[1]) -
                    getPercentage(currentPriceRange[0])
                  }%`,
                }}
              ></div>
              {/* Min Thumb */}
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md cursor-grab active:cursor-grabbing"
                style={{ left: `${getPercentage(currentPriceRange[0])}%` }}
                onMouseDown={() => setIsDragging("min")}
              />
              {/* Max Thumb */}
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md cursor-grab active:cursor-grabbing"
                style={{ left: `${getPercentage(currentPriceRange[1])}%` }}
                onMouseDown={() => setIsDragging("max")}
              />
            </div>
          </div>{" "}
          <div className="price mt-5">
            <input
              type="text"
              name="min"
              id="min"
              readOnly
              value={formatPrice(currentPriceRange[0])}
              className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center px-[10px] inline-block"
            />

            <input
              type="text"
              name="max"
              id="max"
              readOnly
              value={formatPrice(currentPriceRange[1])}
              className="border border-border-medium rounded-lg w-24 h-8 outline-none text-center px-[10px] inline-block float-right"
            />
          </div>
          {/* Show current filter context */}
          {(() => {
            const { producer, brand, model } = currentFilters();
            if (producer || brand || model) {
              return (
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Price range for: {producer}
                  {brand ? ` / ${brand}` : ""}
                  {model ? ` / ${model}` : ""}
                </div>
              );
            }
            return null;
          })()}
        </div>
      )}
    </div>
  );
};

export default Price;
