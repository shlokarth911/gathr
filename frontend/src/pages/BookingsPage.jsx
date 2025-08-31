// BookingsPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import BookingsFilters from "../components/attendee_bookings/BookingsFilters";
import BookingList from "../components/attendee_bookings/BookingList";
import BookingDetailsModal from "../components/attendee_bookings/BookingDetailsModal";
import ConfirmCancelModal from "../components/attendee_bookings/ConfirmCancelModal";

/**
 * BookingsPage
 * - Composes the booking components (filters, list, modals)
 * - Mobile-first layout, local-only state (no backend)
 * - Small GSAP entrance animation (respects prefers-reduced-motion)
 *
 * Save this file alongside the other booking components in:
 * src/components/bookings/BookingsPage.jsx
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function BookingsPage({ initialBookings = null }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);

  // sample data (replace/wire your API when ready)
  const sample = [
    {
      id: "b1",
      venue: "Mount View",
      venueImage:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      date: "2025-09-18",
      time: "18:30",
      guests: 120,
      address: "Ranchi, India",
      status: "confirmed",
    },
    {
      id: "b2",
      venue: "Rooftop Oasis",
      venueImage:
        "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      date: "2025-07-12",
      time: "14:00",
      guests: 60,
      address: "Bengaluru, India",
      status: "past",
    },
    {
      id: "b3",
      venue: "The Grand Hall",
      venueImage:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      date: "2025-12-05",
      time: "11:00",
      guests: 200,
      address: "Mumbai, India",
      status: "pending",
    },
  ];

  const [bookings, setBookings] = useState(initialBookings || sample);
  const [filter, setFilter] = useState("upcoming"); // upcoming | past | all
  const [selectedId, setSelectedId] = useState(null); // id for details modal
  const [confirmCancelId, setConfirmCancelId] = useState(null); // id for confirm modal

  // derive visible bookings based on filter
  const visible = useMemo(() => {
    if (filter === "all") return bookings;
    if (filter === "past") return bookings.filter((b) => b.status === "past");
    // upcoming = not past and not cancelled
    return bookings.filter(
      (b) => b.status !== "past" && b.status !== "cancelled"
    );
  }, [bookings, filter]);

  // entrance animation
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        y: 8,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // local UI actions (no backend)
  const viewBooking = (id) => setSelectedId(id);
  const closeBooking = () => setSelectedId(null);
  const requestReschedule = (id) => {
    // placeholder — replace with a reschedule flow/modal
    alert("Open reschedule flow for " + id);
  };
  const confirmCancelBooking = (id) => setConfirmCancelId(id);
  const doCancelBooking = (id) => {
    setBookings((s) =>
      s.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
    setConfirmCancelId(null);
  };

  const selected = bookings.find((b) => b.id === selectedId) || null;

  return (
    <main
      ref={rootRef}
      className="min-h-screen bg-neutral-900 text-white px-4 pb-24 pt-3"
      aria-live="polite"
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-white/4"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">My bookings</h1>
          <p className="text-xs text-neutral-400">
            Upcoming and past reservations
          </p>
        </div>
      </div>

      {/* Filters */}
      <BookingsFilters value={filter} onChange={setFilter} />

      {/* Booking list */}
      <section className="mt-4">
        <BookingList
          bookings={visible}
          onView={viewBooking}
          onReschedule={requestReschedule}
          onCancel={confirmCancelBooking}
        />
      </section>

      {/* Modals */}
      <BookingDetailsModal
        booking={selected}
        onClose={closeBooking}
        onReschedule={requestReschedule}
        onCancel={confirmCancelBooking}
      />

      <ConfirmCancelModal
        bookingId={confirmCancelId}
        onClose={() => setConfirmCancelId(null)}
        onConfirm={doCancelBooking}
      />

      {/* bottom spacer so content doesn't hide behind bottom nav */}
      <div className="h-24" />
    </main>
  );
}
