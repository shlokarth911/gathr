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
import EditVenueDetails from "./EditVenueDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const OwnerVenueDetails = ({
  selectedVenue = null,
  reviews: fallbackReviews = [],
  bookings: fallbackBookings = [],
  amenities: fallbackAmenities = [],
  images: fallbackImages = [],
  setIsOwnerVenueDetailsOpen,
  // New prop: A function to call when the venue is successfully updated
  onVenueUpdated,
}) => {
  const editingPannelRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  // Helper to safely extract image URLs
  const normalizeImages = (imgArr) => {
    if (!Array.isArray(imgArr)) return [];
    // Ensure we handle both string URLs and objects with a 'url' or 'secure_url'
    return imgArr
      .map((it) =>
        typeof it === "string" ? it : it?.url ?? it?.secure_url ?? ""
      )
      .filter(Boolean);
  };

  const imagesArr =
    normalizeImages(
      (selectedVenue?.images ?? selectedVenue?.img ?? fallbackImages) || []
    ) || [];

  const amenitiesArr = selectedVenue?.amenities ?? fallbackAmenities ?? [];
  const bookingsArr = selectedVenue?.bookings ?? fallbackBookings ?? [];
  const reviewsArr = selectedVenue?.reviews ?? fallbackReviews ?? [];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOwnerVenueDetailsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsOwnerVenueDetailsOpen]);

  // GSAP animation for the editing panel
  useGSAP(() => {
    if (isEditing) {
      gsap.to(editingPannelRef.current, {
        x: 0,
        duration: 0.5,
        ease: "expo.out",
      });
    } else {
      gsap.to(editingPannelRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "expo.out",
      });
    }
  }, [isEditing]);

  const cities = [
    "New York",
    "San Francisco",
    "Los Angeles",
    "Chicago",
    "Houston",
  ];

  // Simple "loading" or empty-state guard
  if (!selectedVenue) {
    return (
      <div className="fixed left-0 right-0 bottom-0 h-screen bg-neutral-950/75 w-full backdrop-blur-lg">
        <div className="h-full flex items-center justify-center text-neutral-400">
          No venue selected
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed left-0 right-0 bottom-0 h-screen bg-neutral-950/75 w-full backdrop-blur-lg shadow-2xl">
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
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-full bg-neutral-800"
                aria-label="Edit venue details"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => {
                  setIsOwnerVenueDetailsOpen(false);
                }}
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
              <ImageCarousel images={imagesArr} />
            </div>
            {/* Add a new image button (Placeholder for function) */}
            <button
              className="w-full bg-neutral-700/50 flex items-center justify-center gap-2 py-2 rounded-full mt-4 border border-dashed border-neutral-200/40"
              onClick={() => setIsEditing(true)} // Can direct to edit panel for image upload
            >
              <p className="text-sm text-neutral-400">Add a new image</p>
              <Plus className="text-sm text-neutral-400" />
            </button>

            {/* Name and basic details*/}
            <div className="py-5 flex items-center justify-between border-b border-neutral-700/50">
              <div>
                <h1 className="text-3xl font-semibold">
                  {selectedVenue?.name ?? "Mount View"}
                </h1>
                {selectedVenue?.address && (
                  <p className="text-lg text-neutral-400">
                    {selectedVenue.address}
                  </p>
                )}
                <p className="text-base text-neutral-400 mt-1 mb-1">
                  {selectedVenue?.city ?? "City"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
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
                <button className="mt-3 px-3 py-1 rounded-full bg-emerald-500/30 text-sm text-emerald-300 hover:bg-emerald-500/50">
                  Publish
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="pt-5 border-b border-neutral-700/50 pb-5">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-base text-neutral-200 mt-2 whitespace-pre-wrap">
                {selectedVenue?.description ?? "Description"}
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-6 border-b border-neutral-700/50 pb-5">
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {amenitiesArr.length > 0 ? (
                  amenitiesArr.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1 rounded-full bg-neutral-800/40 text-sm text-neutral-300 border border-neutral-700"
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
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700/50">
                <h1 className="text-sm font-semibold text-neutral-400">
                  Avg Rating
                </h1>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <p className="text-2xl font-semibold">
                    {(selectedVenue?.averageRating ?? 4.8).toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700/50">
                <h1 className="text-sm font-semibold text-neutral-400">
                  Capacity
                </h1>
                <p className="text-2xl font-semibold mt-1">
                  {selectedVenue?.capacity ?? "—"}
                </p>
              </div>
              <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700/50">
                <h1 className="text-sm font-semibold text-neutral-400">
                  Upcoming Bookings
                </h1>
                <p className="text-2xl font-semibold mt-1">
                  {bookingsArr.length}
                </p>
              </div>
            </div>

            {/* Gallery grid */}
            <div className="mt-6 border-b border-neutral-700/50 pb-5">
              <h3 className="text-lg font-semibold">
                Gallery ({imagesArr.length} images)
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imagesArr.slice(0, 5).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`gallery-${i}`}
                    className="w-full h-24 object-cover rounded-md hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => setIsEditing(true)} // Click to manage images
                  />
                ))}
                <div className="flex items-center justify-center border border-dashed rounded-md text-neutral-400 border-neutral-600/50">
                  <button
                    className="flex flex-col items-center gap-1 text-sm p-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Plus size={20} /> Manage All
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6 pb-6">
              <h3 className="text-lg font-semibold">
                Recent Reviews ({reviewsArr.length})
              </h3>
              <div className="mt-3 space-y-3">
                {reviewsArr.length > 0 ? (
                  reviewsArr.slice(0, 3).map(
                    (
                      r // Show max 3 reviews
                    ) => (
                      <div
                        key={r.id ?? r._id ?? Math.random()}
                        className="bg-neutral-900/30 p-4 rounded-lg border border-neutral-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">
                              {r.user ?? r.name ?? "Guest User"}
                            </p>
                            <p className="text-sm text-yellow-400 mt-1">
                              {"★".repeat(r.rating ?? 0)}
                              <span className="text-neutral-500">
                                {"★".repeat(5 - (r.rating ?? 0))}
                              </span>
                            </p>
                          </div>
                          <div className="text-xs text-neutral-400">
                            {r.when ?? "A while ago"}
                          </div>
                        </div>
                        <p className="mt-2 text-neutral-300 text-sm italic">
                          "{r.text ?? "No comment provided."}"
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-neutral-400 p-3">No reviews yet.</div>
                )}
              </div>
            </div>
          </div>
          <div className="h-16 w-full" />
        </div>
      </div>

      <div
        ref={editingPannelRef}
        className="fixed top-0 right-0 z-50 h-screen w-full md:w-1/2 lg:w-1/3 bg-neutral-900/90 backdrop-blur-xl overflow-y-auto shadow-2xl "
        style={{ transform: "translateX(100%)" }}
        aria-hidden={!isEditing}
      >
        <EditVenueDetails
          selectedVenue={selectedVenue}
          setIsEditing={setIsEditing}
          cities={cities}
          onUpdated={onVenueUpdated} // Pass the update handler
        />
      </div>
    </div>
  );
};

export default OwnerVenueDetails;
