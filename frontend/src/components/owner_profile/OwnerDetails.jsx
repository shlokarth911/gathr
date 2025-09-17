import { Star } from "lucide-react";
import React, { useContext } from "react";
import { OwnerDataContext } from "../../contexts/OwnerContext";

const OwnerDetails = () => {
  const { owner } = useContext(OwnerDataContext);

  return (
    <div className="p-5">
      <div className="flex items-center justify-center ">
        <img
          className="h-32 w-32  object-cover rounded-full"
          src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
          alt=""
        />
      </div>

      <div className="bg-neutral-700/30 rounded-2xl p-5 mt-4 flex flex-col gap-4">
        <div>
          <h2 className="text-sm text-neutral-400">Name </h2>
          <h1 className="text-xl ">{owner?.name || "Not Defined"}</h1>
        </div>

        <div>
          <h2 className="text-sm text-neutral-400">Email</h2>
          <h1 className="text-xl ">{owner?.email || "Not Defined"}</h1>
        </div>

        <div>
          <h2 className="text-sm text-neutral-400">Phone</h2>
          <h1 className="text-xl ">{owner?.phoneNumber || "Not Defined"}</h1>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
