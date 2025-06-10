import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Banner, Carousel, Icon } from "components";
import SearchSection from "./searchSection";
import PartTypes from "./partTypes";
import ProductShowcase from "./productShowcase";
import PopularProductTypes from "./popularProductTypes";
import Comments from "./comments";
import DiscountSection from "./discountSection";
import axios from "axios";
import { HomeApi } from "modules";
import RecommendationSec from "./recs";

interface QuickL {
  text: string;
  icon: Icon.IconType.IconNames;
  params: string;
}

const QuickLinks: QuickL[] = [
  {
    icon: "icon-wheel",
    text: "WHEEL",
    params: "filter=wheel",
  },
  {
    icon: "icon-brake",
    text: "BRAKE",
    params: "filter=brake",
  },
  {
    icon: "icon-damper",
    text: "DAMPER",
    params: "filter=damper",
  },
  {
    icon: "icon-light",
    text: "LIGHT",
    params: "filter=light",
  },
  {
    icon: "icon-stereo",
    text: "STEREO",
    params: "filter=stereo",
  },
  {
    icon: "icon-oil",
    text: "OIL",
    params: "filter=oil",
  },
  {
    icon: "icon-exhaust",
    text: "EXHAUST",
    params: "filter=exhaust",
  },
  {
    icon: "icon-filter",
    text: "FILTER",
    params: "filter=filter",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const banners = useMemo(
    () => [
      <Banner.Banner />,
      <Banner.Banner idx={2} />,
      <Banner.Banner idx={3} />,
    ],
    []
  );

  const handleDot = (idx: number) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (data !== null) return;
      setIsLoading(true);

      try {
        const { data } = await HomeApi.Api.Home();
        setData(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isPaused) return; // Don't start interval if paused

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  return (
    <div className="text-left mt-5">
      <div className="wrapper">
        <div className="quick-links flex gap-[10px] pb-5">
          {data?.tags.map((link: any) => (
            <Banner.QuickLink
              key={link._id}
              text={link.name}
              params={`filter=${link.name}`}
            />
          ))}
        </div>
        <div
          className="banners-carousel relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {banner}
              </div>
            ))}
          </div>

          <div className="dots flex items-center justify-between gap-[13px] left-1/2 absolute bottom-[126px] w-max h-max z-20">
            {banners.map((_, index) => (
              <div
                key={`dot-container-${index}`}
                className={`w-4 h-4 rounded-full grid place-items-center ${
                  currentIndex === index ? "border border-primary" : ""
                }`}
              >
                <span
                  className={`cursor-pointer block ${
                    currentIndex === index ? "bg-primary" : "bg-border-medium"
                  } w-2 h-2 rounded-full`}
                  onClick={() => handleDot(index)}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SearchSection data={data?.filters} />
      <RecommendationSec />

      <PartTypes />

      <ProductShowcase />

      <PopularProductTypes />

      <Comments />

      <DiscountSection discount={data?.percentage} />
    </div>
  );
};

export default Home;
