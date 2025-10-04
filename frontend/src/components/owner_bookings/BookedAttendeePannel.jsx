import { ChevronDown, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { acceptBooking, rejectBooking } from "../../api/bookingApi";

const BookedAttendeePannel = ({
  setBookedAttendeePannel,
  setMainScreen,
  bookedAttendeePannel,
  selectedBookingData,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (bookedAttendeePannel) {
      setData(selectedBookingData);
    }
  }, [selectedBookingData, bookedAttendeePannel]);

  const rejectBookingHandler = async () => {
    try {
      const ownerToken = localStorage.getItem("owner_token");
      if (!ownerToken) {
        console.error("No owner token found in localStorage.");
        return;
      }

      const response = await rejectBooking(data?.booking?._id);
      console.log("reject response:", response.data);
      setBookedAttendeePannel(false);
      setMainScreen(false);
    } catch (err) {
      console.error("Reject booking failed:", err?.response ?? err);
    }
  };

  const acceptBookingHandler = () => {
    try {
      const ownerToken = localStorage.getItem("owner_token");
      if (!ownerToken) {
        console.error("No owner token found in localStorage.");
        return;
      }

      const response = acceptBooking(data?.booking?._id);
      console.log("accept response:", response.data);
      setBookedAttendeePannel(false);
      setMainScreen(false);
    } catch (error) {
      console.error("Accept booking failed:", error?.response ?? error);
    }
  };

  const date = new Date(data?.booking?.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className=" bg-neutral-950/60 w-full p-4   rounded-t-4xl backdrop-blur-xl">
      <div className="w-full items-center justify-center flex">
        <ChevronDown
          size={28}
          onClick={() => {
            setBookedAttendeePannel(false);
            setMainScreen(false);
          }}
        />
      </div>

      <div className="flex gap-5 items-center">
        {(data.attendee?.avatar && (
          <img
            src={data.attendee?.avatar}
            alt="avatar"
            className="w-26 h-26 rounded-full object-cover"
          />
        )) ||
          (data.attendee?.name && (
            <div className="w-26 h-26 rounded-full bg-neutral-500 flex items-center justify-center text-4xl font-semibold text-white">
              {data.attendee?.name.charAt(0).toUpperCase()}
            </div>
          ))}

        <div className="">
          <h1 className="text-xl font-semibold ">{data?.attendee?.name}</h1>
          <div className="mt-2 flex items-center gap-3 px-3 bg-neutral-500/50 rounded-full p-2">
            <Phone size={14} />
            <p>{data?.attendee?.phoneNumber}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full gap-3 px-3 py-4">
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Date</h2>
          <h1 className="text-lg font-semibold">{formattedDate}</h1>
        </div>
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Status</h2>
          <h1 className="text-lg font-semibold">
            <span className="bg-amber-400/20 text-amber-400 text-sm px-2 py-1 rounded-full">
              <span>
                {data?.booking?.isConfirmed ? "Confirmed" : "Pending"}
              </span>
            </span>
          </h1>
        </div>
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Payable Amount</h2>
          <h1 className="text-lg font-semibold">
            ₹{data?.booking?.totalAmount || "----"}
          </h1>
        </div>
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Total Guests</h2>
          <h1 className="text-lg font-semibold">
            {data?.booking?.numberOfGuests || "----"}
          </h1>
        </div>
      </div>

      <div className="flex gap-3 items-center justify-evenly px-3">
        <button
          onClick={acceptBookingHandler}
          className="w-full bg-emerald-500 py-2 rounded-full px-1 text-base"
        >
          Confirm Booking
        </button>
        <button
          onClick={rejectBookingHandler}
          className="w-full bg-red-600 py-2 rounded-full px-1 text-base"
        >
          Reject Booking
        </button>
      </div>
    </div>
  );
};

export default BookedAttendeePannel;
