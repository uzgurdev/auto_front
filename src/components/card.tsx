import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../lang";

import { RootState } from "store/store";
import { ProductsApi } from "modules";
import { Icon } from "components";
import { StorageManager } from "utils";

interface Product extends ProductsApi.Types.IProducts.IProduct {
  onClick: (id: string) => void;
  onCart: (id: string) => void;
  isCartLoading?: boolean;
}

const IMG_URL = process.env.REACT_APP_IMAGE_URL;

const Card: FC<Partial<Product>> = (Product) => {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);
  const [{ imageUrl }, setState] = useState({
    imageUrl: "",
  });

  useEffect(() => {
    const getImage = async () => {
      if (imageUrl) return;

      if (Product?.images?.length && !Product?.images[0].includes("https")) {
        const image = await fetch(
          `${IMG_URL}${Product?.images?.[0]
            .replace("assets/", "")
            .replace(".jpg", "")}`,
          {
            method: "GET",
          }
        );

        const blob = await image.blob();
        const url = URL.createObjectURL(blob);
        setState((prev) => ({ ...prev, imageUrl: url }));
      }
    };
    getImage();
  }, [Product?.images, imageUrl]);

  const cartChecker = useCallback((): boolean => {
    const cart = StorageManager.get("cart") as string[];
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return false;
    }
    return cart.some((_id) => _id === Product?._id);
  }, [Product?._id]);

  const handleClick = () => {
    Product?.onClick?.(Product?._id as string);
  };

  const addToCart = () => {
    if (cartChecker() || Product?.isCartLoading) return;

    Product?.onCart?.(Product?._id as string);
  };

  const isInCart = cartChecker();
  const isLoading = Product?.isCartLoading;

  return (
    <div className="min-w-[250px] max-h-[360px] rounded-2xl shadow-sm">
      <div className="relative rounded-[10px] mb-[10px]">
        <img
          src={
            (Product?.images ?? []).length > 0
              ? `${
                  Product?.images?.[0].includes("https")
                    ? Product?.images?.[0]
                    : imageUrl
                }`
              : ""
          }
          alt={Product?.name}
          className="rounded-[10px] w-full h-[200px] object-cover"
        />{" "}
        <div
          className={`wrapper absolute top-2 right-2 bg-bg-primary rounded-full hover:bg-bg-secondary ${
            isInCart ? "border border-success" : ""
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={addToCart}
        >
          <Icon.Icon
            icon={`icon-basket-${isInCart ? "check" : "add"}`}
            size="lg"
            color={
              isInCart
                ? "var(--color-success)"
                : isLoading
                ? "var(--color-text-muted)"
                : "var(--color-text-secondary)"
            }
            iconClassName={`border border-2 ${
              isLoading ? "animate-pulse" : ""
            }`}
            iconSize="20px"
          />
        </div>
      </div>
      <div className="text-sm">
        <p className="font-[400] text-text-muted">{Product?.producer}</p>
        <h3
          className="font-[500] text-text-primary"
          dangerouslySetInnerHTML={{ __html: Product.name as string }}
        />
        <p className="font-[500] my-[10px]">{Product?.price}</p>{" "}
        <button
          onClick={handleClick}
          className="w-full py-2 px-4 bg-bg-secondary text-text-secondary font-semibold rounded-lg transition-colors duration-200 hover:bg-bg-tertiary focus:outline-none focus:ring-text-muted outline-none"
        >
          {t("more")}
        </button>
      </div>
    </div>
  );
};

export default Card;
