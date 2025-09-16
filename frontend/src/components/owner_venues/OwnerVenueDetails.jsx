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

const OwnerVenueDetails = ({
  selectedVenue = null,
  reviews: fallbackReviews = [],
  bookings: fallbackBookings = [],
  amenities: fallbackAmenities = [],
  images: fallbackImages = [],
  setIsOwnerVenueDetailsOpen,
}) => {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizeImages = (imgArr) => {
    if (!Array.isArray(imgArr)) return [];
    return imgArr.map((it) => (typeof it === "string" ? it : it?.url ?? ""));
  };

  const imagesArr =
    normalizeImages(selectedVenue?.images ?? fallbackImages) || [];

  const amenitiesArr = selectedVenue?.amenities ?? fallbackAmenities ?? [];
  const bookingsArr = selectedVenue?.bookings ?? fallbackBookings ?? [];
  const reviewsArr = selectedVenue?.reviews ?? fallbackReviews ?? [];

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
      if (e.key === "Escape") setIsOwnerVenueDetailsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, slides.length, setIsOwnerVenueDetailsOpen]);

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
            <button className="p-2 rounded-full bg-neutral-800">
              <Pencil size={20} />
            </button>

            <button
              onClick={() => {
                setIsOwnerVenueDetailsOpen(false);
              }}
              className="p-2  bg-neutral-800 rounded-full"
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

          {/* Add a new image button */}
          <div className="w-full bg-neutral-700/50 flex items-center justify-center gap-2 py-2 rounded-full mt-4 border border-dashed border-neutral-200/40">
            <p className="text-sm text-neutral-400">Add a new image</p>
            <Plus className="text-sm text-neutral-400" />
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
                  {(selectedVenue?.averageRating ?? 4.8).toFixed(1)} •{" "}
                  {reviewsArr.length} reviews
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h1 className="text-3xl font-semibold">
                ₹{selectedVenue?.price ?? "—"}
              </h1>
              <p className="text-base text-neutral-400">Per Night</p>
              <button className="mt-3 px-3 py-1 rounded-full bg-emerald-500/30 text-sm">
                Publish
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-base text-neutral-200 mt-2">
              {selectedVenue?.description ?? "Description"}
            </p>
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

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-neutral-800/50 p-4 rounded-2xl">
              <h1 className="text-sm font-semibold">Avg Rating</h1>
              <p className="text-2xl font-semibold">
                {(selectedVenue?.averageRating ?? 4.8).toFixed(1)}
              </p>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-2xl">
              <h1 className="text-sm font-semibold">Upcoming Events</h1>
              <p className="text-2xl font-semibold">{bookingsArr.length}</p>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-2xl">
              <h1 className="text-sm font-semibold">Occupancy</h1>
              <p className="text-2xl font-semibold">72%</p>
            </div>
          </div>

          {/* Upcoming bookings */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
              <button className="text-sm text-neutral-400">View all</button>
            </div>

            <div className="mt-3 space-y-3">
              {bookingsArr.map((b) => (
                <div
                  key={b.id ?? b._id}
                  className="flex items-center justify-between bg-neutral-900/30 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{b.name ?? "Guest"}</p>
                    <p className="text-sm text-neutral-400">
                      {b.date} · {b.pax ?? "—"} pax
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {b.status ?? "Pending"}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button className="px-3 py-1 rounded-md bg-emerald-600/30 text-sm">
                        Confirm
                      </button>
                      <button className="px-3 py-1 rounded-md bg-neutral-700/40 text-sm">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {bookingsArr.length === 0 && (
                <div className="text-neutral-400 p-3">No upcoming bookings</div>
              )}
            </div>
          </div>

          {/* Availability calendar placeholder */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Availability</h3>
            <div className="mt-3 h-40 rounded-lg border border-neutral-700 flex items-center justify-center text-neutral-500">
              {/* Replace with a real calendar component later */}
              Calendar component placeholder
            </div>
          </div>

          {/* Gallery grid */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Gallery</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {imagesArr.slice(0, 6).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
              <div className="flex items-center justify-center border border-dashed rounded-md text-neutral-400">
                <button className="flex items-center gap-2">
                  <Plus /> Add
                </button>
              </div>
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
        <div className="h-16 w-full" />
      </div>
    </div>
  );
};

export default OwnerVenueDetails;
