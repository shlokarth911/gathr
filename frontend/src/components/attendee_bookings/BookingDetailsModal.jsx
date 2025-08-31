// BookingDetailsModal.jsx
import React from "react";
import { X, Calendar, Clock, Users, MapPin } from "lucide-react";

/**
 * Centered modal — always centered on screen (mobile + desktop)
 */
export default function BookingDetailsModal({
  booking = null,
  onClose = () => {},
  onReschedule = () => {},
  onCancel = () => {},
}) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-md bg-neutral-900 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{booking.venue}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-white/5">
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 text-sm text-neutral-300 space-y-3">
          <div className="flex items-center gap-3">
            <Calendar size={16} /> <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} /> <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users size={16} /> <span>{booking.guests} guests</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} /> <span>{booking.address}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => onReschedule(booking.id)}
            className="flex-1 py-3 rounded-full bg-white/5"
          >
            Reschedule
          </button>
          <button
            onClick={() => onCancel(booking.id)}
            className="py-3 px-4 rounded-full bg-red-600/80 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
