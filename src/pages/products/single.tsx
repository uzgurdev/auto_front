import { useState } from "react";
import { useSearchParams } from "react-router";
import { ProductsApi } from "modules";
import { Icon, Modal } from "components";

const Single = () => {
  const [searchParams] = useSearchParams();
  const filters = searchParams.get("filter");
  const query = searchParams.get("q");

  const [{ isModalOpen }, setState] = useState({
    // currentPage:
    //   (searchProducts.pagination ?? searchData.pagination).currentPage || 1,
    isModalOpen: null as null | ProductsApi.Types.IProducts.IProduct,
  });

  const singleProductCount = [];

  const handleOpenModal = (id: string) => {
    // const product = filteredProducts.filter((p) => p._id === id)[0];
    // setState((prev) => ({
    //   ...prev,
    //   isModalOpen: {
    //     _id: product.id,
    //     images: product.images,
    //     name: product.name,
    //     brand: product.brand,
    //     price: product.price,
    //     originalPrice: product.price,
    //     count: 1,
    //     description: '',
    //     type: '',
    //     carModel: '',
    //     status: '',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     __v: 0
    //   },
    // }));
  };

  const handleCart = (id: string) => {
    // const productIdx = filteredProducts.findIndex((p) => p._id === id);
    // if (productIdx === -1) return;
    // Store.dispatch(
    //   UIActions.addToCart(
    //     isModalOpen !== null
    //       ? isModalOpen
    //       : {
    //           ...filteredProducts[productIdx],
    //           originalPrice: filteredProducts[productIdx].price,
    //           count: 1,
    //         }
    //   )
    // );
  };

  const handleProductCountInCart = (count: number) => {
    // setState((prev) => ({
    //   ...prev,
    //   isModalOpen: prev.isModalOpen
    //     ? ({ ...prev.isModalOpen, count } as Product)
    //     : null,
    // }));
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isModalOpen: null }));
  };

  // console.log("searchProducts:", searchProducts);

  return (
    <Modal.Modal classes="w-[1050px] h-[630px]" onClose={handleClose}>
      <div className="flex items-center justify-center gap-[35px] h-full">
        <div className="images grid place-items-center gap-[10px] w-1/2">
          <img
            src="https://placehold.co/450x450"
            alt="product"
            className="rounded-xl"
          />
          <div className="images flex items-center justify-center gap-[17px]">
            <img
              src="https://placehold.co/100x100"
              alt="product"
              className="rounded-xl"
            />
            <img
              src="https://placehold.co/100x100"
              alt="product"
              height={"100px"}
              width={"100px"}
              className="rounded-xl"
              style={{ filter: "grayscale(500%)" }}
            />
            <img
              src="https://placehold.co/100x100"
              alt="product"
              className="rounded-xl"
            />
            <img
              src="https://placehold.co/100x100"
              alt="product"
              className="rounded-xl"
            />
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
                  ID: <span className="text-text-muted">{isModalOpen._id}</span>
                </p>
                <p className="text-text-secondary font-Poppins font-medium text-lg">
                  Brand:{" "}
                  <span className="text-text-muted">
                    {isModalOpen.producer}
                  </span>
                </p>
                <p className="text-text-secondary font-Poppins font-medium text-lg">
                  Model: <span className="text-text-muted">Model</span>
                </p>
                <p className="text-text-secondary font-Poppins font-medium text-lg">
                  Joylashuvi:
                  <span className="text-text-muted"> Oldi/chap</span>
                </p>
              </div>
              <p className="text-text-muted font-Poppins font-medium text-lg">
                Mavjud: <span className="text-success">10 tadan ko'p</span>
              </p>
            </div>
          </div>

          <div>
            <p className="price font-medium text-2xl mt-[20px]">$123.00</p>

            <div className="action w-full flex items-center justify-center gap-[16px] mt-[10px]">
              {singleProductCount.length > 0 &&
                singleProductCount[0]?.count !== 0 && (
                  <div className="count-Inc flex items-center w-full h-[90px] border border-border-medium rounded-[10px] font-Poppins font-medium text-2xl">
                    <p className="quantity w-11/12 text-center">
                      {singleProductCount[0]?.count}
                    </p>
                    <div className="btns w-[50px] h-full border-l border-border-medium">
                      <button
                        className="border-b border-border-medium w-full h-1/2"
                        onClick={() =>
                          handleProductCountInCart(
                            singleProductCount[0]?.count + 1
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="w-full h-1/2"
                        onClick={() =>
                          handleProductCountInCart(
                            singleProductCount[0]?.count - 1
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                )}

              {singleProductCount.length === 0 && (
                <button
                  className="w-full h-[90px] bg-primary rounded-[10px] flex items-center justify-center gap-[10px] text-bg-primary"
                  onClick={() => handleCart(isModalOpen?._id)}
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
  );
};

export default Single;
