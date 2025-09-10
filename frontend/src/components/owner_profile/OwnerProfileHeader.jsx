import { Pencil } from "lucide-react";
import React from "react";

const OwnerProfileHeader = () => {
  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Profile</h2>
          <p className="text-sm text-neutral-400">
            Manage your account and settings
          </p>
        </div>

        <div className="p-3 rounded-full bg-white/20">
          <Pencil size={20} />
        </div>
      </div>
    </>
  );
};

export default OwnerProfileHeader;
