import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Building2,
  Shield,
  Search,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  DollarSign
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Discover Perfect Venues",
      description: "Browse through a diverse collection of venues tailored to your event needs. Filter by location, capacity, and amenities."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Booking System",
      description: "Request bookings instantly with our streamlined process. Specify your event details, date, time, and guest count."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Venue Management",
      description: "For venue owners: List, manage, and update your properties with ease. Upload images, set pricing, and manage availability."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Authentication",
      description: "Your data is protected with JWT-based authentication. Separate secure portals for attendees and venue owners."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up as an attendee looking for venues or as an owner to list your properties.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Explore or List Venues",
      description: "Attendees can browse and filter venues. Owners can create detailed listings with images and amenities.",
      icon: <Search className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Make or Receive Bookings",
      description: "Attendees send booking requests. Owners review and confirm bookings through their dashboard.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Manage Everything",
      description: "Track bookings, update profiles, and manage all your event planning or venue operations in one place.",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const attendeeFeatures = [
    "Browse extensive venue listings",
    "Advanced search and filtering",
    "View detailed venue information and images",
    "Request bookings with event details",
    "Track all your bookings in one place",
    "Manage your profile and preferences"
  ];

  const ownerFeatures = [
    "List unlimited venues",
    "Upload multiple venue images",
    "Set custom pricing and capacity",
    "Manage venue availability status",
    "Review and confirm booking requests",
    "View booking statistics and history"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <nav className="bg-black/40 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-[#1DB954]" />
              <span className="text-2xl font-bold text-white">VenueBook</span>
            </div>
            <button
              onClick={() => navigate("/onboard")}
              className="bg-[#1DB954] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#1ed760] transition-all duration-200 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Find Your Perfect Event Venue
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform connecting event planners with exceptional venues.
            Whether you're hosting or listing, we make venue booking effortless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/attendee/register")}
              className="bg-[#1DB954] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#1ed760] transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
            >
              Find a Venue
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/owner/register")}
              className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#1DB954] hover:bg-[#1DB954]/20 transition-all duration-200 hover:scale-105"
            >
              List Your Venue
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50 hover:border-[#1DB954]/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-[#1DB954] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black/40 backdrop-blur-xl py-16 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50 hover:border-[#1DB954]/50 transition-all duration-300 hover:scale-105">
                  <div className="bg-[#1DB954] text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="text-[#1DB954] mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Built for Everyone
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1DB954] to-[#169c46] p-8 rounded-xl backdrop-blur-xl border border-[#1DB954]/30 hover:scale-105 transition-all duration-300">
            <Users className="w-12 h-12 mb-4 text-black" />
            <h3 className="text-3xl font-bold mb-4 text-black">For Attendees</h3>
            <p className="mb-6 text-gray-900 leading-relaxed">
              Planning an event? Find the perfect venue with all the amenities you need.
            </p>
            <ul className="space-y-3">
              {attendeeFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-black">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/attendee/register")}
              className="mt-6 bg-black text-[#1DB954] px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-200 w-full hover:scale-105"
            >
              Sign Up as Attendee
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50 hover:border-[#1DB954]/50 hover:scale-105 transition-all duration-300">
            <Building2 className="w-12 h-12 mb-4 text-[#1DB954]" />
            <h3 className="text-3xl font-bold mb-4 text-white">For Venue Owners</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Own a venue? Reach more customers and manage bookings efficiently.
            </p>
            <ul className="space-y-3">
              {ownerFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-200">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#1DB954]" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/owner/register")}
              className="mt-6 bg-[#1DB954] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#1ed760] transition-all duration-200 w-full hover:scale-105"
            >
              Sign Up as Owner
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1DB954] to-[#169c46] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-black">
            <div className="group hover:scale-105 transition-transform duration-300">
              <MapPin className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-2">Multiple Cities</h3>
              <p className="text-gray-900">Find venues across various locations</p>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <Clock className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-2">Quick Booking</h3>
              <p className="text-gray-900">Get responses to your requests fast</p>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <DollarSign className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-900">See all costs upfront, no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Join thousands of event planners and venue owners who trust VenueBook
          for their event management needs.
        </p>
        <button
          onClick={() => navigate("/onboard")}
          className="bg-[#1DB954] text-black px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#1ed760] transition-all duration-200 inline-flex items-center gap-2 hover:scale-105"
        >
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      <footer className="bg-black/60 backdrop-blur-xl border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building2 className="w-6 h-6 text-[#1DB954]" />
              <span className="text-xl font-bold text-white">VenueBook</span>
            </div>
            <p className="text-gray-400">
              Making event venue booking simple and efficient
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
