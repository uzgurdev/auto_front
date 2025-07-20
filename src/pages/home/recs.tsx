import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

import { Carousel, Modal, Icon } from "components";

import { RootState } from "store/store";
import { HomeApi, ProductsApi } from "modules";
import { Store } from "store";
import { UIActions } from "store/slices";
import { StorageManager } from "utils";

import ENGINE_BLOCK_iCON from "assets/images/engine_block.png";
import GEAR_iCON from "assets/images/gear_icon.png";

const placeholderImages = [ENGINE_BLOCK_iCON, GEAR_iCON];

const RecommendationSec = () => {
  const navigate = useNavigate();
  const [
    { currentCategory, recs, isModalOpen, cartUpdateTrigger, loadingCartItems },
    setState,
  ] = useState({
    currentCategory: "all",
    recs: [] as any,
    isModalOpen: null as null | HomeApi.Types.IHome.Recs.IProducts,
    cartUpdateTrigger: 0,
    loadingCartItems: new Set<string>(), // Track which items are loading
  });
  const {
    languages,
    cart,
    recs: recsFromStore,
  } = useSelector((state: RootState) => state.ui);

  const categories = useRef(["all", "wheels", "brakes", "lights"]);

  useEffect(() => {
    // Use data from Redux store instead of fetching it again
    if (recsFromStore.mostOrderedByCategory) {
      const products = Object.values(recsFromStore.mostOrderedByCategory)
        .map((item) => item.products)
        .flat();

      setState((prev) => ({ ...prev, recs: products }));

      categories.current = [
        "all",
        ...Object.values(recsFromStore.mostOrderedByCategory).map(
          (item) => item.category
        ),
      ];
    }
  }, [recsFromStore]);

  const handleViewAll = () => {
    navigate(`/${languages}/products`);
  };

  const handleOpenModal = (id: string) => {
    const product = recs.find((p: any) => p.productId === id);
    if (product) {
      setState((prev) => ({
        ...prev,
        isModalOpen: product,
      }));
    }
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isModalOpen: null }));
  };
  const handleCart = async (id: string) => {
    // Add item to loading state
    setState((prev) => {
      const newLoadingItems = new Set(prev.loadingCartItems);
      newLoadingItems.add(id);
      return {
        ...prev,
        loadingCartItems: newLoadingItems,
      };
    });

    try {
      const { data } = await ProductsApi.Api.addToCart(id);
      const cartIds = StorageManager.get("cart") || [];
      const newCartIds = [...cartIds, id];

      if (!isEmpty(data.data) && data.data.items.length > 0) {
        // Use setCart to replace the entire cart with the API response
        // This prevents incrementing existing items when adding new ones
        Store.dispatch(UIActions.setCart(data.data.items));
      }
      StorageManager.set("cart", newCartIds);

      // Trigger re-render of cards to update cart icons
      setState((prev) => {
        const newLoadingItems = new Set(prev.loadingCartItems);
        newLoadingItems.delete(id);
        return {
          ...prev,
          cartUpdateTrigger: prev.cartUpdateTrigger + 1,
          loadingCartItems: newLoadingItems,
        };
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Remove item from loading state on error
      setState((prev) => {
        const newLoadingItems = new Set(prev.loadingCartItems);
        newLoadingItems.delete(id);
        return {
          ...prev,
          loadingCartItems: newLoadingItems,
        };
      });
    }
  };

  // Filter cart products for modal
  const singleProductCount = cart.filter(
    (p) => p._id === isModalOpen?.productId
  );

  return (
    <div className="popular flex flex-col gap-10 mt-[100px]">
      <div className="header flex md:flex-row flex-col items-center">
        <h2 className="font-bold text-2xl text-border-dark">
          Ommabop mahsulotlar
        </h2>

        <span className="divider w-[2px] h-[30px] bg-border-dark opacity-50 mx-[30px] md:block hidden"></span>

        <div className="btns flex items-center justify-evenly gap-[10px]">
          {categories.current.map((item, idx) => (
            <button
              key={idx}
              className={`text-sm font-[400] ${
                currentCategory === item
                  ? "py-[6px] px-6 text-primary bg-bg-secondary rounded-full"
                  : "text-text-extra-light"
              }`}
              onClick={() =>
                setState((prev) => ({ ...prev, currentCategory: item }))
              }
            >
              {item.toUpperCase()}
            </button>
          ))}{" "}
        </div>
      </div>{" "}
      <Carousel
        key={cartUpdateTrigger} // Force re-render when cart changes
        products={recs}
        onViewAll={handleViewAll}
        currentCategory={currentCategory} // Pass currentCategory to Carousel
        onOpenModal={handleOpenModal}
        onCart={handleCart}
        loadingCartItems={loadingCartItems} // Pass loading state
      />
      {isModalOpen !== null && (
        <Modal.Modal
          classes="w-[300px] md:w-[1050px] h-[600] md:h-[630px]"
          onClose={handleClose}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-[35px] h-full">
            <div className="main-image grid place-items-center gap-[10px] w-full md:w-1/2">
              <img
                src={
                  isModalOpen.product.images.length > 1
                    ? isModalOpen.product.images[0]
                    : placeholderImages[
                        Math.floor(Math.random() * placeholderImages.length)
                      ]
                }
                alt="product"
                className="rounded-xl w-[300px] md:w-[250px] h-[250px] md:h-auto"
                // width={"350px"}
                // height={"auto"}
              />
              <div className="images hidden md:flex items-center justify-center gap-[17px]">
                {isModalOpen.product.images.slice(1, 5).map((image, index) => (
                  <img
                    src={image || "https://placehold.co/100x100"}
                    alt="product"
                    height={"80px"}
                    width={"80px"}
                    className="rounded-xl cursor-pointer hover:opacity-80"
                    style={{ filter: "grayscale(500%)" }}
                    key={index}
                    onClick={() => {
                      const newImages = [...(isModalOpen.product.images || [])];
                      const clickedImage = newImages[index + 1];
                      newImages[index + 1] = newImages[0];
                      newImages[0] = clickedImage;
                      setState((prev) => ({
                        ...prev,
                        isModalOpen: prev.isModalOpen
                          ? { ...prev.isModalOpen, images: newImages }
                          : null,
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="content w-[300px] md:w-1/2 h-full flex flex-col justify-between">
              <div>
                <p className="name font-Poppins font-medium text-[32px] mb-[5px]">
                  {isModalOpen.name}
                </p>
                <hr />
                <div className="details flex items-start justify-between mt-[15px]">
                  <div className="grid gap-[5px]">
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      ID:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.product.carPartIds?.join(", ")}
                      </span>
                    </p>
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      Brand:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.product.producer || "N/A"}
                      </span>
                    </p>
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      Category:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.category}
                      </span>
                    </p>{" "}
                  </div>
                  <p className="text-text-secondary font-Poppins font-medium text-lg">
                    Model:{" "}
                    <span className="text-text-muted">
                      {isModalOpen.product.carModel.join(", ")}
                    </span>
                  </p>
                  {/* <p className="text-text-muted font-Poppins font-medium text-lg">
                    Mavjud: <span className="text-success">10 tadan ko'p</span>
                  </p> */}
                </div>
              </div>

              <div>
                <p className="price font-medium text-2xl mt-[20px]">
                  {isModalOpen.product.price}
                </p>{" "}
                <div className="action w-full flex items-center justify-center gap-[16px] mt-[10px]">
                  {singleProductCount.length === 0 && (
                    <button
                      className={`w-full h-60px md:h-[90px] bg-primary rounded-[10px] flex items-center justify-center gap-[10px] text-bg-primary ${
                        loadingCartItems.has(isModalOpen?.product._id || "")
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleCart(isModalOpen.productId)}
                      disabled={loadingCartItems.has(isModalOpen.productId)}
                    >
                      <Icon.Icon
                        icon="icon-basket"
                        size="md"
                        color="var(--color-bg-primary)"
                        iconClassName={
                          loadingCartItems.has(isModalOpen.productId)
                            ? "animate-pulse"
                            : ""
                        }
                      />
                      <p className="text-2xl font-medium">
                        {loadingCartItems.has(isModalOpen.productId)
                          ? "Qo'shilmoqda..."
                          : "Savatga"}
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Modal>
      )}
    </div>
  );
};

export default RecommendationSec;
