import { useState } from "react";

interface FiltersProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  onSeasonFilter: (seasons: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({
  onSearch,
  onSort,
  onSeasonFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSeasonChange = (season: string) => {
    const updatedSeasons = selectedSeasons.includes(season)
      ? selectedSeasons.filter((s) => s !== season)
      : [...selectedSeasons, season];
    setSelectedSeasons(updatedSeasons);
    onSeasonFilter(updatedSeasons);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Filters</h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search
          </label>
          <div className="flex w-[250px]">
            <input
              type="text"
              id="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-2 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <div>
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Sort by
        </label>
        <select
          id="sort"
          onChange={(e) => onSort(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Filter by Season
        </h3>
        <div className="space-y-2">
          {["Summer", "Autumn", "Winter", "Spring"].map((season) => (
            <label key={season} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={season.toLowerCase()}
                checked={selectedSeasons.includes(season)}
                onChange={() => handleSeasonChange(season)}
                className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-gray-700">{season}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
