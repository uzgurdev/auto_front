import { useState, useRef, useEffect } from "react";
import Card from "./card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description?: string;
  image?: string;
  price?: number;
  season?: string;
}

interface CarouselProps {
  products: Product[];
  onViewAll: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ products, onViewAll }) => {
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

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -250 : 250;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative max-w-[950px]">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        onScroll={checkScroll}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0">
            <Card {...product} />
          </div>
        ))}
        <div className="flex-shrink-0 w-[250px] flex items-center justify-center">
          <button
            onClick={onViewAll}
            className="w-full h-12 px-6 text-blue-600 transition-colors duration-150 border border-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-50 focus:outline-none"
          >
            View All
          </button>
        </div>
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
