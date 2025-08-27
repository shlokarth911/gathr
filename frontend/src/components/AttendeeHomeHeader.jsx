import { UserRound } from "lucide-react";
import React from "react";

const AttendeeHomeHeader = () => {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="bg-white p-2 rounded-full">
          <UserRound color="black" size={20} />
        </div>
        <h3 className="text-base font-semibold">Hi, Alex</h3>
      </div>
      {/* <div></div> Add notifications pannel */}
    </div>
  );
};

export default AttendeeHomeHeader;
