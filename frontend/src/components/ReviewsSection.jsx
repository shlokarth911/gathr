import React, { useMemo, useRef, useEffect } from "react";
import { Star, CheckCircle } from "lucide-react";

export default function ReviewsSection({
  reviews = [],
  cardWidth = 260,
  onReadMore = () => {},
}) {
  const rowRef = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // fallback sample data if none passed
  const data = useMemo(
    () =>
      reviews.length
        ? reviews
        : [
            {
              id: 1,
              name: "Aisha",
              rating: 5,
              text: "Beautiful venue and helpful host. Seamless booking.",
              verified: true,
            },
            {
              id: 2,
              name: "Rohit",
              rating: 4,
              text: "Great sound & lighting — our guests loved it.",
              verified: false,
            },
            {
              id: 3,
              name: "Nina",
              rating: 5,
              text: "Fantastic rooftop. Perfect for our evening party.",
              verified: true,
            },
            {
              id: 4,
              name: "Karan",
              rating: 4,
              text: "Good location, communication could improve.",
              verified: false,
            },
          ],
    [reviews]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    // small entrance animation via CSS class (no GSAP required). Force reflow then add class.
    const el = rowRef.current;
    if (!el) return;
    el.classList.remove("rev-animate");
    // slight timeout so CSS transition kicks in
    const t = setTimeout(() => el.classList.add("rev-animate"), 20);
    return () => clearTimeout(t);
  }, [data, prefersReducedMotion]);

  const Stars = ({ v = 0 }) => (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.round(v) ? "text-yellow-400" : "text-white/30"}
        />
      ))}
    </div>
  );

  return (
    <section className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-neutral-300">What users say</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              Trusted by hosts & guests
            </div>
          </div>
          <div className="text-sm text-neutral-400 hidden sm:block">
            Verified hosts · Real feedback
          </div>
        </div>

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {data.map((r) => (
            <article
              key={r.id}
              className="rev-card snap-start shrink-0 bg-neutral-800 rounded-2xl p-4 shadow-md"
              style={{
                width: cardWidth,
                transform: "translateY(0)",
                transition:
                  "transform .36s cubic-bezier(.22,.9,.33,1), opacity .32s ease",
              }}
              aria-label={`Review by ${r.name}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-sm text-white">
                  {r.name?.[0] ?? "U"}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-white">{r.name}</div>
                    {r.verified && (
                      <CheckCircle size={14} className="text-[#00ff59]" />
                    )}
                  </div>

                  <div className="mt-1">
                    <Stars v={r.rating} />
                  </div>

                  <p
                    className="mt-2 text-sm text-neutral-200"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {r.text}
                  </p>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => onReadMore(r)}
                      className="text-xs text-neutral-300 hover:text-white underline"
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        /* subtle entry: cards slide up a bit when the container gets .rev-animate */
        .rev-card { opacity: 1; }
        .rev-animate .rev-card { transform: translateY(0); opacity: 1; }
        /* initial state when JS runs will already be neutral; this is just a simple class toggle */
      `}</style>
    </section>
  );
}
