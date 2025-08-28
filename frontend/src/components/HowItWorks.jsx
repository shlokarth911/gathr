// HowItWorks.jsx
import React from "react";

/**
 * HowItWorks
 * Props:
 * - role: 'attendee' | 'owner' | 'unified'
 * - onPrimary: fn when CTA clicked
 */
export default function HowItWorks({
  role = "attendee",
  onPrimary = () => {},
}) {
  const configs = {
    attendee: {
      title: "How it works — for attendees",
      subtitle: "Find venues, add services, book securely and enjoy the event.",
      cta: "Find venues",
      steps: [
        { id: 1, title: "Discover", desc: "Browse verified venues & vendors" },
        { id: 2, title: "Book", desc: "Choose date, add extras, pay securely" },
        { id: 3, title: "Enjoy", desc: "Show up and have a great time" },
      ],
    },
    owner: {
      title: "How it works — for owners",
      subtitle:
        "List your space, get verified and manage bookings effortlessly.",
      cta: "List your venue",
      steps: [
        { id: 1, title: "List", desc: "Add photos, details & availability" },
        {
          id: 2,
          title: "Verify",
          desc: "Quick verification for trust & badges",
        },
        { id: 3, title: "Manage", desc: "Accept bookings & track payouts" },
      ],
    },
    unified: {
      title: "How Gathr works",
      subtitle:
        "Find venues, hire vendors, and plan events — all in one place.",
      cta: "Get started",
      steps: [
        { id: 1, title: "Search", desc: "Find venues & services nearby" },
        { id: 2, title: "Book", desc: "Select date and add services" },
        {
          id: 3,
          title: "Confirm",
          desc: "Pay securely and receive confirmation",
        },
      ],
    },
  };

  const cfg = configs[role] || configs.attendee;

  return (
    <section className="px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-white">{cfg.title}</h2>
        <p className="mt-2 text-sm text-neutral-300 max-w-2xl">
          {cfg.subtitle}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cfg.steps.map((s) => (
            <div
              key={s.id}
              className="how-step bg-neutral-800 rounded-2xl p-4 flex items-start gap-3 hover:shadow-lg transition-shadow"
              role="article"
            >
              <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center text-lg font-semibold text-white/90">
                {s.id}
              </div>
              <div>
                <div className="text-base font-medium text-white">
                  {s.title}
                </div>
                <div className="text-sm text-neutral-300 mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={onPrimary}
            className="bg-[#43ff1d] text-black rounded-full px-6 py-3 font-semibold shadow hover:scale-[1.02] focus:outline-none"
          >
            {cfg.cta}
          </button>

          <div className="text-xs text-neutral-400 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center">
                🔒
              </span>
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center">
                ✔️
              </span>
              <span>Verified hosts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
