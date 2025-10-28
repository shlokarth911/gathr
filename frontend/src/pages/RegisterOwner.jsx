import { ArrowLeft } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import gsap from "gsap";
import ListedVenuesPannel from "../components/attendee_home/ListedVenuesPannel";
import { OwnerDataContext } from "../contexts/OwnerContext";
import axios from "axios";

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

  const { setOwner } = useContext(OwnerDataContext);
  const navigate = useNavigate();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const submitHandler = async (e) => {
    e.preventDefault();
    const owner = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/owner/register`,
        owner
      );

      if (response.status === 201) {
        const data = response.data;
        setOwner(data.owner);
        localStorage.setItem("owner_token", data.token);
        navigate("/owner/home");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error. Please try again.");
    }

    setEmail("");
    setName("");
    setPassword("");
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
      className="bg-neutral-900 min-h-screen overflow-y-auto text-white"
    >
      <div className="px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
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

      <div className="fixed bottom-0 left-0 right-0 md:relative md:flex md:items-center md:justify-center md:min-h-[calc(100vh-80px)] md:py-8">
        <div className="px-4 sm:px-6 md:px-8 py-6 md:hidden">
          <h1 ref={headerRef} className="text-3xl sm:text-4xl">
            Register as an <br /> Owner
          </h1>

          <p className="pt-2 text-neutral-300">Manage your venues</p>
        </div>

        <div
          ref={formPanelRef}
          className="bg-neutral-800 px-4 sm:px-6 md:px-8 pt-9 pb-7 rounded-t-4xl md:rounded-3xl md:max-w-md md:w-full md:mx-auto md:shadow-2xl"
          style={{ willChange: "transform, opacity" }}
        >
          <form onSubmit={submitHandler}>
            <h1 ref={headerRef} className="hidden md:block text-3xl md:text-4xl mb-2 text-white">
              Register as an <br /> Owner
            </h1>
            <p className="hidden md:block mb-6 text-neutral-300">Manage your venues</p>
            <h2 className="text-lg sm:text-xl ml-4 text-neutral-300">Name</h2>
            <input
              ref={(el) => (inputsRef.current[0] = el)}
              type="text"
              placeholder="Enter your name"
              className="bg-neutral-700 text-base sm:text-lg px-4 sm:px-5 py-3 sm:py-4 mt-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <h2 className="text-lg sm:text-xl mt-6 ml-4 text-neutral-300">Email</h2>
            <input
              ref={(el) => (inputsRef.current[1] = el)}
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-700 text-base sm:text-lg px-4 sm:px-5 py-3 sm:py-4 mt-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <h2 className="text-lg sm:text-xl mt-6 ml-4 text-neutral-300">Password</h2>
            <input
              ref={(el) => (inputsRef.current[2] = el)}
              type="password"
              placeholder="Enter a strong password"
              className="bg-neutral-700 text-base sm:text-lg px-4 sm:px-5 py-3 sm:py-4 mt-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <p className="text-sm sm:text-base mt-5 text-center text-neutral-300">
              Later you can select the venues you own!
            </p>

            <button
              ref={submitRef}
              className="w-full mt-6 text-xl sm:text-2xl text-black py-3 sm:py-3.5 rounded-full transform-gpu"
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
