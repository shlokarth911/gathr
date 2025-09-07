import { ChevronDown, Phone } from "lucide-react";
import React from "react";

const BookedAttendeePannel = ({ setBookedAttendeePannel }) => {
  return (
    <div className=" bg-neutral-950/60 w-full p-4   rounded-t-4xl backdrop-blur-xl">
      <div className="w-full items-center justify-center flex">
        <ChevronDown
          size={28}
          onClick={() => {
            setBookedAttendeePannel(false);
          }}
        />
      </div>

      <div className="flex gap-5 items-center">
        <img
          src="https://lh3.googleusercontent.com/Ej74BaoxGgz_NWcUIhnlwlHH_wBBN54vGnzSbalds41OAylbsOxC2BNqJubYYsp_JQkkaD9g4-IKVJQ=w544-h544-l90-rj"
          className="h-26 object-cover border-white/80 border rounded-full"
          alt=""
        />

        <div className="">
          <h1 className="text-xl font-semibold ">Jhon Doe</h1>
          <div className="mt-2 flex items-center gap-3 px-3 bg-neutral-500/50 rounded-full p-2">
            <Phone size={14} />
            <p>9846514612</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full gap-3 px-3 py-4">
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Date</h2>
          <h1 className="text-lg font-semibold">22-02-2023</h1>
        </div>
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Status</h2>
          <h1 className="text-lg font-semibold">
            <span className="bg-amber-400/20 text-amber-400 text-sm px-2 py-1 rounded-full">
              Pending
            </span>
          </h1>
        </div>
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Payable Amount</h2>
          <h1 className="text-lg font-semibold">Rs. 50,000</h1>
        </div>
        <div className="">
          <h2 className="text-sm text-neutral-300/80 ">Total Guests</h2>
          <h1 className="text-lg font-semibold">Rs. 250</h1>
        </div>
      </div>

      <div className="flex gap-3 items-center justify-evenly px-3">
        <button className="w-full bg-gray-500 py-2 rounded-full px-1 text-base">
          Contact Attendee
        </button>
        <button className="w-full bg-red-600 py-2 rounded-full px-1 text-base">
          Request Cancellation
        </button>
      </div>
    </div>
  );
};

export default BookedAttendeePannel;
