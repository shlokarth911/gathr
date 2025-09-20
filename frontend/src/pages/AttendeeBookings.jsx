import { Calendar, Clock, Users } from "lucide-react";
import React from "react";

const AttendeeBookings = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bookings</h1>

        <div>
          <div className="p-2  bg-neutral-800 mt-5 rounded-2xl">
            <img
              src="https://www.aurusjewels.com/cdn/shop/articles/indian_wedding_planning_guide_ultimate.jpg?v=1679913681"
              alt=""
              className="w-full h-60 object-cover rounded-xl "
            />

            <div className="flex  justify-between mt-3 px-1">
              <div className="min-w-[50%] px-1">
                <h2 className="text-xl">Venue Name</h2>
                <p className="text-neutral-400">Address</p>

                <h2 className="mt-2 text-2xl font-semibold">₹10,000</h2>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 max-w-[50%] justify-end">
                <p className="flex items-center gap-2 bg-neutral-200/90 text-black px-2 py-1 rounded-full">
                  <Calendar className="inline" size={18} /> 20th Dec, 2023
                </p>
                <p className="flex items-center gap-2 bg-neutral-200/90 text-black px-2 py-1 rounded-full">
                  <Clock size={18} /> 6:00 PM
                </p>
                <p className="flex items-center gap-2 bg-neutral-200/90 text-black px-2 py-1 rounded-full">
                  <Users size={18} /> 100
                </p>
              </div>
            </div>

            <div className="flex mt-4  justify-between w-full items-center">
              <button className=" bg-transparent border border-neutral-400 text-white px-4 py-2 rounded-full hover:bg-neutral-700 transition-all">
                See Booking Details
              </button>

              <button className=" bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-500 transition-all">
                Request Cancellation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendeeBookings;
