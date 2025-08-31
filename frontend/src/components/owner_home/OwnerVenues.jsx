import { ArrowRight, Plus, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const OwnerVenues = ({ ownedVenues }) => {
  return (
    <div>
      {/* Your Venues */}
      <div className="px-7 py-4 ">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold ">Your Venues</h1>
          <Link className="text-sm text-neutral-400 flex items-center gap-1">
            See All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="pt-7 relative">
          <div
            className="absolute top-1/2 -translate-y-1/2 right-[-5%] bg-neutral-600/20 z-2 overfolw-hidden rounded-full p-2 "
            style={{ backdropFilter: "blur(5px)" }}
          >
            <ArrowRight size={20} className="text-white/70" />
          </div>
          {/* scroll container */}
          <div
            className="flex overflow-x-auto gap-3 snap-x snap-mandatory px-2"
            style={{
              WebkitOverflowScrolling: "touch", // smooth native scrolling on iOS
              scrollSnapType: "x mandatory", // explicit (safe fallback)
            }}
          >
            {/* Card 1 */}
            {ownedVenues.map((venue, idx) => {
              const rating = venue.averageRating;
              let starColor = "#fff";
              {
                if (rating > 4 && rating <= 5) {
                  starColor = "#57e32c";
                } else if (rating > 3 && rating <= 4) {
                  starColor = "#b7dd29";
                } else if (rating > 2 && rating <= 3) {
                  starColor = "#ffe234";
                } else if (rating > 1 && rating <= 2) {
                  starColor = "#ffa534";
                } else if (rating > 0 && rating <= 1) {
                  starColor = "#ff4545";
                } else if (rating === 0) {
                  starColor = "red";
                }
              }

              return (
                <div
                  key={idx}
                  className="rounded-2xl shrink-0 overflow-hidden snap-start w-full  max-w-sm"
                  style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop"
                    alt=""
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4 bg-neutral-950">
                    <div className="flex justify-between">
                      <div>
                        <h1 className="text-lg font-semibold"> {venue.name}</h1>
                        <p className="text-base text-neutral-400">
                          {venue.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Avg. Rating</p>
                        <h1 className="text-xl font-semibold text-right flex items-center gap-1 justify-end">
                          {venue.averageRating}{" "}
                          <Star
                            className="inline"
                            color={starColor}
                            size={16}
                            fill={starColor}
                          />
                        </h1>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <label className="text-sm bg-emerald-700 px-2 py-1 rounded-full">
                        {venue.status}
                      </label>
                      <h1 className="text-xl font-bold">₹{venue.price}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Link to={"/owner/add_venue"}>
          <div className="flex items-center flex-col py-4 rounded-2xl border border-dashed border-neutral-200/40 bg-neutral-800 mt-2">
            <Plus color="#b9b9b9" />
            <h1 className="text-[#b9b9b9]">List a new venue</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OwnerVenues;
