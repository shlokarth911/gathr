import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

// WelcomeSplitHero.jsx
// Mobile-first single-file React component (Tailwind CSS + GSAP)
// Layout follows the sketch: large attractive visual area on top, two stacked CTA buttons below.
// - Hero area supports either an image (object-cover) or an animated gradient
// - Two big full-width CTA buttons (primary and secondary)
// - Subtle GSAP animations: hero Ken Burns + button entrance + hover micro-interactions
// Usage: <WelcomeSplitHero onChoose={(role) => {}} heroImageUrl={url} />

export default function WelcomeSplitHero({
  onChoose = () => {},
  heroImageUrl,
}) {
  const root = useRef();
  const hero = useRef();
  const primaryBtn = useRef();
  const secondaryBtn = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(root.current, {
        opacity: 0,
        duration: 0.45,
        y: 8,
        ease: "power2.out",
      });

      // hero subtle Ken Burns (scale + slow pan)
      gsap.to(hero.current, {
        scale: 1.06,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // buttons entrance
      gsap.from([primaryBtn.current, secondaryBtn.current], {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });

      // micro hover for CTA
      gsap.to(primaryBtn.current, {
        boxShadow: "0 10px 30px rgba(29,185,84,0.14)",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="min-h-screen bg-[#0b0b0b] flex items-center justify-center "
    >
      <div className="w-full max-w-sm mx-auto h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#070707] to-[#0f0f0f] rounded-b-3xl ">
        {/* HERO VISUAL (top ~70%) */}
        <div className="flex-1 relative overflow-hidden bg-neutral-900">
          {/* If heroImageUrl provided, use it with object-cover and no overflow */}
          {heroImageUrl ? (
            <img
              ref={hero}
              src={heroImageUrl}
              alt="Gathr hero"
              className="absolute inset-0 w-full h-full object-cover block"
              draggable={false}
            />
          ) : (
            // otherwise show a minimal animated gradient / pattern
            <div
              ref={hero}
              className="absolute inset-0 bg-gradient-to-tr from-[#062023] via-[#071018] to-[#07101a]"
            />
          )}

          {/* overlay content (title + subtle subtitle) */}
          <div className="absolute inset-6 flex flex-col justify-between text-white pointer-events-none ">
            <div>
              <div className="rounded-full bg-black/30 px-3 py-1 inline-block text-xs text-neutral-300">
                Welcome
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-semibold max-w-xs">
                Welcome to{" "}
                <span
                  style={{
                    background:
                      " linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Gathr
                </span>
              </h1>
              <p className="mt-2 text-sm text-neutral-300 max-w-xs">
                Discover events, list venues, or manage bookings. Pick a role to
                continue.
              </p>
            </div>
          </div>
        </div>

        {/* CTA area (bottom ~30%) */}
        <div
          style={{
            height: "30%",
          }}
          className="rounded-t-3xl  px-6 py-5 bg-gradient-to-t from-black/40 to-transparent"
        >
          <div className="space-y-3">
            <Link
              to={"/register-attendee"}
              ref={primaryBtn}
              onClick={() => onChoose("attendee")}
              className="w-full flex items-center justify-center  mt-9 text-lg text-black py-3 font-semibold rounded-full"
              style={{
                background:
                  " linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
              }}
            >
              Continue as attendee / host
            </Link>

            <Link
              to={"/register-owner"}
              ref={secondaryBtn}
              onClick={() => onChoose("owner")}
              className="w-full flex items-center justify-center  rounded-full py-4 text-lg font-medium bg-transparent border border-neutral-600 text-white hover:bg-white/3 transition-colors focus:outline-none"
            >
              Register as owner
            </Link>

            <div className="mt-2 text-center text-xs text-neutral-400">
              We verify owners before listings go live.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
