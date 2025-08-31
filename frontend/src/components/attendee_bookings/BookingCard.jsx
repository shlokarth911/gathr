// BookingCard.jsx
import React from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const StatusPill = ({ status = "pending" }) => {
  const map = {
    confirmed: { label: "Confirmed", cls: "bg-green-600/90 text-black" },
    pending: { label: "Pending", cls: "bg-yellow-500/90 text-black" },
    cancelled: { label: "Cancelled", cls: "bg-red-600/90 text-white" },
    past: { label: "Past", cls: "bg-neutral-700 text-white" },
  };
  const cfg = map[status] || { label: status, cls: "bg-white/10" };
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.cls}`}>
      {cfg.label}
    </div>
  );
};

/**
 * Larger, vertical booking card:
 * - image as hero (full width)
 * - roomy content with larger type & spacing
 * - keeps the same actions (View / Reschedule / Cancel)
 */
export default function BookingCard({
  booking,
  onView = () => {},
  onReschedule = () => {},
  onCancel = () => {},
}) {
  return (
    <article
      tabIndex={0}
      aria-labelledby={`booking-${booking.id}-title`}
      className="booking-card bg-neutral-800/40 rounded-2xl overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-[#43ff1d]/25"
      style={{ border: "1px solid rgba(255,255,255,0.03)" }}
    >
      {/* Hero image */}
      <div className="w-full h-44 md:h-52 bg-neutral-700 overflow-hidden">
        <img
          src={booking.venueImage}
          alt={booking.venue}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              id={`booking-${booking.id}-title`}
              className="font-semibold text-white text-base md:text-lg line-clamp-1"
            >
              {booking.venue}
            </h3>
            <p className="text-sm text-neutral-300 mt-1 line-clamp-1">
              {booking.address}
            </p>
          </div>

          <div className="text-sm text-neutral-300 text-right min-w-[88px]">
            <div className="flex items-center gap-1 justify-end text-sm">
              <Calendar size={14} /> <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-1 justify-end mt-1 text-sm">
              <Clock size={14} /> <span>{booking.time}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-neutral-300">
            <div className="flex items-center gap-1">
              <Users size={16} /> <span>{booking.guests}</span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin size={16} /> <span>{booking.address.split(",")[0]}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusPill status={booking.status} />

            <div className="flex items-center gap-2">
              <button
                onClick={() => onView(booking.id)}
                className="px-3 py-2 rounded-lg bg-white/5 text-sm"
              >
                View
              </button>

              {booking.status !== "cancelled" && booking.status !== "past" && (
                <>
                  <button
                    onClick={() => onReschedule(booking.id)}
                    className="px-3 py-2 rounded-lg bg-white/5 text-sm"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => onCancel(booking.id)}
                    className="px-3 py-2 rounded-lg bg-red-600/80 text-sm text-white"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
