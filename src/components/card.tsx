import { FC, useState } from "react";
import { Minus, Plus } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description?: string;
  image?: string;
  price?: number;
  season?: string;
}

const seasonBg = (season: string) => {
  switch (season) {
    case "Summer":
      return "bg-yellow-300";
    case "Winter":
      return "bg-blue-700";
    case "Autumn":
      return "bg-orange-600";
    case "Spring":
      return "bg-pink-200";
    default:
      return "";
  }
};

const Card: FC<Product> = (Product) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const addToCart = () => {
    setQuantity(1);
    // Here you would typically also update a global cart state or send a request to your backend
  };

  return (
    <div className="w-[250px] border border-gray-200 rounded-2xl shadow-sm">
      <div className="relative rounded-tl-2xl">
        <img
          src={Product.image}
          alt={Product.title}
          className="rounded-t-2xl w-full h-[200px] object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded ${seasonBg(
            Product.season as string
          )}`}
        >
          {Product.season}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {Product.id} - {Product.title}
        </h3>
        <p className="font-bold text-xl mb-3">${Product.price}</p>
        {quantity === 0 ? (
          <button
            onClick={addToCart}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={decrementQuantity}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="font-semibold text-lg">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
