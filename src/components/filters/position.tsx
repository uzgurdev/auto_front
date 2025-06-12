import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Icon } from "components";
import { useTranslation } from "lang";
import { RootState } from "store/store";
import { HomeApi } from "modules";
import { Store } from "store";
import { UIActions } from "store/slices";

const Position = () => {
  const navigate = useNavigate();
  const { languages, searchData } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);
  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setRotation((prev) => (prev === 0 ? 180 : 0));
  };

  // Function to convert position to Russian lowercase with LH/RH notation
  const convertPositionToRussian = (position: string): string => {
    const positionMap: { [key: string]: string } = {
      front: "передняя",
      rear: "задняя",
      front_left: "передняя LH",
      front_right: "передняя RH",
      rear_left: "задняя LH",
      rear_right: "задняя RH",
    };

    return positionMap[position] || position;
  };

  const handlePosition = async (position: string) => {
    setSelectedPosition(position);

    try {
      // Convert position to Russian format with LH/RH notation
      const russianPosition = convertPositionToRussian(position);
      console.log(
        "Selected position:",
        position,
        "-> Russian format:",
        russianPosition
      );

      // Build query string with existing filters, replacing any existing position
      const currentFilters = searchData.filters || "";
      const params = new URLSearchParams(currentFilters);

      // Remove any existing position filters first
      params.delete("position");

      // Add the new position filter
      params.set("position", russianPosition);

      const fullQuery = params.toString();

      console.log("Performing position search with query:", fullQuery);
      const { data } = await HomeApi.Api.FilterSearch(fullQuery);

      Store.dispatch(
        UIActions.setSearchData({
          results: data.data,
          pagination: data.pagination,
          filters: fullQuery,
        })
      );

      // Also update searchProducts to ensure products page displays immediately
      Store.dispatch(
        UIActions.setSearchProducts({
          results: data.data,
          pagination: data.pagination,
        })
      );

      // Navigate to products page with the new filters
      const searchParams = new URLSearchParams(fullQuery);
      navigate(`/${languages}/products?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error during position filter search:", error);
    }
  };

  const handleClearPosition = async () => {
    setSelectedPosition("");

    try {
      // Remove position filter from existing filters
      const currentFilters = searchData.filters || "";
      if (currentFilters) {
        const params = new URLSearchParams(currentFilters);
        params.delete("position");
        const newQuery = params.toString();

        console.log("Clearing position filter, new query:", newQuery);
        if (newQuery) {
          // If there are other filters, search with them
          const { data } = await HomeApi.Api.FilterSearch(newQuery);
          Store.dispatch(
            UIActions.setSearchData({
              results: data.data,
              pagination: data.pagination,
              filters: newQuery,
            })
          );

          // Also update searchProducts
          Store.dispatch(
            UIActions.setSearchProducts({
              results: data.data,
              pagination: data.pagination,
            })
          );

          const searchParams = new URLSearchParams(newQuery);
          navigate(`/${languages}/products?${searchParams.toString()}`);
        } else {
          // If no filters left, clear both stores and navigate to clean products page
          Store.dispatch(
            UIActions.setSearchData({
              results: [],
              pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: 0,
                itemsPerPage: 20,
                hasNextPage: false,
                hasPrevPage: false,
              },
              filters: "",
            })
          );
          Store.dispatch(
            UIActions.setSearchProducts({
              results: [],
              pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: 0,
                itemsPerPage: 20,
                hasNextPage: false,
                hasPrevPage: false,
              },
            })
          );
          navigate(`/${languages}/products`);
        }
      }
    } catch (error) {
      console.error("Error clearing position filter:", error);
    }
  };

  return (
    <div>
      {" "}
      <div
        className={`header border-${
          isOpen ? "y" : "t"
        } border-border-medium w-full p-5 flex items-center justify-between cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <p className="font-Poppins font-medium text-lg">
            {t("filters.position")}
          </p>
          {selectedPosition && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-primary bg-bg-secondary px-2 py-1 rounded">
                {t(`filters.positions.${selectedPosition}`)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearPosition();
                }}
                className="text-text-muted hover:text-primary text-xs ml-1"
                title="Clear position filter"
              >
                ✕
              </button>
            </div>
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
        <div className="body w-full py-10 px-8 grid place-items-center">
          {" "}
          <div
            className={`border rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer ${
              selectedPosition === "front"
                ? "border-primary bg-primary text-white"
                : "border-border-medium"
            }`}
            onClick={() => handlePosition("front")}
          >
            {t("filters.positions.front")}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="left grid gap-2">
              <div
                className={`border rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer ${
                  selectedPosition === "front_right"
                    ? "border-primary bg-primary text-white"
                    : "border-border-medium"
                }`}
                onClick={() => handlePosition("front_right")}
              >
                {t("filters.positions.front_right")}
              </div>
              <div
                className={`border rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer ${
                  selectedPosition === "rear_right"
                    ? "border-primary bg-primary text-white"
                    : "border-border-medium"
                }`}
                onClick={() => handlePosition("rear_right")}
              >
                {t("filters.positions.rear_right")}
              </div>
            </div>
            <div className="right grid gap-2">
              <div
                className={`border rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer ${
                  selectedPosition === "front_left"
                    ? "border-primary bg-primary text-white"
                    : "border-border-medium"
                }`}
                onClick={() => handlePosition("front_left")}
              >
                {t("filters.positions.front_left")}{" "}
              </div>
              <div
                className={`border rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center cursor-pointer ${
                  selectedPosition === "rear_left"
                    ? "border-primary bg-primary text-white"
                    : "border-border-medium"
                }`}
                onClick={() => handlePosition("rear_left")}
              >
                {t("filters.positions.rear_left")}
              </div>
            </div>
          </div>{" "}
          <div
            className={`border rounded-lg w-24 h-8 outline-none text-center flex items-center justify-center mt-2 cursor-pointer ${
              selectedPosition === "rear"
                ? "border-primary bg-primary text-white"
                : "border-border-medium"
            }`}
            onClick={() => handlePosition("rear")}
          >
            {t("filters.positions.rear")}
          </div>
          {selectedPosition && (
            <button
              onClick={handleClearPosition}
              className="mt-4 text-xs text-text-muted hover:text-primary underline"
            >
              {t("filters.reset")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Position;
