import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { isEmpty } from "lodash";

import { Store } from "store";
import { UIActions } from "store/slices";
import { RootState } from "store/store";
import { ProductsApi } from "modules";
import { Card, Filters, Icon, Modal } from "components";
import { StorageManager } from "utils";

import ENGINE_BLOCK_iCON from "assets/images/engine_block.png";
import GEAR_iCON from "assets/images/gear_icon.png";

const placeholderImages = [ENGINE_BLOCK_iCON, GEAR_iCON];

const Products = () => {
  const { cart, searchProducts, searchData } = useSelector(
    (state: RootState) => state.ui
  );
  const [searchParams] = useSearchParams();
  const filters = searchParams.get("filter");
  const query = searchParams.get("q");
  const producer = searchParams.get("producer");
  const carBrand = searchParams.get("carBrand");
  const carModel = searchParams.get("carModel");
  const position = searchParams.get("position");
  const [
    { currentPage, isModalOpen, isLoading, loadingCartItems, isFiltersOpen },
    setState,
  ] = useState({
    currentPage: 1, // Start with page 1, will be updated by Redux state
    isModalOpen: null as null | ProductsApi.Types.IProducts.IProduct,
    isLoading: false,
    loadingCartItems: new Set<string>(), // Track which items are loading
    isFiltersOpen: false, // Track if filters modal is open
  });
  // Get the current page from Redux state with proper null safety
  const reduxCurrentPage =
    searchProducts?.pagination?.currentPage ??
    searchData?.pagination?.currentPage ??
    1;
  useEffect(() => {
    const fetchProducts = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        // If we have position parameter and searchProducts already has data that matches,
        // skip fetching to avoid duplicate requests
        if (
          position &&
          searchProducts.results &&
          searchProducts.results.length > 0 &&
          currentPage === reduxCurrentPage
        ) {
          setState((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        let queryString = "";

        // Check if we have search data from form submission (producer, carBrand, carModel)
        if (producer || carBrand || carModel) {
          const searchFilters = new URLSearchParams({
            page: "1", // Always start from page 1 for new searches
            limit: "20",
            ...(producer && { producer }),
            ...(carBrand && { carBrand }),
            ...(carModel && { carModel }),
            ...(position && { position }),
          });
          queryString = searchFilters.toString();
        } else if (filters || query || position) {
          // Fallback to filter/query search
          const searchFilters = new URLSearchParams({
            page: "1", // Always start from page 1 for new searches
            limit: "20",
            ...(query && { query: query }),
            ...(filters && { query: filters }),
            ...(position && { position }),
          });
          queryString = searchFilters.toString();
        } else {
          // Default search with pagination
          const searchFilters = new URLSearchParams({
            page: "1", // Always start from page 1 for default search
            limit: "20",
          });
          queryString = searchFilters.toString();
        }

        const { data } = await ProductsApi.Api.search(queryString);

        Store.dispatch(
          UIActions.setSearchProducts({
            results: data.results,
            pagination: {
              ...data.pagination,
              currentPage: 1, // Ensure we start from page 1
            },
          })
        );

        Store.dispatch(UIActions.setCartCount(data.cartCount ?? 0));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false, currentPage: 1 }));
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, query, producer, carBrand, carModel, position]);
  // Sync local currentPage with Redux pagination state
  useEffect(() => {
    const newCurrentPage =
      searchProducts?.pagination?.currentPage ??
      searchData?.pagination?.currentPage ??
      1;

    setState((prev) => ({
      ...prev,
      currentPage: newCurrentPage,
    }));
  }, [
    searchProducts?.pagination?.currentPage,
    searchData?.pagination?.currentPage,
  ]);

  const singleProductCount = cart.filter((p) => p._id === isModalOpen?._id);
  const handlePageChange = async (page: number) => {
    const pagination = searchProducts?.pagination ?? searchData?.pagination;

    // If pagination is not available, return early
    if (!pagination) {
      console.warn("Pagination data not available");
      return;
    }

    // Validate page bounds
    if (page < 1 || page > pagination.totalPages) {
      console.warn("Page out of bounds:", page);
      return;
    }

    // Check if we're already on this page
    if (pagination.currentPage === page) {
      // console.log("Already on page:", page);
      return;
    }

    // Update the local state immediately for UI feedback
    setState((prev) => ({
      ...prev,
      currentPage: page,
      isLoading: true,
    }));

    try {
      let queryString = "";

      // Check if we have search data from form submission (producer, carBrand, carModel)
      if (producer || carBrand || carModel) {
        const searchFilters = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          ...(producer && { producer }),
          ...(carBrand && { carBrand }),
          ...(carModel && { carModel }),
          ...(position && { position }),
        });
        queryString = searchFilters.toString();
      } else if (filters || query || position) {
        // Fallback to filter/query search
        const searchFilters = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          ...(query && { query: query }),
          ...(filters && { query: filters }),
          ...(position && { position }),
        });
        queryString = searchFilters.toString();
      } else {
        // Default search with pagination
        const searchFilters = new URLSearchParams({
          page: page.toString(),
          limit: "20",
        });
        queryString = searchFilters.toString();
      }

      const { data } = await ProductsApi.Api.search(queryString);

      // Update Redux store with new data and pagination info
      Store.dispatch(
        UIActions.setSearchProducts({
          results: data.results,
          pagination: {
            ...data.pagination,
            currentPage: page, // Ensure the current page is correctly set
          },
        })
      );

    } catch (error) {
      console.error("Error during pagination:", error);
      // Reset to previous page on error
      setState((prev) => ({
        ...prev,
        currentPage: pagination.currentPage,
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };
  const handleOpenModal = (id: string) => {
    const products = searchProducts.results ?? searchData.results;
    const product = products.filter((p) => p._id === id)[0];

    if (product) {
      setState((prev) => ({
        ...prev,
        isModalOpen: product,
      }));
    }
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

      // Remove item from loading state on success
      setState((prev) => {
        const newLoadingItems = new Set(prev.loadingCartItems);
        newLoadingItems.delete(id);
        return {
          ...prev,
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

  const handleProductCountInCart = (count: number) => {
    Store.dispatch(
      UIActions.setProductsCountInCart({
        id: isModalOpen?._id as string,
        count,
      })
    );
  };

  const handleClose = (type: "filters" | "product") => {
    if (type === "product")
      setState((prev) => ({ ...prev, isModalOpen: null }));
    if (type === "filters")
      setState((prev) => ({ ...prev, isFiltersOpen: false }));
  };

  return (
    <div className="grid grid-cols-[1fr] md:grid-cols-[330px_1fr] mt-[50px] gap-[35px]">
      <div className="text-left md:block hidden">
        <Filters.Filters />
      </div>{" "}
      <div className="md:hidden flex items-center justify-between header">
        <h2 className="text-2xl font-bold text-gray-800">Mahsulotlar</h2>

        <Icon.Icon
          icon="icon-products-filters"
          size="sm"
          color="var(--color-text-muted)"
          radiusSize={0}
          onClick={() => setState((prev) => ({ ...prev, isFiltersOpen: true }))}
        />
      </div>
      <div className="products grid">
        {isLoading ? (
          <div className="grid place-items-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-text-secondary">
                Mahsulotlar yuklanmoqda...
              </p>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div className="w-[300px] md:w-full grid grid-cols-2 md:grid-cols-3 gap-4">
              {(searchProducts.results ?? searchData.results).map((product) => (
                <Card
                  key={product._id}
                  {...product}
                  isCartLoading={loadingCartItems.has(product._id)} // Pass loading state
                  onClick={handleOpenModal}
                  onCart={handleCart}
                />
              ))}
            </div>{" "}
            <div className="pagination flex items-center justify-start gap-2 md:gap-4 my-5">
              <button
                onClick={() => {
                  const pagination =
                    searchProducts?.pagination ?? searchData?.pagination;
                  if (pagination?.hasPrevPage) {
                    handlePageChange(pagination.currentPage - 1);
                  }
                }}
                disabled={
                  !(searchProducts?.pagination ?? searchData?.pagination)
                    ?.hasPrevPage
                }
                className={`p-2 active:border-2 active:border-primary rounded-md ${
                  !(searchProducts?.pagination ?? searchData?.pagination)
                    ?.hasPrevPage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Icon.Icon
                  icon="icon-down"
                  size="xs"
                  color="var(--color-text-secondary)"
                  radiusSize={0}
                  iconSize="13px"
                  rotate={90}
                  className={
                    !(searchProducts?.pagination ?? searchData?.pagination)
                      ?.hasPrevPage
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </button>
              <div className="flex items-center flex-wrap gap-2">
                {Array.from(
                  {
                    length:
                      (searchProducts?.pagination ?? searchData?.pagination)
                        ?.totalPages || 0,
                  },
                  (_, i) => i + 1
                ).map((page) => {
                  const currentPageFromRedux =
                    (searchProducts?.pagination ?? searchData?.pagination)
                      ?.currentPage || 1;
                  return (
                    <button
                      key={page}
                      className={`px-2 md:px-4 py-1 md:py-2 rounded-md ${
                        page === currentPageFromRedux
                          ? "bg-primary text-bg-primary"
                          : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  const pagination =
                    searchProducts?.pagination ?? searchData?.pagination;
                  if (pagination?.hasNextPage) {
                    handlePageChange(pagination.currentPage + 1);
                  }
                }}
                disabled={
                  !(searchProducts?.pagination ?? searchData?.pagination)
                    ?.hasNextPage
                }
                className={`p-2 active:border-2 active:border-primary rounded-md ${
                  !(searchProducts?.pagination ?? searchData?.pagination)
                    ?.hasNextPage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Icon.Icon
                  icon="icon-down"
                  size="xs"
                  color="var(--color-text-secondary)"
                  radiusSize={0}
                  iconSize="13px"
                  rotate={-90}
                  className={
                    !(searchProducts?.pagination ?? searchData?.pagination)
                      ?.hasNextPage
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </button>
            </div>
          </>
        )}
      </div>
      {isFiltersOpen && (
        <Modal.Modal
          classes="w-[295px]"
          onClose={() => handleClose("filters")}
          type="filters"
        >
          <Filters.Filters onClose={() => handleClose("filters")} />
        </Modal.Modal>
      )}
      {isModalOpen !== null && (
        <Modal.Modal
          classes="w-[300px] md:w-[1050px] h-[600] md:h-[630px]"
          onClose={() => handleClose("product")}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-[35px] h-full">
            <div className="main-image grid place-items-center gap-[10px] w-full md:w-1/2">
              <img
                src={
                  isModalOpen.images.length > 1
                    ? isModalOpen.images[0]
                    : placeholderImages[
                        Math.floor(Math.random() * placeholderImages.length)
                      ]
                }
                alt="product"
                className="rounded-xl w-[340px] md:w-[250px] h-[350px] md:h-auto"
                // width={"350px"}
                // height={"auto"}
              />
              <div className="images hidden md:flex items-center justify-center gap-[17px]">
                {isModalOpen.images.slice(1, 5).map((image, index) => (
                  <img
                    src={
                      image ||
                      placeholderImages[
                        Math.floor(Math.random() * placeholderImages.length)
                      ]
                    }
                    alt="product"
                    height={"80px"}
                    width={"80px"}
                    className="rounded-xl cursor-pointer hover:opacity-80"
                    style={{ filter: "grayscale(500%)" }}
                    key={index}
                    onClick={() => {
                      const newImages = [...isModalOpen.images];
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
                <p className="name font-Poppins font-medium text-2xl md:text-[32px] mb-[5px]">
                  {isModalOpen.name}
                </p>
                <hr />
                <div className="details flex items-start justify-between mt-[15px]">
                  <div className="grid gap-[5px]">
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      ID:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.carPartIds?.join(", ")}
                      </span>
                    </p>
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      Brand:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.producer}
                      </span>
                    </p>
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      Model:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.carModel.join(", ")}
                      </span>
                    </p>
                    {isModalOpen.position && (
                      <p className="text-text-secondary font-Poppins font-medium text-lg">
                        Joylashuvi:{" "}
                        <span className="text-text-muted">
                          {isModalOpen.position}
                        </span>
                      </p>
                    )}{" "}
                  </div>
                  {/* <p className="text-text-muted font-Poppins font-medium text-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </p> */}
                </div>
              </div>

              <div>
                <p className="price font-medium text-2xl mt-[20px]">
                  {isModalOpen.price}
                </p>

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
                    )}{" "}
                  {singleProductCount.length === 0 && (
                    <button
                      className={`w-full h-60px md:h-[90px] bg-primary rounded-[10px] flex items-center justify-center gap-[10px] text-bg-primary ${
                        loadingCartItems.has(isModalOpen?._id || "")
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleCart(isModalOpen?._id)}
                      disabled={loadingCartItems.has(isModalOpen?._id || "")}
                    >
                      <Icon.Icon
                        icon="icon-basket"
                        size="md"
                        color="var(--color-bg-primary)"
                        iconClassName={
                          loadingCartItems.has(isModalOpen?._id || "")
                            ? "animate-pulse"
                            : ""
                        }
                      />
                      <p className="text-2xl font-medium">
                        {loadingCartItems.has(isModalOpen?._id || "")
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

export default Products;
