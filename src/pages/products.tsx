import { useState } from "react";
import { Card } from "components";
import DEMO_PRODUCTS from "demo";

const Products = () => {
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

  return (
    <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr] mt-5">
      <div className="filters text-left">
        <h2 className="text-bold text-[22px] mb-2">Filters: </h2>
        <div className="search flex gap-3 p-3 pt-0">
          <input
            type="text"
            placeholder="Search..."
            className="border outline-none p-2 rounded w-[220px]"
          />
          <button className="bg-blue-500 text-white p-2 rounded w-full">
            Search
          </button>
        </div>

        <div className="grid gap-[5px] p-3 pt-0">
          <h3 className="text-bold text-[16px] mb-1">Sort by:</h3>
          <select className="border outline-none p-2 rounded w-[220px]">
            <option value="default">Default</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="grid gap-[5px] mt-3 p-3 pt-0">
          <h3 className="text-bold text-[16px] mb-1">Sort by Season:</h3>
          <div className="flex gap-1">
            <input type="checkbox" id="summer" name="summer" />
            <label htmlFor="summer">Summer</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" id="fall" name="fall" />
            <label htmlFor="fall">Autumn</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" id="winter" name="winter" />
            <label htmlFor="winter">Winter</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" id="spring" name="spring" />
            <label htmlFor="spring">Spring</label>
          </div>
        </div>
      </div>
      <div className="products grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_PRODUCTS.slice(startIdx, endIdx).map((product) => (
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
              { length: Math.ceil(DEMO_PRODUCTS.length / 5) },
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
