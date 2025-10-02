import React from "react";

const BookingCard = ({ data, onClick }) => {
  if (!data) return null;

  return (
    <div
      className="flex items-center gap-2 bg-neutral-500/20 p-2 rounded-xl relative"
      onClick={(e) => {
        // stop parent click from closing the panel immediately
        if (e && e.stopPropagation) e.stopPropagation();
        if (typeof onClick === "function") onClick(e);
      }}
    >
      {/* Avatar */}
      <img
        src={data.avatar}
        className="h-20 object-cover rounded-full border border-white/10"
        alt=""
      />

      <div className="h-[100%] relative">
        <h1 className="text-lg font-semibold">{data.attendee?.name}</h1>
        <p className="text-sm text-neutral-50/70">{data.booking?.event}</p>
      </div>

      <div>
        <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-1 rounded-full">
          {data.booking?.isConfirmed ? "Confirmed" : "Pending"}
        </span>
      </div>
    </div>
  );
};

export default BookingCard;
