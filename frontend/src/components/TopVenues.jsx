import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TopVenues = ({ topPickedVenues }) => {
  return (
    <div className="px-7 py-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Venues</h2>
        <Link className="text-sm flex gap-2 items-center  text-neutral-300 ">
          See All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="relative">
        <div
          className="absolute overflow-hidden rounded-full p-1 bg-[#ffffff2c]  top-[50%] transform -translate-y-1/2 right-[-5%] "
          style={{ backdropFilter: "blur(10px)" }}
        >
          <ArrowRight size={22} />
        </div>
        <div
          style={{ scrollbarWidth: "none" }}
          className="flex overflow-x-auto mt-4 gap-4 flex-nowrap snap-x snap-mandatory scrollbar-hide"
        >
          {topPickedVenues.map((venue, idx) => {
            return (
              <div
                key={idx}
                className="py-2 px-2 bg-neutral-700 flex flex-col rounded-2xl shadow-lg/50 shadow-neutral-600 snap-start shrink-0"
              >
                <img
                  src={venue.image}
                  alt=""
                  className="h-32 w-42 object-cover rounded-2xl shadow-xl/40 shadow-neutral-900"
                />
                <div className="p-2 mt-2">
                  <p className="text-base font-semibold">{venue.name}</p>
                  <p className="text-sm text-neutral-300">{venue.address}</p>
                  <p className="text-lg font-semibold mt-1">
                    ₹{venue.price}{" "}
                    <span className="text-xs text-neutral-300">per guests</span>
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

export default TopVenues;
