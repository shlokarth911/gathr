import { ArrowRight, CreditCard, LogOut, MapPinCheck } from "lucide-react";
import React from "react";

const OwnerActions = () => {
  return (
    <div className="px-6">
      <h2 className="text-xl font-semibold">Actions</h2>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between py-2 px-4  bg-neutral-800/90 rounded-xl">
          <p>Listings</p>
          <ArrowRight size={20} />
        </div>
        <div className="flex items-center justify-between py-2 px-4  bg-neutral-800/90 rounded-xl">
          <p>Payment Methods</p>
          <CreditCard size={20} />
        </div>
        <div className="flex items-center justify-between py-2 px-4  bg-neutral-800/90 rounded-xl">
          <p>Verification</p>
          <MapPinCheck size={20} />
        </div>
        <div className="flex items-center justify-between py-2 px-4  bg-red-600/90 rounded-xl">
          <p>Sign Out</p>
          <LogOut size={20} />
        </div>
      </div>
    </div>
  );
};

export default OwnerActions;
