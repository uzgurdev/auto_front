import { useState, useRef, useEffect } from "react";
import Card from "./card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeApi } from "modules";

interface CarouselProps {
  products: HomeApi.Types.IHome.Recs.IProducts[];
  onViewAll: () => void;
  currentCategory: string; // Add currentCategory prop
  onOpenModal?: (id: string) => void;
  onCart?: (id: string) => void;
  loadingCartItems?: Set<string>; // Add loading state prop
}

const Carousel: React.FC<CarouselProps> = ({
  products,
  onViewAll,
  currentCategory,
  onOpenModal,
  onCart,
  loadingCartItems,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (currentCategory !== "all") {
      const firstProductIndex = products.findIndex(
        (product) => product.category === currentCategory
      );
      if (container && firstProductIndex !== -1) {
        const firstProductElement = container.children[
          firstProductIndex
        ] as HTMLElement;
        if (firstProductElement) {
          container.scrollTo({
            left: firstProductElement.offsetLeft,
            behavior: "smooth",
          });
        }
      }
    } else {
      if (container) {
        const firstProductElement = container.children[0] as HTMLElement;
        if (firstProductElement) {
          container.scrollTo({
            left: firstProductElement.offsetLeft,
            behavior: "smooth",
          });
        }
      }
    }
  }, [currentCategory, products]);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -250 : 250;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  console.log("Carousel products:", products);

  return (
    <div className="relative max-w-full h-max">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        onScroll={checkScroll}
      >
        {" "}
        {products.map(({ product }) => (
          <div key={product._id} className="flex-shrink-0">
            <Card
              {...product}
              _id={product._id} // Map _id to _id for Card component compatibility
              isCartLoading={loadingCartItems?.has(product._id)} // Pass loading state
              onCart={onCart ? () => onCart(product._id) : () => {}}
              onClick={onOpenModal ? () => onOpenModal(product._id) : () => {}}
            />
          </div>
        ))}
      </div>
      {canScrollLeft && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {canScrollRight && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
