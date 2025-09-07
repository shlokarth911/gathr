import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// ImageCarousel
// - Tailwind CSS based
// - scroll-snapping, smooth scroll
// - clickable dots showing active slide
// - left/right arrow controls
// - accessible buttons + keyboard navigation

export default function ImageCarousel({ images }) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
  ];
  const slides = images && images.length ? images : defaultImages;

  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // IntersectionObserver: track which slide is mostly visible -> active
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const options = {
      root: el,
      rootMargin: "0px",
      threshold: [0.5, 0.75, 0.9], // when >50% visible consider active
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          setActiveIndex(idx);
        }
      });
    }, options);

    slideRefs.current.forEach((s) => s && observer.observe(s));

    return () => observer.disconnect();
  }, [slides.length]);

  // Scroll to a particular slide (used by dots and arrows)
  const scrollToIndex = (idx) => {
    const node = slideRefs.current[idx];
    const container = containerRef.current;
    if (!node || !container) return;
    // scroll so the slide's left aligns with container's left (center can be adjusted)
    container.scrollTo({
      left: node.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  };

  // keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight")
        scrollToIndex(Math.min(activeIndex + 1, slides.length - 1));
      if (e.key === "ArrowLeft") scrollToIndex(Math.max(activeIndex - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, slides.length]);

  return (
    <div className="relative   rounded-2xl">
      {/* Scrollable track */}
      <div
        ref={containerRef}
        className="flex gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth py-2 px-1"
        // hide default scrollbar while keeping scroll functionality
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-roledescription="carousel"
      >
        {slides.map((src, i) => (
          <div
            key={i}
            data-index={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className={`min-w-[100%] sm:min-w-[60%] md:min-w-[100%] lg:min-w-[33%] h-56 rounded-xl snap-start flex-shrink-0 overflow-hidden transform transition-transform duration-300 ${
              i === activeIndex ? "scale-105 ring-2 ring-white/20" : "scale-100"
            }`}
          >
            <img
              src={src}
              alt={`slide ${i + 1}`}
              className="w-full h-full object-cover block"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-md"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() =>
          scrollToIndex(Math.min(activeIndex + 1, slides.length - 1))
        }
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-md"
      >
        <ChevronRight />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 focus:outline-none ${
              i === activeIndex ? "w-3.5 h-3.5 bg-white/90" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="sr-only" aria-live="polite">
        {`Slide ${activeIndex + 1} of ${slides.length}`}
      </div>
    </div>
  );
}

/*
Usage:
import ImageCarousel from './ImageCarousel';

<ImageCarousel images={[url1, url2, url3]} />

Notes:
- Uses Tailwind classes. Adjust min-width breakpoints to change how many slides are visible per viewport.
- IntersectionObserver determines the active dot (thresholds tuned for >50% visibility).
- Click a dot to scroll to that slide. Arrow keys and on-screen arrows also work.
- If you want autoplay, lazy-loading, or pagination numbers, tell me and I'll add it.
*/
