import React, { useContext, useState } from "react";

import { Beer, Brush, Gem, Guitar, MicVocal, Music2, Wand } from "lucide-react";

import AttendeeHomeHeader from "../components/attendee_home/AttendeeHomeHeader";
import AttendeeGreetings from "../components/attendee_home/AttendeeGreetings";
import CategoriesSection from "../components/attendee_home/CategoriesSection";
import TopVenues from "../components/attendee_home/TopVenues";
import TopCaterers from "../components/attendee_home/TopCaterers";
import AdditionalServicesSection from "../components/attendee_home/AdditionalServicesSection";
import ReviewsSection from "../components/attendee_home/ReviewsSection";
import HowItWorks from "../components/attendee_home/HowItWorks";
import FAQSection from "../components/attendee_home/FAQSection";
import { AttendeeDataContext } from "../contexts/AttendeeContext";

const AtendeeHome = () => {
  const { attendee, setAttendee } = useContext(AttendeeDataContext);

  const [user, setUser] = useState(attendee);

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

  return (
    <main className="bg-neutral-900 min-h-screen text-white">
      {/* Header */}
      <AttendeeHomeHeader user={user} />

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
    </main>
  );
};

export default AtendeeHome;
