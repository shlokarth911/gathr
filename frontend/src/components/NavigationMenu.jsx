import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react";

const NavigationMenu = ({
  items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "services", label: "Services" },
    { key: "contact", label: "Contact" },
  ],
  activeKey = "home",
  onChange = () => {},
}) => {
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const [pillState, setPillState] = useState({ left: 0, width: 0, opacity: 0 });
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      const activeElement = navRef.current.querySelector(
        `[data-key="${activeKey}"]`
      );
      if (activeElement) {
        const newState = {
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft,
          opacity: 1,
        };
        // Only update if values changed
        setPillState((prevState) =>
          prevState.width !== newState.width ||
          prevState.left !== newState.left ||
          prevState.opacity !== newState.opacity
            ? newState
            : prevState
        );
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);

    return () => window.removeEventListener("resize", updatePill);
  }, [activeKey, items]);
  // GSAP animation for pill
  useEffect(() => {
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        ...pillState,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [pillState]);

  return (
    <div className=" relative flex justify-center z-50">
      <div className="relative rounded-full p-2 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <nav
          ref={navRef}
          className="relative flex items-center justify-between gap-2"
        >
          {/* Pill Highlight */}
          <div
            ref={pillRef}
            style={{ opacity: 0 }} // Start with opacity 0 to prevent FOUC
            className="absolute top-0 h-full rounded-full bg-white/20"
          />

          {/* Navigation Items */}
          <ul
            role="tablist"
            className="flex items-center space-x-2 relative z-10"
          >
            {items.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <li key={item.key}>
                  <button
                    data-key={item.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onChange(item.key)}
                    className={`relative flex flex-col items-center justify-center py-3 px-4 rounded-full transition-all duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white/90"
                      }`}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationMenu;
