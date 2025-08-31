// BookingList.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BookingCard from "./BookingCard";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function BookingList({
  bookings = [],
  onView,
  onReschedule,
  onCancel,
}) {
  const listRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".booking-card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 12,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: "power3.out",
      });
      // pointer hover micro-scale for pointer devices
      cards.forEach((c) => {
        c.addEventListener("pointerenter", () =>
          gsap.to(c, { scale: 1.01, duration: 0.14 })
        );
        c.addEventListener("pointerleave", () =>
          gsap.to(c, { scale: 1, duration: 0.14 })
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, [bookings]);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center text-neutral-400 py-12">No bookings</div>
    );
  }

  return (
    <div className="flex flex-col gap-6" ref={listRef}>
      {bookings.map((b) => (
        <BookingCard
          key={b.id}
          booking={b}
          onView={onView}
          onReschedule={onReschedule}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
