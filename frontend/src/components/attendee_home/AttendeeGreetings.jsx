// AttendeeGreetings.jsx
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Minimal enhanced AttendeeGreetings
 * - Kept the exact text and form structure you provided.
 * - Added a compact frosted search container, primary-color submit button (#43ff1d),
 *   subtle entrance animation, and a small focus glow for accessibility.
 * - No new fields or UI elements were added.
 */

const AttendeeGreetings = ({ onSearch = (q) => console.log("search:", q) }) => {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [query, setQuery] = useState("");

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        y: 8,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      });
      gsap.from(
        [inputRef.current, btnRef.current],
        { y: 6, opacity: 0, stagger: 0.06, duration: 0.38, ease: "power3.out" },
        "-=0.28"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = inputRef.current;
    if (!el) return;
    const focusIn = () =>
      gsap.to(el, {
        boxShadow: "0 8px 28px rgba(67,255,29,0.10)",
        duration: 0.18,
      });
    const focusOut = () =>
      gsap.to(el, { boxShadow: "0 2px 8px rgba(0,0,0,0.06)", duration: 0.24 });
    el.addEventListener("focus", focusIn, true);
    el.addEventListener("blur", focusOut, true);
    return () => {
      el.removeEventListener("focus", focusIn, true);
      el.removeEventListener("blur", focusOut, true);
    };
  }, [prefersReducedMotion]);

  const submitHandler = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) {
      // small shake if empty (non-intrusive)
      if (!prefersReducedMotion && inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { x: -6 },
          { x: 0, duration: 0.28, ease: "elastic.out(1, 0.6)" }
        );
      }
      return;
    }
    onSearch(q);
  };

  return (
    <div className="p-6 pt-7 max-w-7xl mx-auto w-full" ref={rootRef}>
      {/* Heading preserved exactly */}
      <p className="text-2xl md:text-4xl font-bold text-white">
        Your next unforgettable <br /> event starts here.
      </p>

      <form onSubmit={submitHandler} action="">
        <div className="mt-7 relative max-w-2xl">
          {/* Frosted wrapper around the input (keeps original input markup) */}
          <div
            className="rounded-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              WebkitBackdropFilter: "blur(6px) saturate(120%)",
              backdropFilter: "blur(6px) saturate(120%)",
              border: "1px solid rgba(255,255,255,0.03)",
              padding: "6px",
            }}
          >
            <input
              id="gathr-search"
              ref={inputRef}
              type="text"
              className="bg-transparent w-full py-3 px-5 rounded-2xl text-lg text-white placeholder:text-neutral-400 outline-none"
              placeholder="Search for your venue"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search for your venue"
              // small default box-shadow for subtle elevation
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            />
          </div>

          {/* Submit button preserved but restyled with primary color (no new elements) */}
          <button
            ref={btnRef}
            type="submit"
            className="absolute top-1/2 right-0 rounded-full"
            style={{
              transform: "translate(-30%, -50%)",
              background: "linear-gradient(90deg, #43ff1d 0%, #36d115 100%)",
              padding: "10px",
              boxShadow: "0px 10px 20px rgba(67,255,29,0.12)",
              borderRadius: "9999px",
            }}
            aria-label="Search"
          >
            <Search color="black" size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendeeGreetings;
