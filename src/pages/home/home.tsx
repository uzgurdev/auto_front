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
import { Store } from "store";
import { UIActions } from "store/slices";
import RecommendationSec from "./recs";

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
      setIsLoading(true);

      try {
        // Fetch home data and recommendations in parallel
        const [homeResponse, recsResponse] = await Promise.all([
          HomeApi.Api.Home(),
          HomeApi.Api.Recs(),
        ]);

        setData(homeResponse.data.data);

        // Populate Redux store with recommendations data so other components can use it
        Store.dispatch(UIActions.setRecs(recsResponse.data.data));

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    if (!data) {
      fetchProducts();
    }
  }, [data]);

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

          <div className="dots flex items-center justify-center gap-[13px] absolute bottom-[126px] left-1/2 transform -translate-x-1/2 w-max h-max z-20">
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

      <SearchSection />
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
