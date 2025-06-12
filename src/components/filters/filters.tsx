import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Icon } from "components";
import Category from "./category";
import Price from "./price";
import Position from "./position";
import { isEmpty } from "lodash";
import { HomeApi } from "modules";
import { Store } from "store";
import { UIActions } from "store/slices";
import { RootState } from "store/store";

// const data: any[] = [{ name: "Porch" }, { name: "Mercedes" }];

const Filters = () => {
  const navigate = useNavigate();
  const { languages } = useSelector((state: RootState) => state.ui);

  const [{ data, values }, setState] = useState({
    data: {
      producer: [] as string[],
      brands: [] as string[],
      models: [] as string[],
    },
    values: {
      producer: "",
      transport_brand: "",
      transport_model: "",
    },
  });

  useEffect(() => {
    const fetchProducers = async () => {
      if (isEmpty(data.producer)) {
        try {
          console.log("Fetching producers...");
          const response = await HomeApi.Api.FilterProducers();
          console.log("Producers response:", response.data);
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              producer: response.data.data,
            },
          }));
        } catch (error) {
          console.error("Error fetching producers:", error);
        }
      }
    };

    fetchProducers();
  }, [data.producer]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (values.producer && isEmpty(data.brands)) {
        try {
          console.log("Fetching brands for producer:", values.producer);
          const response = await HomeApi.Api.FilterBrands(values.producer);
          console.log("Brands response:", response.data);
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              brands: response.data.data,
            },
          }));
        } catch (error) {
          console.error("Error fetching brands:", error);
        }
      }
    };

    if (values.producer) {
      fetchBrands();
    }
  }, [values.producer, data.brands]);

  useEffect(() => {
    const fetchModels = async () => {
      if (values.producer && values.transport_brand && isEmpty(data.models)) {
        try {
          const response = await HomeApi.Api.FilterModels(
            values.producer,
            values.transport_brand
          );
          setState((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              models: response.data.data,
            },
          }));
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      }
    };

    if (values.producer && values.transport_brand) {
      fetchModels();
    }
  }, [values.producer, values.transport_brand, data.models]);

  const performSearch = async (searchValues = values) => {
    if (
      searchValues.producer &&
      searchValues.transport_brand &&
      searchValues.transport_model
    ) {
      try {
        const { data } = await HomeApi.Api.FilterSearch(
          "producer=" +
            searchValues.producer +
            "&brand=" +
            searchValues.transport_brand +
            "&model=" +
            searchValues.transport_model
        );

        const filters = `producer=${searchValues.producer}&brand=${searchValues.transport_brand}&model=${searchValues.transport_model}`;

        Store.dispatch(
          UIActions.setSearchData({
            results: data.data,
            pagination: data.pagination,
            filters,
          })
        );

        // Navigate with URL parameters so products page can use them
        const searchParams = new URLSearchParams({
          producer: searchValues.producer,
          carBrand: searchValues.transport_brand,
          carModel: searchValues.transport_model,
        });
        navigate(`/${languages}/products?${searchParams.toString()}`);
      } catch (error) {
        console.error("Error during auto-search:", error);
      }
    }
  };

  const handleClick = (name: string, value: string) => {
    // Map display names to state keys
    const stateKeyMap: { [key: string]: string } = {
      Producers: "producer",
      Brands: "transport_brand",
      Models: "transport_model",
    };

    const stateKey = stateKeyMap[name] || name;

    if (stateKey === "producer") {
      // Clear dependent dropdowns when producer changes
      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [stateKey]: value,
          transport_brand: "", // Clear brand when producer changes
          transport_model: "", // Clear model when producer changes
        },
        data: {
          ...prev.data,
          brands: [], // Clear brands data
          models: [], // Clear models data
        },
      }));
    } else if (stateKey === "transport_brand") {
      // Clear dependent dropdown when brand changes
      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [stateKey]: value,
          transport_model: "", // Clear model when brand changes
        },
        data: {
          ...prev.data,
          models: [], // Clear models data
        },
      }));
    } else {
      const newValues = { ...values, [stateKey]: value };
      setState((prev) => ({
        ...prev,
        values: newValues,
      }));

      // Call performSearch with the new values since setState is async
      performSearch(newValues);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border-medium w-[295px] mb-[50px]">
      <div className="header w-full flex items-center justify-between py-5 px-5 border-b border-border-medium">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>

        <Icon.Icon
          icon="icon-products-filters"
          size="sm"
          color="var(--color-text-muted)"
          radiusSize={0}
        />
      </div>{" "}
      <div className="category py-7 px-5 grid gap-4 mt-0">
        <Category
          {...{ name: "Producers", data: data.producer, onClick: handleClick }}
        />
        {values.producer && (
          <Category
            {...{ name: "Brands", data: data.brands, onClick: handleClick }}
          />
        )}
        {values.producer && values.transport_brand && (
          <Category
            {...{ name: "Models", data: data.models, onClick: handleClick }}
          />
        )}
      </div>{" "}
      <Price />
      {/* <Colors /> */}
      <Position />
    </div>
  );
};

export default Filters;
