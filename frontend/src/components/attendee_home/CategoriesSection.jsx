// CategoriesSection.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// /**
//  * Minimal, mobile-first categories strip.
//  * - Preserves your original content & order.
//  * - Adds: horizontal snap, no-shrink chips, focus styles, accessible buttons.
//  * - Fix: category.icon rendered correctly as a React component.
//  * - Small GSAP entrance (respects prefers-reduced-motion).
//  *
//  * Props:
// //  * - categories: [{ name, icon /* React component */, ... }]
// //  * - onSelect?: fn(category)  // optional - called when a chip is clicked
// //  */
const CategoriesSection = ({ categories = [], onSelect = () => {} }) => {
  const rowRef = useRef(null);
  const rootRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!rootRef.current) return;

    // small entrance: chips fade + slide up
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current.querySelectorAll(".cat-chip"), {
        y: 6,
        opacity: 0,
        stagger: 0.05,
        duration: 0.42,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="p-7 pt-3 relative max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between pr-2">
        <h2 className="text-lg font-semibold text-white">
          Available Categories
        </h2>

        <Link className="text-sm underline text-neutral-300" to="/categories">
          See all
        </Link>
      </div>

      <div className="relative mt-3">
        {/* subtle left/right fade overlays to hint scroll (pointer-events-none so taps pass through) */}
        <div
          aria-hidden
          style={{
            right: "-6%",
            top: 0,
            bottom: 0,
            width: "9%",
            filter: "blur(10px)",
          }}
          className="absolute z-10 pointer-events-none bg-gradient-to-l from-transparent to-black/60"
        />
        <div
          aria-hidden
          style={{
            left: "-2%",
            top: 0,
            bottom: 0,
            width: "6%",
            filter: "blur(8px)",
          }}
          className="absolute z-10 pointer-events-none bg-gradient-to-r from-transparent to-black/40"
        />

        {/* scroll row: snap + no-shrink + accessible buttons */}
        <div
          ref={rowRef}
          className="py-2 flex w-full overflow-x-auto gap-4 relative px-1"
          style={{ scrollbarWidth: "none" }} // firefox
          role="list"
        >
          {/* WebKit scrollbar hide (inline so no extra CSS file required) */}
          <style>{`
            /* hide webkit scrollbar */
            .categories-row::-webkit-scrollbar { display: none; height: 8px; }
          `}</style>

          <div className="categories-row flex gap-4">
            {categories.map((category, idx) => {
              // render icon safely (category.icon is a React component)
              const Icon = category.icon;

              return (
                <button
                  key={idx}
                  role="listitem"
                  onClick={() => onSelect(category)}
                  onKeyDown={(e) => {
                    // allow Enter / Space to activate
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(category);
                    }
                  }}
                  className="cat-chip snap-start shrink-0 flex items-center gap-2 px-3 py-3 font-semibold rounded-2xl bg-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#43ff1d]/30"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                    minWidth: 86,
                  }}
                >
                  {/* icon (if provided) */}
                  {Icon ? <Icon size={20} className="text-white/90" /> : null}

                  {/* text unchanged */}
                  <p className="inline-block text-sm">{category.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
