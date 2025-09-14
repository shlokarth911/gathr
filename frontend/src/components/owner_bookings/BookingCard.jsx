import React from "react";

const BookingCard = ({ bookings, setBookedAttendeePannel, setMainScreen }) => {
  return (
    <>
      {bookings.map((booking, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center gap-2 bg-neutral-500/20 p-2 rounded-xl relative"
            onClick={() => {
              setBookedAttendeePannel(true);
              setMainScreen(true);
            }}
          >
            {/* Avatar */}
            <img
              src={booking.avatar}
              className="h-20 object-cover rounded-full border border-white/10"
              alt=""
            />

            <div className="h-[100%] relative">
              <h1 className="text-lg font-semibold">{booking.name}</h1>
              <p className="text-sm text-neutral-50/70">{booking.venue}</p>
            </div>

            <div>
              <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                {booking.status}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BookingCard;
