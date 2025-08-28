import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import {
  ArrowRight,
  Beer,
  Brush,
  Camera,
  Gem,
  Guitar,
  Home,
  MicVocal,
  Music2,
  Newspaper,
  Search,
  Settings,
  UserRound,
  Wand,
} from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AttendeeHomeHeader from "../components/AttendeeHomeHeader";
import AttendeeGreetings from "../components/AttendeeGreetings";
import CategoriesSection from "../components/CategoriesSection";
import TopVenues from "../components/TopVenues";
import TopCaterers from "../components/TopCaterers";
import AdditionalServicesSection from "../components/AdditionalServicesSection";
import ReviewsSection from "../components/ReviewsSection";
import HowItWorks from "../components/HowItWorks";
import FAQSection from "../components/FAQSection";

const AtendeeHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "home", label: "Home", path: "/attendee/home" },
    { key: "bookings", label: "Bookings", path: "/onboard" },
    { key: "favorites", label: "Favorites" },
    { key: "profile", label: "Profile", path: "/attendee/profile" },
  ];

  const categories = [
    {
      name: "Marrige",
      icon: Gem,
    },

    {
      name: "Food and Drink",
      icon: Beer,
    },

    {
      name: "Musical",
      icon: Music2,
    },
  ];

  const topPickedVenues = [
    {
      name: "Mount View",
      address: "Ranchi",
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "1000",
    },
    {
      name: "Mount View",
      address: "Ranchi",
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "1000",
    },
    {
      name: "Mount View",
      address: "Ranchi",
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "1000",
    },
  ];

  const topCaterers = [
    {
      name: "Ramu Catrer",
      image:
        "https://plus.unsplash.com/premium_photo-1687697861242-03e99059e833?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      avgRating: 4.5,
      price: 1200,
    },
    {
      name: "Ramu Catrer",
      image:
        "https://plus.unsplash.com/premium_photo-1687697861242-03e99059e833?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      avgRating: 4.5,
      price: 1200,
    },
    {
      name: "Ramu Catrer",
      image:
        "https://plus.unsplash.com/premium_photo-1687697861242-03e99059e833?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      avgRating: 4.5,
      price: 1200,
    },
  ];

  const topServices = [
    {
      name: "Live Music",
      icon: Guitar,
    },
    {
      name: "Magic Show",
      icon: Wand,
    },
    {
      name: "Tatoo Artist",
      icon: Brush,
    },
    {
      name: "Anchor",
      icon: MicVocal,
      price: 1200,
    },
  ];

  const faqs = [
    {
      question: "How do I book a caterer?",
      answer:
        "Simply browse top caterers, choose one, and confirm your booking in a few clicks.",
    },
    {
      question: "Are the vendors verified?",
      answer:
        "Yes, all vendors are verified for quality and reliability before listing.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We support UPI, debit/credit cards, and net banking.",
    },
  ];

  const currentItem =
    items.find((item) => item.path === location.pathname) || items[0];

  return (
    <main className="bg-neutral-900 min-h-screen text-white">
      {/* Header */}
      <AttendeeHomeHeader />

      {/* Greetings and search bar */}
      <AttendeeGreetings />

      {/* Categories section */}
      <CategoriesSection categories={categories} />

      {/* Top Picked Venues */}
      <TopVenues topPickedVenues={topPickedVenues} />

      {/* Caterers */}
      <TopCaterers topCaterers={topCaterers} />

      {/* Additional Services */}
      <AdditionalServicesSection topServices={topServices} />

      {/* Reviews */}
      <ReviewsSection />

      {/* How it works */}
      <HowItWorks />

      {/* FaQs */}
      <FAQSection faqs={faqs} />

      {/* For temporary use */}
      <div className="h-[170px] w-full"></div>

      {/* Navbar */}
      <div className="w-[100%] fixed flex items-center justify-center bottom-[3%] ">
        <div className="w-[80%] flex items-center justify-center">
          <NavigationMenu
            activeKey={currentItem.key}
            onChange={(key) => {
              const selected = items.find((i) => i.key === key);
              if (selected) navigate(selected.path);
            }}
            items={items}
          />
        </div>
      </div>
    </main>
  );
};

export default AtendeeHome;
