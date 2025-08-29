// AttendeeProfile.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Edit3,
  LogOut,
  CreditCard,
  MapPin,
  UserCheck,
} from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const AttendeeProfile = ({ initialUser = null }) => {
  const navigate = useNavigate();

  // sample fallback data when not provided
  const defaultUser = {
    id: "u_123",
    name: "Alex Morgan",
    email: "alex@example.com",
    phone: "+91 98765 43210",
    city: "Ranchi",
    avatar: "", // put avatar url if available
    verified: true,
    stats: { bookings: 3, favorites: 12, listings: 1 },
  };

  // refs used by animations / interactions
  const rootRef = useRef(null);
  const avatarRef = useRef(null);
  const saveBtnRef = useRef(null);

  // reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [user, setUser] = useState(initialUser || defaultUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: (initialUser || defaultUser).name,
    email: (initialUser || defaultUser).email,
    phone: (initialUser || defaultUser).phone,
    city: (initialUser || defaultUser).city,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        y: 8,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      });

      const statCards = rootRef.current.querySelectorAll(".stat-card");
      gsap.from([avatarRef.current, ...statCards], {
        y: 8,
        opacity: 0,
        stagger: 0.06,
        duration: 0.42,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // local-only avatar handler (no backend)
  const uploadAvatar = (file) => {
    // purely client-side preview (no network calls)
    const url = URL.createObjectURL(file);
    setUser((u) => ({ ...u, avatar: url }));
    // note: remember to revokeObjectURL when you replace or remove the image to avoid leaks
  };

  const onChangeField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // local save (no network). updates local state immediately.
  const saveProfile = () => {
    setSaving(true);
    setUser((u) => ({ ...u, ...form }));
    setEditing(false);
    setSaving(false);

    // micro-feedback via GSAP pulse on save button
    if (!prefersReducedMotion && saveBtnRef.current) {
      gsap.fromTo(
        saveBtnRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.28, ease: "elastic.out(1,0.8)" }
      );
    }
  };

  const signOut = () => {
    // local sign-out behavior: navigate to login (no network)
    navigate("/attendee/login");
  };

  return (
    <main
      ref={rootRef}
      className="min-h-screen bg-neutral-900 text-white px-4 pb-24 pt-3"
    >
      {/* top bar */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-white/4"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Profile</h1>
          <p className="text-xs text-neutral-400">
            Manage your account & settings
          </p>
        </div>

        <button
          aria-label="Edit profile"
          onClick={() => setEditing((v) => !v)}
          className="p-2 rounded-lg bg-white/4"
          title="Edit"
        >
          <Edit3 size={16} />
        </button>
      </div>

      {/* avatar + basic info */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative">
          <div
            ref={avatarRef}
            className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden"
            style={{
              boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
            }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl font-semibold text-neutral-50">
                {user.name?.[0] ?? "U"}
              </div>
            )}
          </div>

          {/* camera overlay (upload) */}
          <label
            htmlFor="avatar-upload"
            className="absolute -bottom-1 -right-1 bg-[#43ff1d] p-2 rounded-full border border-white/10 shadow-sm"
            title="Upload avatar"
          >
            <Camera size={14} color="#05120a" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadAvatar(f);
              }}
            />
          </label>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">{user.name}</h2>
            {user.verified && (
              <span className="flex items-center gap-1 text-xs text-[#43ff1d]">
                <UserCheck size={14} /> Verified
              </span>
            )}
          </div>

          <p className="text-sm text-neutral-300 mt-1">{user.email}</p>
          <p className="text-sm text-neutral-300 mt-0.5">{user.phone}</p>
        </div>
      </section>

      {/* stats */}
      <section className="mt-6 grid grid-cols-3 gap-3">
        <div className="stat-card rounded-2xl bg-neutral-800/60 p-3 text-center">
          <div className="text-sm text-neutral-300">Bookings</div>
          <div className="text-lg font-semibold mt-1">
            {user.stats.bookings}
          </div>
        </div>
        <div className="stat-card rounded-2xl bg-neutral-800/60 p-3 text-center">
          <div className="text-sm text-neutral-300">Favorites</div>
          <div className="text-lg font-semibold mt-1">
            {user.stats.favorites}
          </div>
        </div>
        <div className="stat-card rounded-2xl bg-neutral-800/60 p-3 text-center">
          <div className="text-sm text-neutral-300">Listings</div>
          <div className="text-lg font-semibold mt-1">
            {user.stats.listings}
          </div>
        </div>
      </section>

      {/* editable profile form (keeps structure small for mobile) */}
      <section className="mt-6">
        <div className="rounded-2xl bg-neutral-800/40 p-4">
          <label className="text-xs text-neutral-300">Full name</label>
          <input
            value={form.name}
            onChange={(e) => onChangeField("name", e.target.value)}
            disabled={!editing}
            className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
              editing ? "border-white/10" : "border-transparent"
            }`}
          />

          <label className="text-xs text-neutral-300 mt-3 block">Email</label>
          <input
            value={form.email}
            onChange={(e) => onChangeField("email", e.target.value)}
            disabled={!editing}
            className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
              editing ? "border-white/10" : "border-transparent"
            }`}
          />

          <div className="flex gap-3 mt-3">
            <div className="flex-1">
              <label className="text-xs text-neutral-300">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => onChangeField("phone", e.target.value)}
                disabled={!editing}
                className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
                  editing ? "border-white/10" : "border-transparent"
                }`}
              />
            </div>
            <div className="w-28">
              <label className="text-xs text-neutral-300">City</label>
              <input
                value={form.city}
                onChange={(e) => onChangeField("city", e.target.value)}
                disabled={!editing}
                className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
                  editing ? "border-white/10" : "border-transparent"
                }`}
              />
            </div>
          </div>

          {/* actions */}
          <div className="mt-4 flex items-center gap-3">
            {editing ? (
              <>
                <button
                  ref={saveBtnRef}
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex-1 py-3 rounded-full font-semibold"
                  style={{
                    background:
                      "linear-gradient(90deg,#43ff1d 0%,#36d115 100%)",
                    color: "#05120a",
                  }}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      city: user.city,
                    });
                  }}
                  className="py-3 px-4 rounded-full bg-white/4"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="flex-1 py-3 rounded-full font-semibold bg-white/5"
                >
                  Edit profile
                </button>
                <button
                  onClick={() => navigate("/attendee/bookings")}
                  className="py-3 px-4 rounded-full bg-white/4"
                >
                  My bookings
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* quick links */}
      <section className="mt-5 space-y-3">
        <button
          onClick={() => navigate("/attendee/listings")}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-800/30"
        >
          <span>My listings</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigate("/attendee/payment-methods")}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-800/30"
        >
          <span>Payment methods</span>
          <CreditCard size={18} />
        </button>

        <button
          onClick={() => navigate("/attendee/verify")}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-800/30"
        >
          <span>Verification</span>
          <MapPin size={18} />
        </button>

        <button
          onClick={signOut}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-red-600/80 text-white"
        >
          <span>Sign out</span>
          <LogOut size={18} />
        </button>
      </section>

      <div className="h-32" />
    </main>
  );
};

export default AttendeeProfile;
