import React from "react";
import { Link } from "react-router-dom";

const CategoriesSection = ({ categories }) => {
  return (
    <div className="p-7 pt-3 relative">
      <div className="flex items-center justify-between pr-2">
        <h2 className="text-lg font-semibold ">Categories</h2>

        <Link className="text-sm underline text-neutral-300">See all</Link>
      </div>
      <div className="relative">
        <div className="absolute top-0 h-full w-[9%] bg-neutral-900 z-2 blur-xs right-[-8%]"></div>
        <div className="absolute top-0 h-full w-[3%] bg-neutral-900 z-2 blur-xs left-[-2%]"></div>
        <div
          className="py-2 flex w-full overflow-x-auto gap-4 relative"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-nowrap items-center gap-2 px-3 py-3 font-semibold rounded-2xl bg-neutral-600  flex-shrink-0 "
              >
                {/* //icons */}
                {category.icon && <category.icon size={20} />}
                <p className="inline-block text-sm">{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
