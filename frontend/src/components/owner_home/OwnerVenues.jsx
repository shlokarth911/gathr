import { ArrowRight, Plus, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const OwnerVenues = ({ ownedVenues }) => {
  return (
    <div className="px-7 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Your Venues</h1>
        <Link
          to={"/owner/venues"}
          className="text-sm text-neutral-400 flex items-center gap-1"
        >
          See All <ArrowRight size={18} />
        </Link>
      </div>

      {/* Scroll Container */}
      <div className="pt-7 relative">
        {/* Right Scroll Hint */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-5%] bg-neutral-600/40 z-10 rounded-full p-2 shadow-lg"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <ArrowRight size={20} className="text-white/70" />
        </div>

        <div
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory px-1 scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {/* Venue Cards */}
          {ownedVenues.map((venue, idx) => {
            const rating = venue.averageRating;
            let starColor = "#fff";

            if (rating > 4) starColor = "#57e32c";
            else if (rating > 3) starColor = "#b7dd29";
            else if (rating > 2) starColor = "#ffe234";
            else if (rating > 1) starColor = "#ffa534";
            else if (rating > 0) starColor = "#ff4545";

            return (
              <div
                key={idx}
                className="rounded-2xl shrink-0 overflow-hidden snap-start w-[85%] max-w-sm bg-neutral-900 shadow-md shadow-black/40"
                style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
              >
                <img
                  src={venue.img}
                  alt={venue.name}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-lg font-semibold truncate">
                        {venue.name}
                      </h1>
                      <p className="text-sm text-neutral-400 truncate">
                        {venue.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Avg. Rating</p>
                      <h1 className="text-lg font-semibold flex items-center gap-1 justify-end">
                        {rating.toFixed(1)}{" "}
                        <Star
                          className="inline"
                          color={starColor}
                          size={16}
                          fill={starColor}
                        />
                      </h1>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        venue.status === "Booked"
                          ? "bg-emerald-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {venue.status}
                    </span>
                    <h1 className="text-xl font-bold">₹{venue.price}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA to List New Venue */}
      <Link to="/owner/venues">
        <div className="flex items-center flex-col py-6 mt-6 rounded-2xl border border-dashed border-neutral-500/40 bg-neutral-800/70 hover:bg-neutral-700 transition">
          <Plus color="#b9b9b9" size={24} />
          <h1 className="text-sm mt-2 text-[#b9b9b9] font-medium">
            List a New Venue
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default OwnerVenues;
