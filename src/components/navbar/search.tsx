import React, { ChangeEvent, useRef, useState } from "react";
import { useOutsideClickHandler } from "hooks";
import { useTranslation } from "../../lang";

import { Card, Icon, Modal } from "components";
import { Link, useNavigate } from "react-router";
import { Store } from "store";
import { UIActions } from "store/slices";
import { ProductsApi } from "modules";

const Search = ({ languages }: { languages: string }) => {
  const { t } = useTranslation(languages as any);
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [{ isModalOpen, data }, setState] = useState({
    isModalOpen: null as null | any,
    data: null as null | any,
  });

  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef, () => {
    setIsSearchActive(false);
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const match = e.target.value.toLocaleLowerCase();

    setValue(match);

    if (match.length < 2) {
      setResults([]);
      setState((prev) => ({ ...prev, data: null }));
      return;
    }
    try {
      const { data } = await ProductsApi.Api.search(
        `query=${encodeURIComponent(match)}`
      );
      console.log("Navbar search results:", data);
      console.log("Search match term:", match);
      setState((prev) => ({ ...prev, data }));
      const newProducts = data.results.map((product) => {
        const word = product.name.toLowerCase();
        const isMatch = word.includes(match);

        if (isMatch === true) {
          const beforeMatch = word.slice(0, word.indexOf(match)),
            matchedWord = `<span class='text-primary'>${word.slice(
              word.indexOf(match),
              word.indexOf(match) + match.length
            )}</span>`,
            afterMatch = word.slice(word.indexOf(match) + match.length);
          const fullTitle = beforeMatch + matchedWord + afterMatch;

          return {
            ...product,
            title: fullTitle.slice(0, 1).toUpperCase() + fullTitle.slice(1),
          };
        }

        // Return product as-is if no name match but it's in search results
        return product;
      });

      console.log("Processed newProducts:", newProducts);
      setResults(newProducts);
    } catch (error) {
      console.error("Error searching products:", error);
      setResults([]);
    }
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isModalOpen: null }));
  };

  const handleOpenModal = (id: string) => {
    const product = results.filter((p) => p._id === id)[0];

    setState((prev) => ({
      ...prev,
      isModalOpen: {
        ...product,
        title: product.title
          ? product.title.replace(/<[^>]+>/g, "")
          : product.name,
        originalPrice: product.price,
        count: 1,
      },
    }));
  };

  const handleCart = (id: string) => {
    const productIdx = results.findIndex((p) => p._id === id);

    if (productIdx === -1) return;

    Store.dispatch(
      UIActions.addToCart(
        isModalOpen !== null
          ? isModalOpen
          : {
              ...results[productIdx],
              title:
                results[productIdx].title?.replace(/<[^>]+>/g, "") ||
                results[productIdx].name,
              originalPrice: results[productIdx].price,
              count: 1,
            }
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (results.length <= 0) {
        // Even if no dropdown results, still allow search
        console.log("No dropdown results, but performing search for:", value);
      }
      setIsSearchActive(false);
      console.log("Navbar search data:", data);

      // Dispatch search data to Redux store with proper structure
      if (data && data.results) {
        Store.dispatch(
          UIActions.setSearchProducts({
            results: data.results,
            pagination: data.pagination,
          })
        );
      }
      navigate(`/${languages}/products?q=${encodeURIComponent(value)}`);
      setResults([]);
      setValue(""); // Clear search input
    }
  };

  return (
    <div ref={wrapperRef}>
      <div
        className={`searchbar w-[200px] md:w-[650px] h-[50px] rounded-[50px] outline-none relative ${
          !isSearchActive
            ? "bg-bg-secondary"
            : "bg-bg-primary border border-bg-secondary"
        }`}
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          placeholder="Qidiruv..."
          className="w-[300px] md:w-full h-full bg-transparent px-[30px] outline-none font-Poppins"
          onFocus={(e) => setIsSearchActive(true)}
          onChange={onChange}
          value={value}
        />{" "}
        <div className="h-10 w-10 bg-bg-primary rounded-full flex items-center justify-center absolute top-[4px] right-[5px] cursor-pointer">
          <Icon.Icon
            icon="icon-search"
            size="sm"
            color={
              isSearchActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)"
            }
            onClick={() => {
              if (value.trim()) {
                // Trigger search when clicking search icon
                handleKeyDown({
                  key: "Enter",
                } as React.KeyboardEvent<HTMLInputElement>);
              } else {
                setIsSearchActive(true);
              }
            }}
          />
        </div>
      </div>{" "}
      {isSearchActive && results.length > 0 && (
        <div className="search_results w-[650px] h-[460px] absolute left-[37%] top-[90%] rounded-[20px] bg-bg-primary shadow-sm py-[10px] px-[15px]">
          {" "}
          <div className="header w-full border-b-2 border-text-secondary p-[5px] text-text-secondary mb-[5px]">
            {t("search.total_found", {
              count: data?.pagination?.totalItems || results.length,
            })}
          </div>
          <div className="results w-full overflow-y-auto no-scrollbar flex items-center justify-start gap-[10px] mt-[15px]">
            {results.map(
              (product: any) =>
                product !== null && (
                  <Card
                    key={product._id}
                    {...product}
                    onClick={handleOpenModal}
                    onCart={handleCart}
                  />
                )
            )}
          </div>{" "}
          <div className="footer w-full grid place-items-center text-primary underline mt-5">
            <Link to={`/${languages}/products?q=${encodeURIComponent(value)}`}>
              {t("search.view_more")}
            </Link>
          </div>
        </div>
      )}
      {isModalOpen !== null && (
        <Modal.Modal classes="w-[1050px] h-[600px]" onClose={handleClose}>
          <div className="flex items-center justify-center gap-[35px]">
            <div className="main-image grid place-items-center gap-[10px] w-1/2">
              <img
                src={
                  isModalOpen.images.length > 0
                    ? isModalOpen.images[0]
                    : "https://placehold.co/450x450"
                }
                alt="product"
                className="rounded-xl"
                width={"350px"}
                height={"auto"}
              />
              <div className="images flex items-center justify-center gap-[17px]">
                {isModalOpen.images.slice(1, 5).map((image, index) => (
                  <img
                    src={image || "https://placehold.co/100x100"}
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
            <div className="content w-1/2 h-full flex flex-col justify-between">
              <div>
                {" "}
                <p className="name font-Poppins font-medium text-[32px] mb-[5px]">
                  {isModalOpen.title
                    ? isModalOpen.title.replace(/<[^>]+>/g, "")
                    : isModalOpen.name}
                </p>
                <hr />
                <div className="details flex items-start justify-between mt-[15px]">
                  <div className="grid gap-[5px]">
                    <p className="text-text-secondary font-Poppins font-medium text-lg">
                      ID:{" "}
                      <span className="text-text-muted">
                        {isModalOpen.carPartIds}
                      </span>
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

                <div className="action w-full mt-[10px]">
                  {" "}
                  <button
                    className="w-full h-[90px] bg-primary rounded-[10px] flex items-center justify-center gap-[10px] text-bg-primary"
                    onClick={() => handleCart(isModalOpen._id)}
                  >
                    <Icon.Icon
                      icon="icon-basket"
                      size="md"
                      color="var(--color-bg-primary)"
                    />
                    <p className="text-2xl font-medium">Savatga</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Modal>
      )}
    </div>
  );
};

export default Search;
