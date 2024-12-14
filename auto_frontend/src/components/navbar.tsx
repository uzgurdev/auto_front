import { Link } from "react-router";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar w-full h-[50px] p-4 flex items-center justify-between border">
      <img src={Logo} alt="Logo" className="w-auto h-[50px]" />

      <div className="flex items-center justify-evenly gap-3">
        <Link to="/" className="p-2">
          Home
        </Link>
        <Link to="/products" className="p-2">
          Products
        </Link>
        <button className="p-2 text-white bg-blue-500 rounded-md text-center">
          Cart
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
