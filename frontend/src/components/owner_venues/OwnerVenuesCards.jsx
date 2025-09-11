import { Star } from "lucide-react";
import React from "react";

const OwnerVenuesCards = ({ ownedVenues, setIsOwnerVenueDetalsOpen }) => {
  return (
    <div
      onClick={() => {
        setIsOwnerVenueDetalsOpen(true);
      }}
      className="w-full flex flex-col gap-5"
    >
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
            className="rounded-2xl shrink-0 overflow-hidden  bg-neutral-800/90 shadow-md shadow-black/40"
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
  );
};

export default OwnerVenuesCards;
