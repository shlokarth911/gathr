// OwnerBookingsSectionClean.jsx
import React, { useEffect, useRef } from "react";
import { Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Cleaner, minimal Owner Bookings section for owner dashboard home
 *
 * Props:
 *  - bookings: array of { id, guestName, guestAvatar, guestContact, venueName, date (ISO or friendly), time, guests, price, status }
 *  - limit: how many to show (default 5)
 *  - seeAllPath: route to bookings page (default "/owner/bookings")
 *  - onViewBooking: optional (id) => void
 *  - onContact: optional (booking) => void
 */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function statusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "bg-emerald-600 text-black";
  if (s === "pending") return "bg-yellow-500 text-black";
  if (s === "cancelled") return "bg-red-600 text-white";
  return "bg-neutral-700 text-white";
}

function formatShortDate(dateStr) {
  // accepts friendly or ISO; returns "Sep 18" (month short + day)
  try {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function OwnerBookingsSectionClean({
  bookings = [],
  limit = 5,
  seeAllPath = "/owner/bookings",
  onViewBooking = null,
  onContact = null,
}) {
  const rootRef = useRef(null);
  const list = (bookings || []).slice(0, limit);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!rootRef.current) return;
    const cards = rootRef.current.querySelectorAll(".obc-card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%", // Animate when section enters viewport
          toggleActions: "play none none none",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [bookings, limit]);
  return (
    <section ref={rootRef} className="px-7 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent bookings</h2>
        <Link to={seeAllPath} className="text-sm text-neutral-400">
          See all
        </Link>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {list.length === 0 ? (
          <div className="rounded-2xl p-4 bg-neutral-800/30 text-center text-neutral-400">
            No recent bookings
          </div>
        ) : (
          list.map((b) => {
            const shortDate = formatShortDate(b.date);
            return (
              <article
                key={b.id}
                className="obc-card flex items-center gap-3 p-3 rounded-2xl bg-neutral-800/30"
                aria-labelledby={`booking-${b.id}-title`}
              >
                {/* Avatar / initials */}
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex-shrink-0 flex items-center justify-center overflow-hidden text-sm font-semibold">
                  {b.guestAvatar ? (
                    <img
                      src={b.guestAvatar}
                      alt={b.guestName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white">
                      {b.guestName
                        ? b.guestName
                            .split(" ")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")
                        : "U"}
                    </span>
                  )}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3
                        id={`booking-${b.id}-title`}
                        className="text-sm font-medium text-white truncate"
                      >
                        {b.guestName}
                      </h3>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {b.venueName}
                      </p>
                    </div>

                    {/* Right column: date/time */}
                    <div className="text-right min-w-[78px]">
                      <div className="text-sm font-semibold">{shortDate}</div>
                      <div className="text-xs text-neutral-400 flex items-center justify-end gap-1 mt-0.5">
                        <Clock size={12} /> <span>{b.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* footer row: guests (small), price + status pill */}
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-neutral-300">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        👥 <span>{b.guests}</span>
                      </span>
                      {/* keep this small, optional */}
                      {/* <span className="inline-flex items-center gap-1">
                        📅 <span>{shortDate}</span>
                      </span> */}
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`${statusClass(
                          b.status
                        )} text-xs px-2 py-1 rounded-full font-medium`}
                      >
                        {b.status}
                      </div>
                      <div className="text-sm font-semibold">₹{b.price}</div>
                    </div>
                  </div>
                </div>

                {/* actions: Details + contact */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => (onViewBooking ? onViewBooking(b.id) : null)}
                    className="text-xs text-neutral-300 underline"
                    aria-label={`Details for booking ${b.id}`}
                  >
                    Details
                  </button>

                  {b.guestContact || onContact ? (
                    <button
                      onClick={() =>
                        onContact
                          ? onContact(b)
                          : b.guestContact &&
                            (window.location.href = `tel:${b.guestContact}`)
                      }
                      className="p-2 rounded-full bg-white/5"
                      aria-label={`Contact ${b.guestName}`}
                      title={b.guestContact ? b.guestContact : "Contact"}
                    >
                      <Phone size={14} />
                    </button>
                  ) : (
                    <div className="w-8 h-8" />
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
