import { useState } from "react";
import { Card, Filters } from "components";
import DEMO_PRODUCTS from "demo";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(DEMO_PRODUCTS);
  const [{ startIdx, endIdx, currentPage }, setState] = useState({
    startIdx: 0,
    endIdx: 5,
    currentPage: 1,
  });

  const handlePageChange = (page: number) => {
    if (currentPage === page || page < 1) return;
    setState({
      startIdx: (page - 1) * 5,
      endIdx: page * 5,
      currentPage: page,
    });
  };

  const handleSearch = (query: string) => {
    const filtered = DEMO_PRODUCTS.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (sortBy: string) => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        sorted.sort((a, b) => a.id - b.id);
        break;
      default:
        sorted = DEMO_PRODUCTS;
    }
    setFilteredProducts(sorted);
  };

  const handleSeasonFilter = (seasons: string[]) => {
    if (seasons.length === 0) {
      setFilteredProducts(DEMO_PRODUCTS);
    } else {
      const filtered = DEMO_PRODUCTS.filter((product) =>
        seasons.includes(product.season || "")
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr] mt-5 gap-4">
      <div className="text-left">
        <Filters
          onSearch={handleSearch}
          onSort={handleSort}
          onSeasonFilter={handleSeasonFilter}
        />
      </div>
      <div className="products grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.slice(startIdx, endIdx).map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
        <div className="pagination flex items-center justify-center gap-4 my-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={startIdx === 0}
            className="p-2 border border-blue-500 rounded-md disabled:border-gray-400 disabled:text-white disabled:bg-slate-500"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / 5) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md ${
                  page === Math.ceil((startIdx + endIdx) / 5) ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIdx >= DEMO_PRODUCTS.length}
            className="p-2 border border-blue-500 rounded-md disabled:border-gray-400 disabled:text-white disabled:bg-slate-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
