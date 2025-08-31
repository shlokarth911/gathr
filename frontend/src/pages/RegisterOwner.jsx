import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import ListedVenuesPannel from "../components/attendee_home/ListedVenuesPannel";

const RegisterOwner = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // refs for animations
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const formPanelRef = useRef(null);
  const inputsRef = useRef([]);
  const submitRef = useRef(null);
  const arrowRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const submitHandler = (e) => {
    e.preventDefault();
    const attendeeData = {
      name: name,
      email: email,
      password: password,
    };

    console.log(attendeeData);
  };

  // page entrance animations for header, panel, inputs
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      tl.from(
        formPanelRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.from(
        inputsRef.current,
        {
          y: 10,
          opacity: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.35"
      );

      // subtle pulsing shadow on submit button (looping)
      gsap.to(submitRef.current, {
        boxShadow: "0 10px 30px rgba(29,185,84,0.12)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // micro hover/focus for arrow
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = arrowRef.current;
    if (!el) return;

    const inAnim = () =>
      gsap.to(el, { x: -6, rotation: -8, duration: 0.28, ease: "power2.out" });
    const outAnim = () =>
      gsap.to(el, { x: 0, rotation: 0, duration: 0.28, ease: "power2.out" });

    el.addEventListener("mouseenter", inAnim);
    el.addEventListener("mouseleave", outAnim);
    el.addEventListener("focus", inAnim);
    el.addEventListener("blur", outAnim);

    return () => {
      el.removeEventListener("mouseenter", inAnim);
      el.removeEventListener("mouseleave", outAnim);
      el.removeEventListener("focus", inAnim);
      el.removeEventListener("blur", outAnim);
    };
  }, [prefersReducedMotion]);

  // listed venues panel animation (uses useGSAP like you had it)

  return (
    <div
      ref={rootRef}
      className="bg-neutral-900 h-screen overflow-hidden text-white"
    >
      <div className=" px-5 py-4 flex items-center justify-between">
        <Link to={"/onboard"} aria-label="Back to onboard">
          <div
            ref={arrowRef}
            className="p-1 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-700"
          >
            <ArrowLeft size={28} />
          </div>
        </Link>

        <Link to={"/owner/login"}>
          <h2 className="underline">Login</h2>
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="px-5 py-6">
          <h1 ref={headerRef} className="text-3xl">
            Register as an <br /> Owner
          </h1>

          <p className="pt-2 text-neutral-300">Manage your venues</p>
        </div>

        <div
          ref={formPanelRef}
          className="bg-neutral-800 px-5 pt-9 pb-7 rounded-t-4xl"
          style={{ willChange: "transform, opacity" }}
        >
          <form onSubmit={submitHandler}>
            <h2 className="text-xl ml-4 text-neutral-300">Name</h2>
            <input
              ref={(el) => (inputsRef.current[0] = el)}
              type="text"
              placeholder="Enter your name"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <h2 className="text-xl mt-6 ml-4 text-neutral-300">Email</h2>
            <input
              ref={(el) => (inputsRef.current[1] = el)}
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <h2 className="text-xl mt-6 ml-4 text-neutral-300">Password</h2>
            <input
              ref={(el) => (inputsRef.current[2] = el)}
              type="password"
              placeholder="Enter a strong password"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <p className="text-base mt-5 text-center text-neutral-300">
              Later you can select the venues you own!
            </p>

            <button
              ref={submitRef}
              className="w-full mt-6 text-2xl text-black py-3 rounded-full transform-gpu"
              style={{
                background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                willChange: "box-shadow, transform",
              }}
              onMouseEnter={(e) => {
                if (prefersReducedMotion) return;
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  duration: 0.18,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                if (prefersReducedMotion) return;
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.18,
                  ease: "power2.out",
                });
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterOwner;
