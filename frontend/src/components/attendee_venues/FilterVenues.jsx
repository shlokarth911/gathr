import { ChevronUp } from "lucide-react";
import React from "react";

const FilterVenues = ({ setIsFilterOpen, cities }) => {
  return (
    <div className="p-4 bg-neutral-950/70 rounded-t-2xl backdrop-blur-md border-t border-neutral-800 ">
      <div
        onClick={() => setIsFilterOpen(false)}
        className="flex justify-center items-center w-full"
      >
        <ChevronUp size={28} />
      </div>

      <h1 className="text-2xl  p-2 font-semibold ">Filters</h1>
      <form className="mt-1 p-2 space-y-4 ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              City
            </label>
            <div className="relative">
              <select className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white appearance-none transition">
                <option className="bg-neutral-800" value="">
                  Select City
                </option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-neutral-800">
                    {city}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                ▼
              </span>
            </div>
          </div>
          {/* Price Dropdown */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Price Range (cost per day)
            </label>
            <div className="relative">
              <select className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white appearance-none transition">
                <option className="bg-neutral-800" value="">
                  Select Price Range
                </option>
                <option className="bg-neutral-800" value="0-20000">
                  ₹0 - ₹20,000
                </option>
                <option className="bg-neutral-800" value="20000-100000">
                  ₹20,000 - ₹1,00,000
                </option>
                <option className="bg-neutral-800" value="100000-500000">
                  ₹1,00,000 - ₹5,00,000
                </option>
                <option className="bg-neutral-800" value="500000+">
                  ₹5,00,000+
                </option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                ▼
              </span>
            </div>
          </div>
          {/* Capacity Dropdown */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Capacity
            </label>
            <div className="relative">
              <select className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white appearance-none transition">
                <option className="bg-neutral-800" value="">
                  Select Capacity
                </option>
                <option className="bg-neutral-800" value="0-100">
                  Up to 100 guests
                </option>
                <option className="bg-neutral-800" value="100-300">
                  100 - 300 guests
                </option>
                <option className="bg-neutral-800" value="300-500">
                  300 - 500 guests
                </option>
                <option className="bg-neutral-800" value="500+">
                  500+ guests
                </option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                ▼
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-full bg-emerald-600 focus:ring-emerald-600/30 text-white py-4 rounded-full mt-5"
          type="submit"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterVenues;
