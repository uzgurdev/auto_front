import { Card } from "components";
import DEMO_PRODUCTS from "demo";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-left mt-5">
      <div className="popular flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Popular</h2>
        <div className="max-w-[950px] flex items-center gap-4 h-[350px] overflow-y-hidden relative">
          {[...DEMO_PRODUCTS.slice(0, 5), { id: 6, title: "more" }].map(
            (product) =>
              product.title !== "more" ? (
                <Card key={product.id} {...product} />
              ) : (
                <div
                  className="min-w-[180px] flex items-center justify-center min-h-[300px]"
                  onClick={() => navigate("/products")}
                >
                  <button className="relative top-[50%] border border-blue-500 rounded-full w-[60px] h-[60px] text-center text-[30px]">
                    &gt;
                  </button>
                </div>
              )
          )}
        </div>
      </div>
      <div className="popular flex flex-col gap-2 mt-5">
        <h2 className="font-bold text-2xl">This Seasons famous products</h2>
        <div className="max-w-[950px] flex items-center gap-4 h-[350px] overflow-y-hidden relative">
          {[...DEMO_PRODUCTS, { id: 6, title: "more", season: "Winter" }]
            .filter((product) => product.season === "Winter")
            .map((product) =>
              product.title !== "more" ? (
                <Card key={product.id} {...product} />
              ) : (
                <div
                  className="min-w-[180px] flex items-center justify-center min-h-[300px]"
                  onClick={() => navigate("/products")}
                >
                  <button className="relative top-[50%] border border-blue-500 rounded-full w-[60px] h-[60px] text-center text-[30px]">
                    &gt;
                  </button>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
