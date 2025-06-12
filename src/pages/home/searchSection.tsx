import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Store } from "store";
import { UIActions } from "store/slices";

import { HomeApi } from "modules";
import { Dropdown } from "components";

import SectionImage from "../../assets/images/section_2.png";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { isEmpty } from "lodash";

type filter = string[];

const SearchSection = () => {
  const navigate = useNavigate();
  const { languages } = useSelector((state: RootState) => state.ui);
  const [{ values, data }, setState] = useState({
    data: {
      producer: [] as filter,
      brands: [] as filter,
      models: [] as filter,
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

  const handleChange = (value: string, name: string) => {
    if (name === "producer") {
      // Clear dependent dropdowns when producer changes
      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value,
          transport_brand: "", // Clear brand when producer changes
          transport_model: "", // Clear model when producer changes
        },
        data: {
          ...prev.data,
          brands: [], // Clear brands data
          models: [], // Clear models data
        },
      }));
    } else if (name === "transport_brand") {
      // Clear dependent dropdown when brand changes
      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value,
          transport_model: "", // Clear model when brand changes
        },
        data: {
          ...prev.data,
          models: [], // Clear models data
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await HomeApi.Api.FilterSearch(
        "producer=" +
          values.producer +
          "&brand=" +
          values.transport_brand +
          "&model=" +
          values.transport_model
      );

      const filters = `producer=${values.producer}&carBrand=${values.transport_brand}&carModel=${values.transport_model}`;

      Store.dispatch(
        UIActions.setSearchData({
          results: data.data,
          pagination: data.pagination,
          filters,
        })
      );

      // Navigate with URL parameters so products page can use them
      const searchParams = new URLSearchParams({
        producer: values.producer,
        carBrand: values.transport_brand,
        carModel: values.transport_model,
      });

      navigate(`/${languages}/products?${searchParams.toString()}`);

      setState((prev) => ({
        ...prev,
        values: { producer: "", transport_model: "", transport_brand: "" },
      }));
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="w-full grid place-items-center gap-[50px] mt-[100px]">
      <p className="top font-[500] text-[32px] text-center">
        O’zingizga kerakli transport <br /> ehtiyot qisimlarini toping
      </p>
      <div className="bottom flex items-center justify-between w-full">
        <div className="form w-1/2">
          <form onSubmit={handleSubmit}>
            {" "}
            <Dropdown.Dropdown
              label="Ishlab chiqaruvchi kampaniya"
              placeholder="Ishlab chiqaruvchi kampaniya"
              onHandle={handleChange}
              data={data.producer.map((item) => ({ name: item, _id: item }))}
              value={values.producer}
              name="producer"
            />
            <Dropdown.Dropdown
              label="Transport turi"
              placeholder="Transport turini tanlang"
              onHandle={handleChange}
              data={data.brands.map((item) => ({ name: item, _id: item }))}
              value={values.transport_brand}
              name="transport_brand"
              disabled={values.producer === ""}
            />
            <Dropdown.Dropdown
              label="Transport modeli"
              placeholder="Transport modeli"
              onHandle={handleChange}
              data={data.models.map((item) => ({ name: item, _id: item }))}
              value={values.transport_model}
              name="transport_model"
              disabled={values.transport_brand === ""}
            />
            <button
              type="submit"
              className="submit w-[500px] h-[50px] bg-primary text-bg-primary rounded-full"
              disabled={values.transport_model === ""}
            >
              Qidirish
            </button>
          </form>
        </div>
        <div className="image w-1/2">
          <img loading="lazy" src={SectionImage} alt="car parts" />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
