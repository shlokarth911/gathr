import { Check, Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
// Assuming updateVenueDetails exists and takes data and venueId
// import { updateVenueDetails } from "../../api/venueApi";

// Mock for updateVenueDetails for demonstration
const updateVenueDetails = async (data, venueId) => {
  console.log(`[API MOCK] Updating Venue ID ${venueId} with data:`, data);
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
  // Simulate API response structure
  return {
    success: true,
    venue: { ...data, _id: venueId, averageRating: 4.8 },
  };
};

const DEFAULT_AMENITIES = [
  "Accommodation",
  "Parking",
  "Pool",
  "Catering",
  "Free WiFi",
  "Banquet Hall",
  "Projector",
  "AC",
];

const EditVenueDetails = ({
  cities = [],
  setIsEditing,
  selectedVenue = null,
  onUpdated, // optional callback: (updatedVenue) => {}
}) => {
  const [name, setName] = useState(() => selectedVenue?.name ?? "");
  const [address, setAddress] = useState(() => selectedVenue?.address ?? "");
  const [capacity, setCapacity] = useState(() => selectedVenue?.capacity ?? "");
  const [price, setPrice] = useState(() => selectedVenue?.price ?? "");
  const [city, setCity] = useState(() => selectedVenue?.city ?? "");
  const [description, setDescription] = useState(
    () => selectedVenue?.description ?? ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [amenities] = useState(DEFAULT_AMENITIES);
  const [selectedAmenities, setSelectedAmenities] = useState(
    () => selectedVenue?.amenities ?? []
  );
  const [customAmenity, setCustomAmenity] = useState("");

  // selectedImages structure: { id, file (File|null), url, public_id (for existing) }
  const [selectedImages, setSelectedImages] = useState(() => {
    if (selectedVenue?.images?.length) {
      return selectedVenue.images.map((img) => ({
        // Use public_id for 'id' if available, otherwise fallback to URL
        id: img.public_id ?? img.url ?? img.secure_url,
        file: null, // null means it's an existing image, not a new file
        url: img.url ?? img.secure_url,
        // Crucial: preserve the public_id for existing images
        public_id: img.public_id,
      }));
    }
    return [];
  });

  const fileRef = useRef(null);
  const createdObjectUrlsRef = useRef([]);

  // Sync local form state when selectedVenue changes
  useEffect(() => {
    if (!selectedVenue) {
      // Clear state if no venue is selected
      setName("");
      setAddress("");
      setCapacity("");
      setPrice("");
      setCity("");
      setDescription("");
      setSelectedAmenities([]);
      setSelectedImages([]);
      return;
    }

    setName(selectedVenue?.name ?? "");
    setAddress(selectedVenue?.address ?? "");
    setCapacity(selectedVenue?.capacity ?? 100);
    setPrice(selectedVenue?.price ?? "");
    setCity(selectedVenue?.city ?? "");
    setDescription(selectedVenue?.description ?? "");
    setSelectedAmenities(selectedVenue?.amenities ?? []);
    setError(null);

    // Re-populate selectedImages from venue data
    if (selectedVenue?.images?.length) {
      setSelectedImages(
        selectedVenue.images.map((img) => ({
          id: img.public_id ?? img.url ?? img.secure_url,
          file: null,
          url: img.url ?? img.secure_url,
          public_id: img.public_id, // Ensure public_id is preserved
        }))
      );
    } else {
      setSelectedImages([]);
    }

    // Revoke old object URLs and reset ref when a new venue loads
    createdObjectUrlsRef.current.forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch (e) {
        console.warn("Error revoking URL:", e);
      }
    });
    createdObjectUrlsRef.current = [];
  }, [selectedVenue]);

  // Revoke any remaining created object URLs on unmount
  useEffect(() => {
    return () => {
      createdObjectUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {
          e;
        }
      });
      createdObjectUrlsRef.current = [];
    };
  }, []);

  const toggleAmenity = (a) =>
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((p) => p !== a) : [...prev, a]
    );

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (!trimmed) return;
    if (!selectedAmenities.includes(trimmed))
      setSelectedAmenities((p) => [trimmed, ...p]);
    setCustomAmenity("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newObjs = files.map((file) => {
      const url = URL.createObjectURL(file);
      createdObjectUrlsRef.current.push(url);
      return {
        id: `${Date.now()}-${Math.random()}`,
        file,
        url,
        public_id: null, // New files don't have a public_id yet
      };
    });

    setSelectedImages((prev) => [...prev, ...newObjs]);
    if (fileRef.current) fileRef.current.value = null;
  };

  const removeImage = (id) => {
    setSelectedImages((prev) => {
      const toRemove = prev.find((p) => p.id === id);

      // Revoke the object URL if it was a newly added file
      if (toRemove?.file && toRemove.url) {
        try {
          URL.revokeObjectURL(toRemove.url);
        } catch (e) {
          e;
        }
        createdObjectUrlsRef.current = createdObjectUrlsRef.current.filter(
          (u) => u !== toRemove.url
        );
      }

      // Remove the image from the state
      return prev.filter((p) => p.id !== id);
    });
  };

  // Upload utility function (kept as is)
  async function uploadSingleFileToCloudinary(file) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) {
      throw new Error("Missing Cloudinary config in .env");
    }
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", preset);

    const res = await fetch(url, { method: "POST", body: fd });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.error?.message || "Cloudinary upload failed");
    }
    return json;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const venueId = selectedVenue?._id;
    if (!venueId) {
      setError("No venue selected to update.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Identify and upload newly added files (file !== null)
      const filesToUpload = (selectedImages || []).filter((s) => s.file);

      let cloudResponses = [];
      if (filesToUpload.length > 0) {
        cloudResponses = await Promise.all(
          filesToUpload.map((s) => uploadSingleFileToCloudinary(s.file))
        );
      }

      // 2. Format new uploaded objects
      const uploadedImageObjs = cloudResponses.map((r) => ({
        url: r.secure_url,
        public_id: r.public_id,
        width: r.width,
        height: r.height,
        format: r.format,
      }));

      // 3. Preserve existing images (file === null)
      // This is the FIX: We map the existing images back into the object structure
      // your backend expects, relying on the preserved public_id.
      const existingImageObjs = (selectedImages || [])
        .filter((s) => !s.file)
        .map((s) => ({
          url: s.url,
          public_id: s.public_id, // CRITICAL: Use the stored public_id
        }));

      // 4. Final images array: existing preserved + new uploads
      const finalImages = [...existingImageObjs, ...uploadedImageObjs];

      const venueData = {
        name,
        address,
        capacity: Number(capacity),
        price: Number(price),
        city,
        description,
        amenities: selectedAmenities,
        images: finalImages, // Send the full list of preserved and new images
      };

      const res = await updateVenueDetails(venueData, venueId);
      console.log("updated:", res);

      if (onUpdated && res?.venue) {
        onUpdated(res.venue);
      }

      // close editor
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "Failed to update venue details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between border-b pb-4 border-neutral-700">
          <h1 className="text-2xl font-semibold">Edit your venue</h1>
          <button
            onClick={() => setIsEditing(false)}
            aria-label="Close editor"
            className="p-2 rounded-full hover:bg-neutral-700"
          >
            <X />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
            Error: {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="mt-5 flex flex-col gap-4">
          {/* Name Input */}
          <div>
            <p className="text-base text-neutral-300">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full mt-1 bg-neutral-800 text-white text-lg p-3 rounded-2xl border border-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none"
              placeholder="Venue Name"
              required
            />
          </div>

          {/* Address, City, Capacity, Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-base text-neutral-300">Address</p>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="w-full mt-1 bg-neutral-800 text-white text-lg p-3 rounded-2xl border border-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Venue address"
                required
              />
            </div>

            <div>
              <p className="text-base text-neutral-300">City</p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mt-1 bg-neutral-800 text-white text-lg p-3 rounded-2xl border border-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none"
                required
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-base text-neutral-300">Capacity</p>
              <input
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                type="number"
                min="1"
                className="w-full mt-1 bg-neutral-800 text-white text-lg p-3 rounded-2xl border border-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Max capacity"
                required
              />
            </div>

            <div>
              <p className="text-base text-neutral-300">Price (₹)</p>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                className="w-full mt-1 bg-neutral-800 text-white text-lg p-3 rounded-2xl border border-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Price per night"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-base text-neutral-300">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 bg-neutral-800 text-white text-lg p-3 rounded-2xl min-h-28 border border-neutral-700 focus:ring-1 focus:ring-emerald-500 outline-none"
              placeholder="Detailed description of the venue"
              required
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="text-base text-neutral-300">Amenities</label>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Default Amenities */}
              {amenities.map((a) => {
                const selected = selectedAmenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-base transition-colors ${
                      selected
                        ? "bg-emerald-600/90 text-white"
                        : "bg-neutral-800/50 text-neutral-200 border border-neutral-700/50 hover:bg-neutral-700/50"
                    }`}
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      {selected ? <Check size={14} /> : <Plus size={14} />}
                    </span>
                    <span className="truncate">{a}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2 items-center mt-4">
              <input
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCustomAmenity())
                }
                placeholder="Add custom amenity (press Enter)"
                className="flex-1 p-3 rounded-xl bg-neutral-800 outline-none border border-neutral-700 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="rounded-xl px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="mt-3 text-sm text-neutral-400">
              {selectedAmenities.length} amenities selected
            </div>
          </div>

          {/* Image Upload and Preview */}
          <div className="pt-4 border-t border-neutral-700">
            <label className="text-base block mb-2">Manage Images</label>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full mt-3 border-dashed rounded-xl bg-neutral-800/30 border border-neutral-700 py-8 px-8 cursor-pointer"
            />

            <div className="mt-6 w-full">
              <h4 className="mb-3 font-medium">
                Image Preview ({selectedImages.length} total)
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedImages.length === 0 && (
                  <div className="col-span-full text-neutral-400 p-4 border rounded-xl border-neutral-700/50">
                    No images selected yet.
                  </div>
                )}

                {selectedImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative rounded-xl overflow-hidden shadow-lg bg-neutral-900/30 border border-neutral-700/50"
                  >
                    <div className="relative w-full pt-[56.25%]">
                      <img
                        src={img.url}
                        alt={img.file?.name ?? "venue image"}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          img.file ? "bg-blue-600" : "bg-emerald-600"
                        }`}
                      >
                        {img.file ? "NEW" : "EXISTING"}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-2 rounded-full bg-black/50 hover:bg-red-600/80 text-white transition-colors"
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="mt-6 w-full bg-emerald-600 text-xl py-3 rounded-full hover:bg-emerald-700 transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Venue"}
            </button>
          </div>
        </form>

        <div className="h-16 w-full" />
      </div>
    </div>
  );
};

export default EditVenueDetails;
