import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Store } from "store";
import { UIActions } from "store/slices";

import { ProductsApi } from "modules";
import { Dropdown } from "components";

import SectionImage from "../../assets/images/section_2.png";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface filter {
  _id: string;
  type: "producer" | "carBrand" | "carType";
  name: string;
  count: number;
}

interface SearchSectionProps {
  data?: filter[];
}

const SearchSection: FC<SearchSectionProps> = ({ data }) => {
  const navigate = useNavigate();
  const { languages } = useSelector((state: RootState) => state.ui);
  const [{ initialData, values, optData }, setState] = useState({
    optData: {
      company: [] as filter[],
      models: [] as filter[],
      types: [
        { name: "Sedan", _id: "0", type: "carType", count: 2 },
        { name: "Hatchback", _id: "1", type: "carType", count: 2 },
        { name: "SUV", _id: "2", type: "carType", count: 2 },
        { name: "Crossover", _id: "3", type: "carType", count: 2 },
      ],
    },
    initialData: {
      company: [] as filter[],
      models: [] as filter[],
    },
    values: {
      company: "",
      transport_type: "",
      transport_model: "",
    },
  });

  useEffect(() => {
    const initOptDataSetter = () => {
      const newCompany = data?.filter((item) => item.type === "producer");
      const newModel = data?.filter((item) => item.type === "carBrand");

      setState((prev) => ({
        ...prev,
        optData: {
          ...prev.optData,
          company: newCompany as filter[],
          models: newModel as filter[],
        },
        initialData: {
          company: newCompany as filter[],
          models: newModel as filter[],
        },
      }));
    };

    initOptDataSetter();
  }, [data]);

  const handleChange = (value: string, name: string) => {
    if (name === "company") {
      const newCompany = value
        ? initialData.company.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        : initialData.company;

      setState((prev) => ({
        ...prev,
        optData: { ...prev.optData, company: newCompany },
        values: {
          ...prev.values,
          [name]: value,
        },
      }));
    }

    if (name === "transport_model") {
      const newModel = value
        ? initialData.models.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        : initialData.models;

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value,
        },
        optData: { ...prev.optData, models: newModel },
      }));
    }

    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ e, values });
    const filters = `producer=${values.company}&carBrand=${values.transport_model}&carType=${values.transport_type}`;
    const { data } = await ProductsApi.Api.search(filters);

    Store.dispatch(
      UIActions.setSearchData({
        results: data.results,
        pagination: data.pagination,
        filters,
      })
    );

    setState((prev) => ({
      ...prev,
      values: { company: "", transport_model: "", transport_type: "" },
    }));

    navigate(`/${languages}/products`, {
      state: {
        filters,
      },
    });
  };

  return (
    <div className="w-full grid place-items-center gap-[50px] mt-[100px]">
      <p className="top font-[500] text-[32px] text-center">
        O’zingizga kerakli transport <br /> ehtiyot qisimlarini toping
      </p>
      <div className="bottom flex items-center justify-between w-full">
        <div className="form w-1/2">
          <form onSubmit={handleSubmit}>
            <Dropdown.Dropdown
              label="Ishlab chiqaruvchi kampaniya"
              placeholder="Ishlab chiqaruvchi kampaniya"
              onHandle={handleChange}
              data={optData.company}
              value={values.company}
              name="company"
            />
            <Dropdown.Dropdown
              label="Transport turi"
              placeholder="Transport turini tanlang"
              onHandle={handleChange}
              data={optData.types}
              value={values.transport_type}
              name="transport_type"
              disabled={values.company === ""}
            />
            <Dropdown.Dropdown
              label="Transport modeli"
              placeholder="Transport modeli"
              onHandle={handleChange}
              data={optData.models}
              value={values.transport_model}
              name="transport_model"
              disabled={values.transport_type === ""}
            />

            <button
              type="submit"
              className="submit w-[500px] h-[50px] bg-primary text-bg-primary rounded-full"
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
