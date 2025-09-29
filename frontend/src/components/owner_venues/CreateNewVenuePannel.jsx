import React, { useState, useEffect, useRef } from "react";
import { X, Check, Plus } from "lucide-react";

/**
 * CreateNewVenuePannel (fixed & simplified)
 * - Direct client -> Cloudinary unsigned uploads (no multer/streamifier)
 * - Clear error handling for missing env vars or unsigned preset
 * - Simple UI state: isSubmitting disables the form during uploads
 * - After successful save, form resets and selected images are cleaned up
 *
 * Required Vite env vars (add to .env and restart dev server):
 * VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 * VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
 * VITE_BASE_URL=http://localhost:4000   (or your API base)
 */

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

const CreateNewVenuePannel = ({ setIsCreateNewVenuePannelOpen } = {}) => {
  // separate state for each field
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const [amenities, setAmenities] = useState(DEFAULT_AMENITIES);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenity, setCustomAmenity] = useState("");

  const [selectedImages, setSelectedImages] = useState([]); // {id, file, url}
  const fileRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [selectedImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newObjs = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...newObjs]);
    if (fileRef.current) fileRef.current.value = null;
  };

  const removeImage = (id) => {
    setSelectedImages((prev) => {
      const toRemove = prev.find((p) => p.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const toggleAmenity = (name) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (!trimmed) return;
    if (!amenities.includes(trimmed)) setAmenities((p) => [trimmed, ...p]);
    if (!selectedAmenities.includes(trimmed))
      setSelectedAmenities((p) => [trimmed, ...p]);
    setCustomAmenity("");
  };

  // Upload a single file to Cloudinary (unsigned preset)
  async function uploadSingleFileToCloudinary(file) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) {
      throw new Error(
        "Missing Cloudinary config. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env and restart the dev server."
      );
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", preset);

    const res = await fetch(url, { method: "POST", body: fd });
    const text = await res.text();

    // Cloudinary returns JSON on success and JSON error on failure — try parse
    let json = null;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.log(e);
      throw new Error(
        `Cloudinary upload failed: ${res.status} ${res.statusText}`
      );
    }

    if (!res.ok) {
      const errMsg =
        json?.error?.message ||
        json?.message ||
        text ||
        "Cloudinary upload failed";
      // Provide a helpful error when preset isn't unsigned
      if (
        errMsg.toLowerCase().includes("upload preset must be whitelisted") ||
        errMsg.toLowerCase().includes("unsigned")
      ) {
        throw new Error(
          `Cloudinary preset error: ${errMsg}. Make sure your upload preset is set to 'Unsigned' in the Cloudinary dashboard (Settings → Upload → Upload presets).`
        );
      }
      throw new Error(`Cloudinary upload failed: ${errMsg}`);
    }

    return json; // contains secure_url, public_id, etc.
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 1) upload images (if any)
      const files = (selectedImages || []).map((s) => s.file).filter(Boolean);

      let cloudResponses = [];
      if (files.length > 0) {
        // Concurrent uploads for speed — fine for a few files
        cloudResponses = await Promise.all(
          files.map((f) => uploadSingleFileToCloudinary(f))
        );
      }

      // map to the shape we want to save in DB
      const imageObjs = cloudResponses.map((r) => ({
        url: r.secure_url,
        public_id: r.public_id,
        width: r.width,
        height: r.height,
        format: r.format,
      }));

      // 2) send venue data + imageUrls to server as JSON
      const payload = {
        name,
        address,
        capacity,
        price,
        city,
        description,
        amenities: selectedAmenities || [],
        images: imageObjs,
      };

      const base = import.meta.env.VITE_BASE_URL || "";
      const token = localStorage.getItem("owner_token");
      const res = await fetch(`${base}/venue/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const serverMessage =
          data?.message || data?.error || `Server responded ${res.status}`;
        throw new Error(serverMessage);
      }

      // success: reset form
      setName("");
      setAddress("");
      setCapacity("");
      setPrice("");
      setDescription("");
      setSelectedAmenities([]);

      // revoke existing object URLs and clear state
      selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
      setSelectedImages([]);

      console.log("Saved venue", data?.venue || data);

      setIsCreateNewVenuePannelOpen(false);
    } catch (err) {
      console.error("submit error", err);
      alert(err.message || "Upload/save failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco",
    "Seattle",
    "Boston",
    "Washington D.C.",
    "Atlanta",
    "Dallas",
  ];

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add a new venue</h1>
        <button
          type="button"
          onClick={() => setIsCreateNewVenuePannelOpen(false)}
          aria-label="Close panel"
          className="bg-neutral-600/50 cursor-pointer rounded-full p-2"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-2 mt-5">
        {/* Basic info */}
        <div>
          <label className="text-base">
            <span className="font-semibold text-lg">1.</span> Venue name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder="Venue name"
            className="w-full p-3 mt-2 rounded-xl bg-neutral-900/40 text-white placeholder:text-neutral-400 outline-none border border-white/30"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="text-base">
            <span className="font-semibold text-lg">2.</span> Venue address
          </label>
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            required
            placeholder="Venue address"
            className="w-full p-3 mt-2 rounded-xl bg-neutral-900/40 text-white placeholder:text-neutral-400 outline-none border border-white/30"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-base">
              <span className="font-semibold text-lg">3.</span> Average capacity
            </label>
            <input
              name="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              required
              placeholder="e.g. 200"
              className="w-full p-3 mt-2 rounded-xl bg-neutral-900/40 text-white placeholder:text-neutral-400 outline-none border border-white/30"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="text-base">
              <span className="font-semibold text-lg">4.</span> Average price
              (per day)
            </label>
            <input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              required
              placeholder="e.g. 35000"
              className="w-full p-3 mt-2 rounded-xl bg-neutral-900/40 text-white placeholder:text-neutral-400 outline-none border border-white/30"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="text-base">
            <span className="font-semibold text-lg">5.</span> Short description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
            placeholder="One-paragraph description of the venue"
            className="w-full p-3 mt-2 rounded-xl bg-neutral-900/40 text-white placeholder:text-neutral-400 outline-none border border-white/30"
            disabled={isSubmitting}
          />
        </div>

        {/* Amenities selector */}
        <div>
          <label className="text-base">
            <span className="font-semibold text-lg">6.</span> Amenities
          </label>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {amenities.map((a) => {
              const selected = selectedAmenities.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm border transition-all focus:outline-none ${
                    selected
                      ? "bg-emerald-600/90 text-white border-emerald-600 shadow-lg"
                      : "bg-neutral-900/30 text-neutral-200 border-white/10"
                  }`}
                  disabled={isSubmitting}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {selected ? <Check size={14} /> : <Plus size={14} />}
                  </span>
                  <span className="truncate">{a}</span>
                </button>
              );
            })}

            <div className="col-span-full sm:col-auto flex gap-2 items-center mt-2">
              <input
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCustomAmenity())
                }
                placeholder="Add custom amenity (press Enter)"
                className="flex-1 p-2 rounded-xl bg-neutral-900/30 placeholder:text-neutral-400 outline-none border border-white/10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="rounded-xl px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-3 text-sm text-neutral-400">
            {selectedAmenities.length} selected
          </div>
        </div>

        {/* Cities dropdown */}
        <div>
          <label className="text-base">
            <span className="font-semibold text-lg">7.</span> City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full mt-2 py-3 px-4 rounded-xl bg-neutral-900/40 text-white placeholder:text-neutral-400 outline-none border border-white/30"
          >
            <option className="bg-neutral-800" value="" disabled>
              Select city
            </option>
            {cities.map((city) => (
              <option className="bg-neutral-800" key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Image uploader & preview */}
        <div>
          <label className="text-base">
            <span className="font-semibold text-lg">8.</span> Upload images
          </label>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full bg-neutral-900/40 text-neutral-400 outline-none border border-white/30 rounded-xl py-8 px-8 border-dashed mt-3"
            disabled={isSubmitting}
          />

          <div className="mt-6 w-full">
            <h4 className="mb-3 font-medium">Preview</h4>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedImages.length === 0 && (
                <div className="col-span-full text-neutral-400">
                  No images selected yet — choose files above to preview (16:9
                  aspect).
                </div>
              )}

              {selectedImages.map((img) => (
                <div
                  key={img.id}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-neutral-900/30 border border-white/10"
                >
                  {/* 16:9 container using padding-top trick */}
                  <div className="relative w-full pt-[56.25%]">
                    <img
                      src={img.url}
                      alt={img.file.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* overlay: filename + size */}
                  <div className="absolute left-2 right-2 bottom-2 flex items-center justify-between text-xs">
                    <div className="bg-black/50 backdrop-blur px-2 py-1 rounded text-white truncate max-w-[70%]">
                      {img.file.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-black/40 px-2 py-1 rounded text-white text-[11px]">
                        {Math.round(img.file.size / 1024)} KB
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-1 rounded-full bg-black/40 hover:bg-black/60"
                        disabled={isSubmitting}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-5 w-full py-3 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Create venue"}
          </button>
        </div>
      </form>

      <div className="h-23" />
    </div>
  );
};

export default CreateNewVenuePannel;
