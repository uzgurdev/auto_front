import { useState } from "react";
import { useSelector } from "react-redux";

import { Card, Filters, Icon, Modal } from "components";
import DEMO_PRODUCTS from "demo";
import { Store } from "store";
import { UIActions } from "store/slices";
import { RootState } from "store/store";
import { ProductsApi } from "modules";
import { useSearchParams } from "react-router";

interface Product {
  id: number;
  images: string[];
  name: string;
  brand: string;
  price: number;
  count: number;
  originalPrice: number;
}

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(DEMO_PRODUCTS);
  const { cart } = useSelector((state: RootState) => state.ui);
  const [searchParams] = useSearchParams();
  const filters = searchParams.get("filters");
  console.log(filters);

  const [{ startIdx, endIdx, currentPage, isModalOpen }, setState] = useState({
    startIdx: 0,
    endIdx: 5,
    currentPage: 1,
    isModalOpen: null as null | ProductsApi.Types.IProducts.IProduct,
  });

  const singleProductCount = cart.filter((p) => p._id === isModalOpen?._id);

  const handlePageChange = (page: number) => {
    if (currentPage === page || page < 1) return;
    setState((prev) => ({
      ...prev,
      startIdx: (page - 1) * 5,
      endIdx: page * 5,
      currentPage: page,
    }));
  };

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
    Store.dispatch(
      UIActions.setProductsCountInCart({
        id: isModalOpen?._id as string,
        count,
      })
    );
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isModalOpen: null }));
  };

  return (
    <div className="grid grid-cols-[1fr] md:grid-cols-[330px_1fr] mt-[50px] gap-[35px]">
      <div className="text-left">
        <Filters.Filters />
      </div>
      <div className="products grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* {filteredProducts.slice(startIdx, endIdx).map((product) => (
            <Card
              key={product._id}
              {...product}
              onClick={handleOpenModal}
              onCart={handleCart}
            />
          ))} */}
        </div>
        <div className="pagination flex items-center justify-start gap-4 my-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={startIdx === 0}
            className="p-2 active:border-2 active:border-primary rounded-md"
          >
            <Icon.Icon
              icon="icon-down"
              size="xs"
              color="var(--color-text-secondary)"
              radiusSize={0}
              iconSize="13px"
              rotate={90}
            />
          </button>
          <div className="flex items-center gap-2">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / 5) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-md ${
                  page === currentPage ? "bg-primary text-bg-primary" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIdx >= DEMO_PRODUCTS.length}
            className="p-2 active:border-2 active:border-primary rounded-md"
          >
            <Icon.Icon
              icon="icon-down"
              size="xs"
              color="var(--color-text-secondary)"
              radiusSize={0}
              iconSize="13px"
              rotate={-90}
            />
          </button>
        </div>
      </div>

      {isModalOpen !== null && (
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
                      ID:{" "}
                      <span className="text-text-muted">{isModalOpen._id}</span>
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
      )}
    </div>
  );
};

export default Products;
