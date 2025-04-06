import React, { ChangeEvent, useRef, useState } from "react";
import { useOutsideClickHandler } from "hooks";

import DEMO_PRODUCTS from "demo";
import { Card, Icon, Modal } from "components";
import { Link } from "react-router";
import { Store } from "store";
import { UIActions } from "store/slices";

const Search = ({ languages }: { languages: string }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [{ isModalOpen }, setState] = useState({
    isModalOpen: null as null | any,
  });

  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef, () => {
    setIsSearchActive(false);
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const match = e.target.value.toLocaleLowerCase();

    setValue(match);

    const newProducts = DEMO_PRODUCTS.map((product) => {
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

        console.log({
          ...product,
          title: fullTitle.replace(/\b\w/g, (letter) => letter.toUpperCase()),
        });

        return {
          ...product,
          title: fullTitle.slice(0, 1).toUpperCase() + fullTitle.slice(1),
        };
      }

      return null;
    });

    setResults(match === "" ? [] : newProducts.filter((newP) => newP !== null));
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isModalOpen: null }));
  };

  const handleOpenModal = (id: number) => {
    const product = results.filter((p) => p.id === id)[0];

    setState((prev) => ({
      ...prev,
      isModalOpen: {
        id: product.id,
        image: product.image,
        title: product.title.replace(/<[^>]+>/g, ""),
        brand: product.brand,
        price: product.price,
        originalPrice: product.price,
        count: 1,
      },
    }));
  };

  const handleCart = (id: number) => {
    const productIdx = results.findIndex((p) => p.id === id);

    if (productIdx === -1) return;

    Store.dispatch(
      UIActions.addToCart(
        isModalOpen !== null
          ? isModalOpen
          : {
              ...results[productIdx],
              title: results[productIdx].replace(/<[^>]+>/g, ""),
              originalPrice: results[productIdx].price,
              count: 1,
            }
      )
    );
  };

  return (
    <div ref={wrapperRef}>
      <div
        className={`searchbar w-[650px] h-[50px] rounded-[50px] outline-none relative ${
          !isSearchActive
            ? "bg-bg-secondary"
            : "bg-bg-primary border border-bg-secondary"
        }`}
      >
        <input
          type="text"
          placeholder="Qidiruv..."
          className="w-full h-full bg-transparent px-[30px] outline-none font-Poppins"
          onFocus={(e) => setIsSearchActive(true)}
          onChange={onChange}
          value={value}
        />
        <div className="h-10 w-10 bg-bg-primary rounded-full flex items-center justify-center absolute top-[4px] right-[5px]">
          <Icon.Icon
            icon="icon-search"
            size="sm"
            color={
              isSearchActive
                ? "var(--color-primary)"
                : "var(--color-text-secondary)"
            }
            onClick={() => setIsSearchActive(true)}
          />
        </div>
      </div>

      {isSearchActive && results.length > 0 && (
        <div className="search_results w-[650px] h-[460px] absolute left-[37%] top-[90%] rounded-[20px] bg-bg-primary shadow-sm py-[10px] px-[15px]">
          <div className="header w-full border-b-2 border-text-secondary p-[5px] text-text-secondary mb-[5px]">
            Umumiy 24 ta mahsulot topildi
          </div>

          <div className="results w-full flex items-center justify-start gap-[10px] mt-[15px]">
            {results
              .slice(0, 3)
              .map(
                (product: any) =>
                  product !== null && (
                    <Card
                      {...product}
                      onClick={handleOpenModal}
                      onCart={handleCart}
                    />
                  )
              )}
          </div>

          <div className="footer w-full grid place-items-center text-primary underline">
            <Link to={`/${languages}`}>Ko'proq</Link>
          </div>
        </div>
      )}

      {isModalOpen !== null && (
        <Modal.Modal classes="w-[1050px] h-[600px]" onClose={handleClose}>
          <div className="flex items-center justify-center gap-[35px]">
            <div className="images grid place-items-center gap-[10px]">
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
                  // src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/e42168184493025.655f2a66992bd.png"
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
            <div className="content">
              <p className="title font-Poppins font-medium text-[32px] mb-[5px]">
                Cobalt Amartizator oldi chap taraf
              </p>
              <hr />
              <div className="details flex items-start justify-between mt-[15px]">
                <div className="grid gap-[5px]">
                  <p className="text-text-secondary font-Poppins font-medium text-lg">
                    ID: <span className="text-text-muted">UID8876</span>
                  </p>
                  <p className="text-text-secondary font-Poppins font-medium text-lg">
                    Brand: <span className="text-text-muted">Donix</span>
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

              <p className="price font-medium text-2xl mt-[160px]">$123.00</p>

              <div className="action w-full mt-[10px]">
                <button
                  className="w-full h-[90px] bg-primary rounded-[10px] flex items-center justify-center gap-[10px] text-bg-primary"
                  onClick={() => handleCart(isModalOpen.id)}
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
        </Modal.Modal>
      )}
    </div>
  );
};

export default Search;
