// AttendeeHomeHeader.jsx
import React, { useEffect, useRef } from "react";
import { UserRound, Bell, Search } from "lucide-react";
import gsap from "gsap";

/**
 * AttendeeHomeHeader
 *
 * - Frosted (backdrop-blur) container
 * - Avatar with subtle ring
 * - Greeting + optional subtitle
 * - Notification bell with badge
 * - Primary CTA button using your color #43ff1d
 * - GSAP animations (entrance + micro interactions)
 *
 * Props:
 *  - name (string) default "Alex"
 *  - onNotificationsClick (fn) optional
 *  - onCTA (fn) optional
 *
 * Small notes (in-code comments) show where to add additional functionality:
 *  - notifications panel, user menu, quick-search modal, presence indicator, etc.
 */

export default function AttendeeHomeHeader({
  user,
  onNotificationsClick = () =>
    alert("Open notifications (wire this to your panel)"),
}) {
  const rootRef = useRef(null);
  const avatarRef = useRef(null);
  const bellRef = useRef(null);

  // Respect users who prefer reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;

    // small entrance + stagger for avatar, text, actions
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(rootRef.current, {
        y: -8,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      });
      tl.from(
        [
          avatarRef.current,
          rootRef.current.querySelectorAll(".gathr-greet"),
          bellRef.current,
        ],
        {
          y: 6,
          opacity: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.28"
      );

      // subtle looping pulse on the bell (non-intrusive)
      gsap.to(bellRef.current, {
        y: -3,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
        opacity: 1,
        delay: 0.6,
      });
      // gentle micro-bounce on avatar to give life
      gsap.to(avatarRef.current, {
        y: -2,
        repeat: -1,
        yoyo: true,
        duration: 4.2,
        ease: "sine.inOut",
        delay: 0.9,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <header
      ref={rootRef}
      className="p-6 flex items-center justify-between max-w-7xl mx-auto w-full"
      aria-label="Attendee header"
    >
      {/* LEFT: avatar + greeting */}
      <div className="flex items-center gap-3">
        {/* Avatar with subtle frosted ring */}
        <div
          ref={avatarRef}
          className="rounded-full p-1 bg-white/6" /* extra ring layer (frosted) */
          style={{
            // small inner shadow and glassy ring
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.35)",
            WebkitBackdropFilter: "blur(6px) saturate(120%)",
            backdropFilter: "blur(6px) saturate(120%)",
          }}
        >
          <div
            className=" p-2 rounded-full flex items-center justify-center"
            style={{ width: 44, height: 44 }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl flex items-center justify-center font-semibold  text-neutral-50">
                {user.name?.[0] ?? "U"}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold gathr-greet text-white">
            Hi, {user.name}
          </h3>
        </div>
      </div>

      {/* RIGHT: actions (notifications + search + CTA) */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          ref={bellRef}
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-lg bg-white/4 hover:bg-white/6 focus:outline-none"
          onClick={onNotificationsClick}
          title="Notifications"
        >
          <Bell size={18} className="text-white/90" />
          {/* Badge */}
          <span
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              background: "#ff4d6d",
              boxShadow: "0 0 0 4px rgba(67,255,29,0.06)",
            }}
            aria-hidden
          />
        </button>
      </div>

      {/* 
        Suggestions / comments:
        - Add a notifications panel component that opens from onNotificationsClick.
        - Replace the static UserRound icon with user's profile image: <img src={user.avatar} className="rounded-full" />
        - Consider a small presence indicator (online/offline) by toggling a green dot on avatar.
        - You can add a small dropdown when clicking the avatar for profile/settings/logout.
        - If you plan to support dark/light themes, make the frosted colors adapt using CSS variables.
      */}
    </header>
  );
}
