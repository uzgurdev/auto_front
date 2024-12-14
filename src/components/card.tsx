import { FC } from "react";

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
  // switch (season) {
  //   case "Summer":
  //     return "bg-gradient-to-r from-yellow-400 to-green-400";
  //   case "Winter":
  //     return "bg-gradient-to-r from-blue-500 to-purple-600";
  //   case "Autumn":
  //     return "bg-gradient-to-r from-pink-500 to-red-500";
  //   case "Spring":
  //     return "bg-gradient-to-r from-green-500 to-blue-500";
  //   default:
  //     return "";
  // }
};

const Card: FC<Product> = (Product) => {
  return (
    <div className="max-w-[250px] border rounded-2xl">
      <div className="relative rounded-tl-2xl">
        <img
          src={Product.image}
          alt={Product.title}
          className="rounded-tl-2xl"
        />
        <div
          className={`absolute top-0 right-0 p-2 text-white ${seasonBg(
            Product.season as string
          )}`}
        >
          {Product.season}
        </div>
      </div>
      <div className="p-4">
        <h3>
          {Product.id} - {Product.title}
        </h3>
        {/* <p className="text-ellipsis">{Product.description}</p> */}
        <p>${Product.price}</p>
        <button className="w-full h-[30px] text-white bg-blue-500 rounded-lg mt-3 hover:bg-blue-600 active:bg-blue-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
