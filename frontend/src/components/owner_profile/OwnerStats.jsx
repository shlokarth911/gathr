import React from "react";

const OwnerStats = ({ stats }) => {
  return (
    <>
      <div className="p-6 pt-0 grid grid-cols-3 gap-4">
        <div className="py-2   text-center rounded-xl bg-neutral-700/30">
          <h3 className="text-sm text-neutral-400">Pending</h3>
          <h1 className="text-2xl font-semibold">{stats?.pending || "—"}</h1>
        </div>
        <div className="py-2  text-center rounded-xl bg-neutral-700/30">
          <h3 className="text-sm text-neutral-400">Confirmed</h3>
          <h1 className="text-2xl font-semibold">{stats?.confirmed || "—"}</h1>
        </div>
        <div className="py-2  text-center rounded-xl bg-neutral-700/30">
          <h3 className="text-sm text-neutral-400">Completed</h3>
          <h1 className="text-2xl font-semibold">{stats?.completed || "—"}</h1>
        </div>
      </div>
    </>
  );
};

export default OwnerStats;
