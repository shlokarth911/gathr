import React from "react";

const BookingCard = ({ data, onClick, setSelectedBookingData }) => {
  if (!data) return null;

  return (
    <div
      className="flex items-center gap-2 bg-neutral-500/20 p-4 rounded-xl relative"
      onClick={(e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (typeof setSelectedBookingData === "function")
          setSelectedBookingData(data);
        if (typeof onClick === "function") onClick(e);
      }}
    >
      {/* Avatar */}
      {(data.attendee?.avatar && (
        <img
          src={data.attendee?.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
      )) ||
        (data.attendee?.name && (
          <div className="w-16 h-16 rounded-full bg-neutral-950 flex items-center justify-center text-xl font-semibold text-white">
            {data.attendee?.name.charAt(0).toUpperCase()}
          </div>
        ))}

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
