import { Plus, Star, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import OwnerVenuesCards from "../components/owner_venues/OwnerVenuesCards";
import ImageCarousel from "../components/ui/ImageCarousel";

const OwnerVenues = () => {
  const ownedVenues = [
    {
      name: "Mount View",
      address: "Ranchi",
      img: "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
      status: "booked",
      price: "50000",
      averageRating: 4.5,
    },
    {
      name: "Mount View",
      address: "Ranchi",
      img: "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
      status: "booked",
      price: "50000",
      averageRating: 4.5,
    },
  ];

  const images = [
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
  ];
  const slides = images;

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
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Your Venues</h1>
        <div className="mt-4 flex items-center  min-h-screen flex-col gap-5">
          <OwnerVenuesCards ownedVenues={ownedVenues} />
        </div>
      </div>

      <div className="h-screen fixed bottom-0 bg-neutral-950/80 w-full backdrop-blur">
        <div className="pt-6 px-6">
          <X size={28} />
        </div>

        {/* Main Container */}
        <div className="mt-6 px-6">
          {/* Carousel */}
          <div className="relative  overflow-hidden rounded-2xl">
            <ImageCarousel />
          </div>

          {/* Add a new image button */}
          <div className="w-full bg-neutral-700/50 flex items-center justify-center gap-2 py-2 rounded-full mt-4 border border-dashed border-neutral-200/40">
            <p className="text-sm text-neutral-400">Add a new image</p>
            <Plus className="text-sm text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO : Complete the venues page by adding details of venues which should be editable

export default OwnerVenues;
