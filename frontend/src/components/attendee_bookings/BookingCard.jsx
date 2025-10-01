import { Calendar, Clock, Users } from "lucide-react";
import React from "react";

const BookingCard = ({ booking, venue }) => {
  console.log(booking);
  console.log(venue);

  return (
    <>
      <div>
        <div className="p-2  bg-neutral-800 mt-5 rounded-4xl">
          <img
            src={venue.images[0].url}
            alt=""
            className="w-full h-48 object-cover rounded-t-3xl "
          />

          <div className="flex  justify-between mt-3 px-1">
            <div className="min-w-[50%] px-1">
              <h2 className="text-xl font-semibold">{booking.event}</h2>

              <p className="text-neutral-400">{venue.name}</p>

              <h2 className="mt-2 text-2xl font-semibold">
                {booking?.totalPrice || "---"}
              </h2>
            </div>

            <div className="mt-3  gap-2 max-w-[50%] flex flex-wrap justify-end ">
              <p className="flex items-center gap-2 bg-neutral-200/90 text-black px-2 py-1 rounded-full text-sm">
                <Calendar className="inline" size={18} />{" "}
                {new Date(booking.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="flex items-center gap-2 bg-neutral-200/90 text-black px-2 py-1 rounded-full text-sm">
                <Clock size={18} /> {booking.time || "---"}
              </p>
              <p className="flex items-center gap-2 bg-neutral-200/90 text-black px-2 py-1 rounded-full text-sm">
                <Users size={18} /> {booking.numberOfGuests}
              </p>
            </div>
          </div>

          <div className="flex mt-4 gap-2  justify-center w-full items-center">
            <button className=" bg-transparent border border-neutral-400 text-white px-4 py-2 rounded-full hover:bg-neutral-700 transition-all  text-sm">
              See Booking Details
            </button>

            <button className=" bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-500 transition-all text-sm">
              Request Cancellation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
