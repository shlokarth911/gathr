import React, { useEffect, useRef, useState } from "react";
import ImageCarousel from "../ui/ImageCarousel";
import {
  BedDouble,
  Landmark,
  Pencil,
  Plus,
  Star,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import BookingRequestDialogue from "./BookingRequestDialogue";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AttendeeVenueDetails = ({
  selectedVenue = null,
  reviews: fallbackReviews = [],
  bookings: fallbackBookings = [],
  amenities: fallbackAmenities = [],
  images: fallbackImages = [],
  setIsAttendeeVenueDetailsOpen,
}) => {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const bookingRequestRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    if (isDialogueOpen) {
      setShowDialogue(true);
    } else if (bookingRequestRef.current) {
      gsap.to(bookingRequestRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -60,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setShowDialogue(false),
      });
    }
  }, [isDialogueOpen]);

  useGSAP(() => {
    if (showDialogue && bookingRequestRef.current) {
      gsap.fromTo(
        bookingRequestRef.current,
        { opacity: 0, scale: 0.95, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: "expo.out",
        }
      );
    }
  }, [showDialogue]);

  const normalizeImages = (imgArr) => {
    if (!Array.isArray(imgArr)) return [];
    return imgArr.map((it) => (typeof it === "string" ? it : it?.url ?? ""));
  };

  const imagesArr =
    normalizeImages((selectedVenue?.images ?? fallbackImages) || []) || [];

  const amenitiesArr = selectedVenue?.amenities ?? fallbackAmenities ?? [];
  const bookingsArr = selectedVenue?.bookings ?? fallbackBookings ?? [];
  const reviewsArr = selectedVenue?.reviews ?? fallbackReviews ?? [];
  const venueId = selectedVenue?.id || selectedVenue?._id;

  const slides = imagesArr;

  // IntersectionObserver: to sync activeIndex with visible slide
  useEffect(() => {
    const el = containerRef.current;
    if (!el || slides.length === 0) return;

    // clear previous refs
    slideRefs.current = slideRefs.current.slice(0, slides.length);

    const options = {
      root: el,
      rootMargin: "0px",
      threshold: [0.5, 0.75, 0.9],
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

  const scrollToIndex = (idx) => {
    const node = slideRefs.current[idx];
    const container = containerRef.current;
    if (!node || !container) return;
    container.scrollTo({
      left: node.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  };

  // keyboard navigation for carousel
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight")
        scrollToIndex(Math.min(activeIndex + 1, slides.length - 1));
      if (e.key === "ArrowLeft") scrollToIndex(Math.max(activeIndex - 1, 0));
      if (e.key === "Escape") setIsAttendeeVenueDetailsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, slides.length, setIsAttendeeVenueDetailsOpen]);

  // Simple "loading" or empty-state guard
  if (
    !selectedVenue &&
    slides.length === 0 &&
    bookingsArr.length === 0 &&
    reviewsArr.length === 0
  ) {
    return (
      <div className="fixed left-0 right-0 bottom-0 h-screen bg-neutral-950/75 w-full backdrop-blur-lg">
        <div className="h-full flex items-center justify-center text-neutral-400">
          No venue selected
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 right-0 bottom-0 h-screen  bg-neutral-950/75 w-full backdrop-blur-lg shadow-2xl">
      <div className="h-full flex flex-col">
        {/* Sticky header with close */}
        <div className="sticky top-0 z-20 bg-transparent px-6 py-2 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">
              {selectedVenue?.name ?? "Venue Detail"}
            </h2>
            {selectedVenue?.address && (
              <p className="text-sm text-neutral-400">
                {selectedVenue.address}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsAttendeeVenueDetailsOpen(false)}
              className="p-2 bg-neutral-800 rounded-full"
              aria-label="Close venue details"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* scrollable content */}
        <div className="h-full overflow-y-auto px-6 pb-10">
          {/* Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            {/* If you keep a separate ImageCarousel component, pass imagesArr */}
            <ImageCarousel images={imagesArr} />
          </div>

          {/* Name and basic details*/}
          <div className="py-5 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">
                {selectedVenue?.name ?? "Mount View"}
              </h1>
              {selectedVenue?.address && (
                <p className="text-lg text-neutral-400">
                  {selectedVenue.address}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Star />
                <span className="text-sm text-neutral-300">
                  {(selectedVenue?.averageRating ?? 0).toFixed(1)} •{" "}
                  {reviewsArr.length} reviews
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h1 className="text-3xl font-semibold">
                ₹{selectedVenue?.price ?? "—"}
              </h1>
              <p className="text-base text-neutral-400">Per Night</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-base text-neutral-200 mt-2">
              {selectedVenue?.description ?? "Description"}
            </p>
          </div>

          {/* Add booking */}
          <div className="mt-6 flex w-full gap-3">
            <button
              onClick={() => setIsDialogueOpen(true)}
              className="w-full  py-3 rounded-full text-base bg-emerald-600 text-white font-semibold"
            >
              Request booking
            </button>

            {/* <button className="w-full  py-3 rounded-full text-base border border-neutral-200 text-white font-semibold">
              Add to wishlist
            </button> */}
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Amenities</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {amenitiesArr.length > 0 ? (
                amenitiesArr.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full bg-neutral-800/40 text-sm"
                  >
                    {a}
                  </span>
                ))
              ) : (
                <div className="text-neutral-400">No amenities listed</div>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6 pb-6">
            <h3 className="text-lg font-semibold">Recent Reviews</h3>
            <div className="mt-3 space-y-3">
              {reviewsArr.length > 0 ? (
                reviewsArr.map((r) => (
                  <div
                    key={r.id ?? r._id}
                    className="bg-neutral-900/30 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {r.user ?? r.name ?? "User"}
                        </p>
                        <p className="text-sm text-neutral-400">
                          {"★".repeat(r.rating ?? 0)}
                        </p>
                      </div>
                      <div className="text-sm text-neutral-400">
                        {r.when ?? "2 weeks ago"}
                      </div>
                    </div>
                    <p className="mt-2 text-neutral-300 text-sm">{r.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-neutral-400 p-3">No reviews yet</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDialogue && (
        <div
          ref={bookingRequestRef}
          className="z-20 absolute  opacity-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%]"
        >
          <BookingRequestDialogue
            selectedVenue={venueId}
            setIsDialogueOpen={setIsDialogueOpen}
          />
        </div>
      )}
    </div>
  );
};

export default AttendeeVenueDetails;
