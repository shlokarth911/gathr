import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TopCaterers = ({ topCaterers }) => {
  return (
    <div className="px-7 py-0 mt-9">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-wide">Best Caterers</h2>
        <Link className="text-sm flex gap-1 items-center text-neutral-400 hover:text-white transition-colors">
          See All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Horizontal Scroll */}
      <div className="relative mt-4">
        {/* Subtle blurred scroll hint */}
        <div
          className="absolute z-2 overflow-hidden rounded-full p-1 bg-[#ffffff26] top-1/2 -translate-y-1/2 right-[-5%] shadow-md"
          style={{ backdropFilter: "blur(12px)" }}
        >
          <ArrowRight size={20} className="text-white/70" />
        </div>

        <div
          style={{ scrollbarWidth: "none" }}
          className="flex overflow-x-auto gap-4 flex-nowrap snap-x snap-mandatory scrollbar-hide"
        >
          {topCaterers.map((caterer, idx) => {
            return (
              <div
                key={idx}
                className="w-44 shrink-0 bg-neutral-800/80 rounded-2xl overflow-hidden shadow-lg/50 shadow-black snap-start hover:scale-[1.02] transition-transform"
                style={{ backdropFilter: "blur(10px)" }}
              >
                <img
                  src={caterer.image}
                  alt={caterer.name}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold truncate">
                    {caterer.name}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    ⭐ {caterer.avgRating} • ₹{caterer.price}
                    <span className="text-[10px] text-neutral-500">
                      {" "}
                      /plate
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopCaterers;
