// TopVenues.jsx
import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const TopVenues = ({
  topPickedVenues = [],
  venues,
  setSelectedVenue,
  setIsAttendeeVenueDetailsOpen,
}) => {
  const rowRef = useRef(null);
  const rootRef = useRef(null);

  const handleCardClick = (venue) => {
    setSelectedVenue(venue);
    setIsAttendeeVenueDetailsOpen(true);
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!rowRef.current) return;

    // entrance: stagger cards sliding up
    const cards = rowRef.current.querySelectorAll(".top-venue-card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 10,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: "power3.out",
      });
    }, rowRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, topPickedVenues]);

  return (
    <section ref={rootRef} className="px-7 py-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Top Venues</h2>

        {/* See All link - keep semantics */}
        <Link
          to="/venues"
          className="text-sm flex gap-2 items-center text-neutral-300"
        >
          See All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="relative mt-3">
        <div
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/10"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
          }}
        >
          <ArrowRight size={20} />
        </div>

        {/* Scroll row */}
        <div
          ref={rowRef}
          style={{ scrollbarWidth: "none" }}
          className="flex overflow-x-auto mt-4 gap-4 flex-nowrap snap-x snap-mandatory px-1 py-1"
          role="list"
        >
          {/* hide webkit scrollbar inline (works across pages without extra CSS file) */}
          <style>{`
            .top-venues-row::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="top-venues-row flex gap-4">
            {venues.map((venue, idx) => {
              // use Link if venue has id so it is keyboard-focusable and navigable
              const CardTag = venue.id ? Link : "div";
              const cardProps = venue.id
                ? { to: `/venues/${venue.id}` }
                : { role: "article" };

              return (
                <CardTag
                  {...cardProps}
                  key={idx}
                  className="top-venue-card snap-start shrink-0 min-w-[200px] max-w-[220px] bg-neutral-800/80 flex flex-col rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-[#43ff1d]/40"
                  style={{ textDecoration: "none" }}
                  onClick={() => handleCardClick(venue)}
                >
                  {/* Image — consistent aspect ratio, object-cover so no overflow */}
                  <div className="w-full h-40 rounded-t-2xl overflow-hidden ">
                    <img
                      src={venue.image}
                      alt={venue.name || "Venue image"}
                      className="w-full h-full rounded-b-3xl object-cover block"
                      // avoid layout shift: keep fixed height; use loading lazy if many cards
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-base font-semibold text-white line-clamp-2">
                        {venue.name}
                      </p>
                      <p className="text-sm text-neutral-300 mt-1 line-clamp-1">
                        {venue.address}
                      </p>
                    </div>

                    <div className="mt-3">
                      <div className="text-lg font-semibold text-white">
                        ₹{venue.price}
                        <span className="text-xs text-neutral-400">
                          {" "}
                          / guest
                        </span>
                      </div>
                    </div>
                  </div>
                </CardTag>
              );
            })}

            {/* If list is empty, show a tiny placeholder card (keeps layout stable) */}
            {topPickedVenues.length === 0 && (
              <div className="min-w-[200px] max-w-[220px] rounded-2xl bg-neutral-800 p-4 flex items-center justify-center text-neutral-400">
                No venues yet
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopVenues;
