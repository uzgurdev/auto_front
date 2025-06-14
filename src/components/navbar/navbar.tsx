import { memo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "../../lang";

import { Store } from "store";
import { UIActions } from "store/slices";
import { RootState } from "store/store";

import Logo from "../../assets/images/logo.png";
import { Icon } from "../icon";
import Search from "./search";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { languages, productsCountInCart } = useSelector(
    (state: RootState) => state.ui
  );
  const { t } = useTranslation(languages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-red shadow-xl h-[120px] w-full">
      <div className="wrapper flex items-center pl-[108px] bg-bg-primary">
        <Link
          to={`/${languages}`}
          className="flex items-center w-[120px] h-[92px]"
        >
          <img
            src={Logo}
            alt="Logo"
            width={120}
            height={92}
            className="h-120 w-auto"
          />
        </Link>
        <div className="right-wrapper flex-col items-center w-full relative z-40">
          <div className="absolute inset-0 h-10 bg-primary clip-path-diagonal -z-10"></div>
          <div className="highlighted-top bg-transparent h-10 w-full shadow-none shadow-transparent flex items-center justify-end pr-[108px] font-Poppins font-[400] overflow-visible">
            <div className="wrapper flex items-center gap-10 w-[265px] text-sm">
              <div className="phone h-7 w-auto flex gap-[10px] items-center">
                <Icon
                  icon="icon-phone"
                  className="h-7 w-7"
                  iconSize="sm"
                  color="var(--color-text-primary-light)"
                />
                <a href="tel:+998999999999" className="text-white">
                  +998 99 999 99 99
                </a>
              </div>
              <div className="lang relative overflow-visible">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span className="text-white">{languages.toUpperCase()}</span>
                  <ChevronDown
                    className={`text-white transition-transform ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>{" "}
                {isLangOpen && (
                  <div className="lang_drop-down absolute top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    {["uz", "ru", "en"].map((lang) => (
                      <Link
                        key={lang}
                        to={`/${lang}${location.pathname.replace(
                          /^\/[a-z]{2}/,
                          ""
                        )}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsLangOpen(false);
                          Store.dispatch(
                            UIActions.setLanguage(lang as "uz" | "ru" | "en")
                          );
                        }}
                      >
                        {t(`header.languages.${lang}` as any)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bottom-wrapper h-20 pr-[108px] flex gap-5 items-center justify-end">
            <Search {...{ languages }} />

            <div className="basket relative bg-bg-secondary hover:bg-bg-tertiary cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
              <Icon
                icon="icon-basket"
                size="sm"
                color="var(--color-text-secondary)"
                onClick={() => navigate(`/${languages}/cart`)}
              />
              <span className="absolute top-[-5px] right-[-5px] w-[20px] h-[20px] bg-primary rounded-full box-border grid place-items-center text-bg-primary text-[10px]">
                {productsCountInCart}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/products">Products</MobileNavLink>
            <div className="mt-4 px-4">
              <button
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
  >
    {children}
  </Link>
);

export default memo(Navbar);
