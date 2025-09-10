import { Pencil, Star } from "lucide-react";
import React from "react";
import OwnerProfileHeader from "../components/owner_profile/OwnerProfileHeader";
import OwnerDetails from "../components/owner_profile/OwnerDetails";

const OwnerProfile = () => {
  return (
    <>
      {/* Header */}
      <OwnerProfileHeader />

      {/* Owner Details */}
      <OwnerDetails />

      {/* Owner stats */}
      <div className="p-6 pt-0 grid grid-cols-3 gap-4">
        <div className="py-2   text-center rounded-xl bg-neutral-700/30">
          <h3 className="text-sm text-neutral-400">Stat</h3>
          <h1 className="text-2xl font-semibold">100</h1>
        </div>
        <div className="py-2  text-center rounded-xl bg-neutral-700/30">
          <h3 className="text-sm text-neutral-400">Stat</h3>
          <h1 className="text-2xl font-semibold">100</h1>
        </div>
        <div className="py-2  text-center rounded-xl bg-neutral-700/30">
          <h3 className="text-sm text-neutral-400">Stat</h3>
          <h1 className="text-2xl font-semibold">100</h1>
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
