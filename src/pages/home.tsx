import { useNavigate } from "react-router";
import { Card, Carousel } from "components";
import DEMO_PRODUCTS from "demo";

const Home = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <div className="text-left mt-5">
      <div className="popular flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Popular</h2>
        <Carousel
          products={DEMO_PRODUCTS.slice(0, 5)}
          onViewAll={handleViewAll}
        />
      </div>
      <div className="popular flex flex-col gap-2 mt-5">
        <h2 className="font-bold text-2xl">This Seasons famous products</h2>
        <Carousel
          products={DEMO_PRODUCTS.filter(
            (product) => product.season === "Winter"
          )}
          onViewAll={handleViewAll}
        />
      </div>
    </div>
  );
};

export default Home;
