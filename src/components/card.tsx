import { FC, useCallback } from "react";
import { useSelector } from "react-redux";

import { RootState } from "store/store";
import { ProductsApi } from "modules";
import { Icon } from "components";

interface Product extends ProductsApi.Types.IProducts.IProduct {
  onClick: (id: string) => void;
  onCart: (id: string) => void;
}
const Card: FC<Partial<Product>> = (Product) => {
  const { cart } = useSelector((state: RootState) => state.ui);

  const cartChecker = useCallback((): boolean => {
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return false;
    }
    return cart.some((item) => item?._id === Product?._id);
  }, [Product?._id, cart]);

  const handleClick = () => {
    Product?.onClick?.(Product?._id as string);
  };

  const addToCart = () => {
    if (cartChecker()) return;

    Product?.onCart?.(Product?._id as string);
  };

  return (
    <div className="w-[250px] max-h-[360px] rounded-2xl shadow-sm">
      <div className="relative rounded-[10px] mb-[10px]">
        <img
          src={(Product?.images ?? []).length > 0 ? Product?.images?.[0] : ""}
          alt={Product?.name}
          className="rounded-[10px] w-full h-[200px] object-cover"
        />

        <div
          className={`wrapper absolute top-2 right-2 bg-bg-primary rounded-full hover:bg-bg-secondary ${
            cartChecker() ? "border border-success" : ""
          }`}
          onClick={addToCart}
        >
          <Icon.Icon
            icon={`icon-basket-${cartChecker() ? "check" : "add"}`}
            size="lg"
            color={
              cartChecker()
                ? "var(--color-success)"
                : "var(--color-text-secondary)"
            }
            iconClassName="border border-2"
            iconSize="20px"
          />
        </div>
      </div>
      <div className="text-sm">
        <p className="font-[400] text-text-muted">{Product?.producer}</p>
        <h3
          className="font-[500] text-text-primary"
          dangerouslySetInnerHTML={{ __html: Product?.name || "" }}
        />
        <p className="font-[500] my-[10px]">
          $
          {Product?.price?.toLocaleString("us-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <button
          onClick={handleClick}
          className="w-full py-2 px-4 bg-bg-secondary text-text-secondary font-semibold rounded-lg transition-colors duration-200 hover:bg-bg-tertiary focus:outline-none focus:ring-text-muted outline-none"
        >
          Batafsil
        </button>
      </div>
    </div>
  );
};

export default Card;
