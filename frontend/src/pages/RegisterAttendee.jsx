import React, { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import { AttendeeDataContext } from "../contexts/AttendeeContext";

const RegisterAttendee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  // refs for animation
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const inputsRef = useRef([]);
  const submitRef = useRef(null);
  const arrowRef = useRef(null);

  const { setAttendee } = useContext(AttendeeDataContext);
  const navigate = useNavigate();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -8,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      });

      tl.from(
        panelRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.15"
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

      // gentle pulse on submit
      gsap.to(submitRef.current, {
        boxShadow: "0 10px 30px rgba(29,185,84,0.12)",
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // arrow micro-hover rotate
  useEffect(() => {
    if (prefersReducedMotion) return;
    const arrowEl = arrowRef.current;
    if (!arrowEl) return;

    const hovIn = () =>
      gsap.to(arrowEl, {
        x: -6,
        rotation: -8,
        duration: 0.28,
        ease: "power2.out",
      });
    const hovOut = () =>
      gsap.to(arrowEl, {
        x: 0,
        rotation: 0,
        duration: 0.28,
        ease: "power2.out",
      });

    arrowEl.addEventListener("mouseenter", hovIn);
    arrowEl.addEventListener("mouseleave", hovOut);
    arrowEl.addEventListener("focus", hovIn);
    arrowEl.addEventListener("blur", hovOut);

    return () => {
      arrowEl.removeEventListener("mouseenter", hovIn);
      arrowEl.removeEventListener("mouseleave", hovOut);
      arrowEl.removeEventListener("focus", hovIn);
      arrowEl.removeEventListener("blur", hovOut);
    };
  }, [prefersReducedMotion]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const attendeeData = {
      name,
      email,
      password,
      city,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/attendee/register`,
        attendeeData // <-- send data here
      );

      if (response.status === 201) {
        const data = response.data;
        setAttendee(data.attendee || data.user); // depends on backend response
        localStorage.setItem("attendee_token", data.token);
        navigate("/attendee/home");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error. Please try again.");
    }

    setEmail("");
    setCity("");
    setName("");
    setPassword("");
  };
  const cities = [
    { name: "Ranchi", value: "Ranchi" },
    { name: "Delhi", value: "Delhi" },
  ];

  return (
    <div ref={rootRef} className="bg-neutral-900 min-h-screen text-white overflow-y-auto">
      <div className="px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link to={"/onboard"} aria-label="Back to onboard">
          <div
            ref={arrowRef}
            className="p-1 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-700"
          >
            <ArrowLeft size={28} />
          </div>
        </Link>

        <Link to={"/attendee/login"}>
          <h2 className="underline">Login</h2>
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:relative md:flex md:items-center md:justify-center md:min-h-[calc(100vh-80px)] md:py-8">
        <div className="px-4 sm:px-6 md:px-8 py-6 md:hidden">
          <h1 ref={headerRef} className="text-3xl sm:text-4xl">
            Register as an <br /> Attendee / Host
          </h1>

          <p className="pt-2 text-neutral-300">Book, host or visit events</p>
        </div>

        <div
          ref={panelRef}
          className="bg-neutral-800 px-4 sm:px-6 md:px-8 pt-9 pb-7 rounded-t-4xl md:rounded-3xl md:max-w-md md:w-full md:mx-auto md:shadow-2xl"
          style={{ willChange: "transform, opacity" }}
        >
          <form onSubmit={submitHandler}>
            <h1 ref={headerRef} className="hidden md:block text-3xl md:text-4xl mb-2 text-white">
              Register as an <br /> Attendee / Host
            </h1>
            <p className="hidden md:block mb-6 text-neutral-300">Book, host or visit events</p>
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

            <h2 className="text-lg sm:text-xl mt-6 ml-4 text-neutral-300">
              City (Optional)
            </h2>
            <select
              ref={(el) => (inputsRef.current[3] = el)}
              className="bg-neutral-700 text-base sm:text-lg px-4 sm:px-5 py-3 sm:py-4 mt-2 w-full rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#1DB954]/40 transition-shadow"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              <option value="">Select city (optional)</option>
              {cities.map((c, idx) => (
                <option key={idx} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              ref={submitRef}
              type="submit"
              className="w-full mt-9 text-xl sm:text-2xl text-black py-3 sm:py-3.5 rounded-full transform-gpu"
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
              onFocus={(e) => {
                if (prefersReducedMotion) return;
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  duration: 0.18,
                  ease: "power2.out",
                });
              }}
              onBlur={(e) => {
                if (prefersReducedMotion) return;
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.18,
                  ease: "power2.out",
                });
              }}
            >
              Submit
            </button>
          </form>

          <p className="text-sm sm:text-base text-neutral-300 mt-5 text-center">
            To Register as Owner click{" "}
            <Link to="/owner/register">
              <span className="underline">here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAttendee;
