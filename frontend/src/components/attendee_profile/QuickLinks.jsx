import { ArrowRight, CreditCard, MapPin, LogOut } from "lucide-react";

const QuickLinks = ({ navigate, signOut }) => {
  return (
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
  );
};

export default QuickLinks;
