import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { Carousel, Modal, Icon } from "components";

import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { HomeApi } from "modules";
import { Store } from "store";
import { UIActions } from "store/slices";

const RecommendationSec = () => {
  const navigate = useNavigate();

  const [{ currentCategory, recs, isModalOpen }, setState] = useState({
    currentCategory: "all",
    recs: [] as any,
    isModalOpen: null as null | HomeApi.Types.IHome.Recs.IProducts,
  });
  const { languages, cart } = useSelector((state: RootState) => state.ui);

  const categories = useRef(["all", "wheels", "brakes", "lights"]);

  useEffect(() => {
    const recs = async () => {
      const { data } = await HomeApi.Api.Recs();
      const products = Object.values(data.data.mostOrderedByCategory)
        .map((item) => item.products)
        .flat();

      Store.dispatch(UIActions.setRecs(data.data));
      setState((prev) => ({ ...prev, recs: products }));

      categories.current = [
        "all",
        ...Object.values(data.data.mostOrderedByCategory).map(
          (item) => item.category
        ),
      ];
    };
    recs();
  }, []);
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

  const handleCart = (id: string) => {
    // Add to cart functionality
    console.log("Adding to cart:", id);
  };

  // Filter cart products for modal
  const singleProductCount = cart.filter(
    (p) => p._id === isModalOpen?.productId
  );

  return (
    <div className="popular flex flex-col gap-10 mt-[100px]">
      <div className="header flex items-center">
        <h2 className="font-bold text-2xl text-border-dark">
          Ommabop mahsulotlar
        </h2>

        <span className="divider w-[2px] h-[30px] bg-border-dark opacity-50 mx-[30px]"></span>

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
      </div>

      <Carousel
        products={recs}
        onViewAll={handleViewAll}
        currentCategory={currentCategory} // Pass currentCategory to Carousel
        onOpenModal={handleOpenModal}
        onCart={handleCart}
      />

      {isModalOpen !== null && (
        <Modal.Modal classes="w-[1050px] h-[630px]" onClose={handleClose}>
          <div className="flex items-center justify-center gap-[35px] h-full">
            <div className="images grid place-items-center gap-[10px] w-1/2">
              <img
                src={isModalOpen.images?.[0] || "https://placehold.co/450x450"}
                alt="product"
                className="rounded-xl"
              />
              <div className="images flex items-center justify-center gap-[17px]">
                {isModalOpen.images?.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image || "https://placehold.co/100x100"}
                    alt="product"
                    className="rounded-xl w-[100px] h-[100px]"
                  />
                ))}
              </div>
            </div>
            <div className="content w-1/2 h-full flex flex-col justify-between">
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
                        {isModalOpen.productId}
                      </span>
                    </p>
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      Brand:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.producer || "N/A"}
                      </span>
                    </p>
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      Category:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.category}
                      </span>
                    </p>{" "}
                  </div>
                  {/* <p className="text-text-muted font-Poppins font-medium text-lg">
                    Mavjud: <span className="text-success">10 tadan ko'p</span>
                  </p> */}
                </div>
              </div>

              <div>
                <p className="price font-medium text-2xl mt-[20px]">
                  ${isModalOpen.price}
                </p>

                <div className="action w-full flex items-center justify-center gap-[16px] mt-[10px]">
                  {singleProductCount.length === 0 && (
                    <button
                      className="w-full h-[90px] bg-primary rounded-[10px] flex items-center justify-center gap-[10px] text-bg-primary"
                      onClick={() => handleCart(isModalOpen.productId)}
                    >
                      <Icon.Icon
                        icon="icon-basket"
                        size="md"
                        color="var(--color-bg-primary)"
                      />
                      <p className="text-2xl font-medium">Savatga</p>
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
