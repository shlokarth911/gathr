import React from "react";
import { Star } from "lucide-react";

const OwnerVenuesCards = ({
  venuesData = [],
  onCardClick = () => {},
  selectedVenueID,
}) => {
  if (!Array.isArray(venuesData)) return null;

  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      ref={null}
    >
      {venuesData.map((venue, idx) => {
        const id = venue?._id ?? venue?.id ?? idx;
        const rating = Number(venue?.averageRating ?? 0);
        let starColor = "#fff";
        if (rating > 4) starColor = "#57e32c";
        else if (rating > 3) starColor = "#b7dd29";
        else if (rating > 2) starColor = "#ffe234";
        else if (rating > 1) starColor = "#ffa534";
        else if (rating > 0) starColor = "#ff4545";

        // img can be an object or a string; handle both
        const imgUrl =
          typeof venue?.img === "string"
            ? venue.img
            : venue?.img?.url ?? venue?.img?.secure_url ?? "";

        return (
          <button
            key={id}
            onClick={() => onCardClick(id)}
            className={`rounded-2xl shrink-0 overflow-hidden bg-neutral-800/90 shadow-md shadow-black/40 text-left ${
              selectedVenueID === id ? "ring-2 ring-primary-500" : ""
            }`}
            style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
          >
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={venue?.name}
                className="h-44 w-full object-cover"
              />
            ) : (
              <div className="h-44 w-full bg-neutral-700 flex items-center justify-center text-sm text-neutral-300">
                No image
              </div>
            )}

            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-lg font-semibold truncate">
                    {venue?.name}
                  </h1>
                  <p className="text-sm text-neutral-400 truncate">
                    {venue?.address}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-400">Avg. Rating</p>
                  <h1 className="text-lg font-semibold flex items-center gap-1 justify-end">
                    {(rating || 0).toFixed(1)}{" "}
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
                    venue?.status === "Booked"
                      ? "bg-emerald-600 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {venue?.status ?? "Unknown"}
                </span>
                <h1 className="text-xl font-bold">₹{venue?.price ?? "—"}</h1>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default OwnerVenuesCards;
