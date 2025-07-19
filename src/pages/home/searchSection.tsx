import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useTranslation } from "../../lang";

import { Store } from "store";
import { UIActions } from "store/slices";
import { RootState } from "store/store";

import { HomeApi } from "modules";
import { Dropdown } from "components";

import SectionImage from "../../assets/images/section_2.png";

type filter = string[];

const SearchSection = () => {
  const navigate = useNavigate();
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);
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
          const response = await HomeApi.Api.FilterProducers();
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
      if (values.producer) {
        try {
          const response = await HomeApi.Api.FilterBrands(values.producer);
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
  }, [values.producer]);

  useEffect(() => {
    const fetchModels = async () => {
      if (values.transport_brand) {
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

    if (values.transport_brand) {
      fetchModels();
    }
  }, [values.transport_brand, values.producer]);

  const handleChange = (name: string, value: string) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [value]: name,
      },
    }));

    if (name === "producer") {
      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          brands: [],
          models: [],
        },
        values: {
          ...prev.values,
          transport_brand: "",
          transport_model: "",
        },
      }));
    } else if (name === "transport_brand") {
      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          models: [],
        },
        values: {
          ...prev.values,
          transport_model: "",
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !values.producer ||
      !values.transport_brand ||
      !values.transport_model
    ) {
      return;
    }

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
      <p className="top font-[500] md:text-[32px] text-[24px] text-center">
        {t("search.find_parts")}
      </p>
      <div className="bottom flex flex-col lg:flex-row items-center justify-between w-full gap-8">
        <div className="form w-full lg:w-1/2 order-2 lg:order-1">
          <form onSubmit={handleSubmit}>
            <Dropdown.Dropdown
              label={t("search.producer_label")}
              placeholder={t("search.producer_placeholder")}
              onHandle={handleChange}
              data={data.producer.map((item) => ({ name: item, _id: item }))}
              value={values.producer}
              name="producer"
            />
            <Dropdown.Dropdown
              label={t("search.car_brand_label")}
              placeholder={t("search.car_brand_placeholder")}
              onHandle={handleChange}
              data={data.brands.map((item) => ({ name: item, _id: item }))}
              value={values.transport_brand}
              name="transport_brand"
              disabled={values.producer === ""}
            />
            <Dropdown.Dropdown
              label={t("search.car_model_label")}
              placeholder={t("search.car_model_placeholder")}
              onHandle={handleChange}
              data={data.models.map((item) => ({ name: item, _id: item }))}
              value={values.transport_model}
              name="transport_model"
              disabled={values.transport_brand === ""}
            />
            <button
              type="submit"
              className="submit w-full lg:w-[500px] h-[50px] bg-primary text-bg-primary rounded-full"
              disabled={values.transport_model === ""}
            >
              {t("search.search_button")}
            </button>
          </form>
        </div>
        <div className="image w-full lg:w-1/2 order-1 lg:order-2">
          <img loading="lazy" src={SectionImage} alt="car parts" />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
