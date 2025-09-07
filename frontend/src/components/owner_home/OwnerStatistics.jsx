// OwnerStatistics.jsx
import React, { useEffect, useMemo, useRef } from "react";
import { Star, Users, DollarSign, BarChart } from "lucide-react";
import gsap from "gsap";

/**
 * OwnerStatistics
 *
 * Props:
 *  - stats: {
 *      avgRating: number,
 *      totalBookings: number,
 *      revenueMonth: number,
 *      occupancyRate: number (0-100),
 *      newReviews: number,
 *      upcomingBookings: number,
 *      conversion: number (0-100),
 *      revenueSeries: number[]  // for sparkline
 *    }
 *
 * Mobile-first, uses Tailwind classes. GSAP animations respect prefers-reduced-motion.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function formatCurrency(amount = 0) {
  // simple formatter — replace with Intl if you want localization
  return `₹${Number(amount).toLocaleString()}`;
}

/* quick SVG sparkline path generator */
function buildSparklinePath(values, width = 240, height = 48, padding = 4) {
  if (!values || values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = (width - padding * 2) / (values.length - 1 || 1);

  return values
    .map((v, i) => {
      const x = padding + i * step;
      const y = padding + (1 - (v - min) / range) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function OwnerStatistics({
  stats = {
    avgRating: 4.7,
    totalBookings: 27,
    revenueMonth: 125000,
    occupancyRate: 68,
    newReviews: 5,
    upcomingBookings: 3,
    conversion: 4.5,
    revenueSeries: [8, 12, 10, 14, 16, 18, 22, 20, 24, 30, 28, 36],
  },
}) {
  const rootRef = useRef(null);
  const sparkRef = useRef(null);

  const sparkPath = useMemo(
    () => buildSparklinePath(stats.revenueSeries, 260, 56, 6),
    [stats.revenueSeries]
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // entrance for KPI cards & quick insights
      gsap.from(rootRef.current.querySelectorAll(".stat-block"), {
        y: 10,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: "power3.out",
      });

      // stroke-draw for sparkline
      const path = sparkRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [sparkPath]);

  return (
    <section ref={rootRef} className="px-7 py-4">
      <h1 className="text-xl font-bold">Statistics</h1>

      {/* KPI grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Avg Rating */}
        <div
          className="stat-block rounded-2xl p-3 bg-neutral-800/40 backdrop-blur-sm border border-white/5"
          role="region"
          aria-label="Average rating"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-neutral-200">
                Average Rating
              </h2>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold">
                <span>{Number(stats.avgRating || 0).toFixed(1)}</span>
                <Star fill="#FFD166" color="#FFD166" size={18} />
              </p>
            </div>
            <div className="text-xs text-neutral-400">last 30 days</div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="stat-block rounded-2xl p-3 bg-neutral-800/40 backdrop-blur-sm border border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-neutral-200">
                Total Bookings
              </h2>
              <p className="mt-2 text-2xl font-bold">
                {stats.totalBookings ?? 0}
              </p>
            </div>
            <div className="text-xs text-neutral-400">since last month</div>
          </div>
        </div>

        {/* Revenue (wide visual) */}
        <div className="stat-block col-span-2 mt-1 rounded-2xl p-3 bg-neutral-800/30 border border-white/5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-200">
                Revenue (this month)
              </h2>
              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(stats.revenueMonth)}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Payments processed: {stats.totalBookings ?? 0}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-sm font-medium">
                <DollarSign size={14} /> Monthly
              </div>
            </div>
          </div>

          {/* sparkline */}
          <div className="mt-3">
            <svg
              width="100%"
              viewBox="0 0 260 56"
              className="w-full h-14"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* area fill for subtle visual */}
              <path
                d={`${sparkPath} L 254 54 L 6 54 Z`}
                fill="rgba(67,255,29,0.06)"
                stroke="none"
                opacity="0.9"
              />
              {/* sparkline stroke */}
              <path
                ref={sparkRef}
                d={sparkPath}
                fill="none"
                stroke="#43ff1d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />
            </svg>

            <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
              <span>Last 12 periods</span>
              <span className="text-neutral-300 font-medium">
                {formatCurrency(stats.revenueMonth)}
              </span>
            </div>
          </div>
        </div>

        {/* Occupancy */}
        <div className="stat-block rounded-2xl p-3 bg-neutral-800/40 backdrop-blur-sm border border-white/5">
          <h2 className="text-sm font-semibold text-neutral-200">Occupancy</h2>
          <div className="mt-3 flex items-center gap-3">
            {/* circular progress (simple) */}
            <div className="w-14 h-14 flex items-center justify-center relative">
              <svg viewBox="0 0 36 36" className="w-14 h-14">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="#43ff1d"
                  strokeWidth="3"
                  strokeDasharray={`${(stats.occupancyRate ?? 0) * 1.0} ${100}`}
                  strokeDashoffset="25"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {Math.round(stats.occupancyRate ?? 0)}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-200">
                Space occupied
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Compared to capacity
              </p>
            </div>
          </div>
        </div>

        {/* Quick insights */}
        <div className="stat-block col-span-2 mt-1 rounded-2xl p-3 bg-neutral-800/30 border border-white/5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-neutral-900/30">
                <Star size={18} />
              </div>
              <div>
                <p className="text-xs text-neutral-400">New reviews</p>
                <p className="text-lg font-semibold">{stats.newReviews ?? 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-neutral-900/30">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Upcoming</p>
                <p className="text-lg font-semibold">
                  {stats.upcomingBookings ?? 0}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-neutral-900/30">
                <BarChart size={18} />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Conversion</p>
                <p className="text-lg font-semibold">
                  {(stats.conversion ?? 0).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-3">
            Tip: Increase visibility by adding seasonal discounts on
            low-occupancy days.
          </p>
        </div>
      </div>
    </section>
  );
}
