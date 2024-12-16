import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, ShoppingCart } from "lucide-react";

import Logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Your Brand
              </span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/products">Products</MobileNavLink>
            <div className="mt-4 px-4">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => navigate('/cart')}>
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
