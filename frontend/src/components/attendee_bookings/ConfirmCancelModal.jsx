// ConfirmCancelModal.jsx
import React from "react";
import { X } from "lucide-react";

/**
 * Centered confirmation modal
 */
export default function ConfirmCancelModal({
  bookingId = null,
  onClose = () => {},
  onConfirm = () => {},
}) {
  if (!bookingId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        aria-hidden
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-neutral-900 rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center">
            <X size={18} />
          </div>
          <div>
            <h4 className="font-semibold">Cancel booking?</h4>
            <p className="text-sm text-neutral-300 mt-1">
              This will cancel your booking — host cancellation fees may apply.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-white/5"
          >
            Keep booking
          </button>
          <button
            onClick={() => onConfirm(bookingId)}
            className="py-3 px-4 rounded-full bg-red-600/80 text-white"
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
