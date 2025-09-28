import React, { useContext } from "react";
import { AttendeeDataContext } from "../../contexts/AttendeeContext";

const AttendeeDetails = () => {
  const { attendee } = useContext(AttendeeDataContext);

  return (
    <div className="p-5">
      <div className="flex items-center justify-center ">
        <div className="h-32 w-32 bg-gray-950 rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold">
            {attendee?.name?.[0]?.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="bg-neutral-700/30 rounded-2xl p-5 mt-4 flex flex-col gap-4">
        <div>
          <h2 className="text-sm text-neutral-400">Name </h2>
          <h1 className="text-xl ">{attendee?.name || "Not Defined"}</h1>
        </div>

        <div>
          <h2 className="text-sm text-neutral-400">Email</h2>
          <h1 className="text-xl ">{attendee?.email || "Not Defined"}</h1>
        </div>

        <div>
          <h2 className="text-sm text-neutral-400">Phone</h2>
          <h1 className="text-xl ">
            {attendee?.phoneNumber || "--- --- ----"}
          </h1>
        </div>
        <div>
          <h2 className="text-sm text-neutral-400">City</h2>
          <h1 className="text-xl ">{attendee?.city || "Not Defined"}</h1>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
