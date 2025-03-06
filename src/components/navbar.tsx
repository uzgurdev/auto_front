import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, ShoppingCart, Phone, ChevronDown } from "lucide-react";

import Logo from "../assets/images/logo.png";
import { Icon } from "./icon";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("uz");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-red shadow-xl h-[120px] w-full">
      <div className="wrapper flex items-center pl-[108px]">
        <Link to="/" className="flex items-center w-[120px] h-[92px]">
          <img
            src={Logo}
            alt="Logo"
            width={120}
            height={92}
            className="h-120 w-auto"
          />
        </Link>
        <div className="right-wrapper flex-col items-center w-full relative">
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
                <span className="text-white">+998 99 999 99 99</span>
              </div>
              <div className="lang relative overflow-visible">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span className="text-white">
                    {currentLang.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`text-white transition-transform ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

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
                          setCurrentLang(lang);
                        }}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bottom-wrapper h-20 pr-[108px] flex gap-5 items-center justify-end">
            <div className="searchbar w-[650px] h-[50px] rounded-[50px] bg-bg-secondary outline-none relative active:text-primary">
              <input
                type="text"
                placeholder="Qidiruv..."
                className="w-full h-full bg-transparent px-[30px] outline-none font-Poppins"
                onFocus={() => setIsSearchActive(true)}
                onBlur={(e) => setIsSearchActive(e.target.value === "")}
              />
              <div className="h-10 w-10 bg-bg-primary rounded-full flex items-center justify-center absolute top-[4px] right-[5px]">
                <Icon
                  icon="icon-search"
                  size="sm"
                  color={
                    isSearchActive
                      ? "var(--color-primary)"
                      : "var(--color-text-secondary)"
                  }
                />
              </div>
            </div>

            <div className="basket bg-bg-secondary hover:bg-bg-tertiary cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
              <Icon
                icon="icon-basket"
                size="sm"
                color="var(--color-text-secondary)"
              />
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
    </nav>
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

export default Navbar;
