import { Search } from "lucide-react";
import React from "react";

const AttendeeGreetings = () => {
  return (
    <div className="p-6 pt-7">
      <p className="text-2xl font-bold">
        Your next unforgettable <br /> event starts here.
      </p>

      <form action="">
        <div className="mt-7  relative">
          <input
            type="text"
            className="bg-neutral-100 w-full py-3 px-5 rounded-2xl text-lg text-black placeholder:text-neutral-500 shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.08)]"
            placeholder="Search for your venue"
          />
          <button
            type="submit"
            className="absolute top-[50%] right-0 bg-white p-2 transform- translate-y-[-50%] translate-x-[-30%] rounded-full shadow-[0px_10px_20px_0px_rgba(0,_0,_0,_0.15)]"
          >
            <Search color="black" size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendeeGreetings;
