// BookingsFilters.jsx
import React from "react";

export default function BookingsFilters({
  value = "upcoming",
  onChange = () => {},
}) {
  const opts = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
      {opts.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`shrink-0 px-3 py-2 rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            value === o.key
              ? "bg-[#43ff1d] text-black focus:ring-[#43ff1d]/40"
              : "bg-white/6 text-white/90 focus:ring-white/10"
          }`}
          aria-pressed={value === o.key}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
