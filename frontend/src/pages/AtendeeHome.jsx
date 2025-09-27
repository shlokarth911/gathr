import React, { useContext, useRef, useState } from "react";

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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AttendeeVenueDetails from "../components/attendee_venues/AttendeeVenueDetails";

const AtendeeHome = () => {
  const { attendee } = useContext(AttendeeDataContext);

  const [user] = useState(attendee);

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

  const venues = [
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

  const attendeeVenueDetailsRef = useRef(null);

  const [isAttendeeVenueDetailsOpen, setIsAttendeeVenueDetailsOpen] =
    useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useGSAP(() => {
    if (isAttendeeVenueDetailsOpen) {
      gsap.to(attendeeVenueDetailsRef.current, {
        x: 0,
        duration: 0.5,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(attendeeVenueDetailsRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "expo.inOut",
      });
    }
  }, [isAttendeeVenueDetailsOpen]);

  const handleClosePanel = () => {
    setIsAttendeeVenueDetailsOpen(false);
  };

  return (
    <main className="bg-neutral-900 min-h-screen text-white">
      {/* Header */}
      <AttendeeHomeHeader user={user} />

      {/* Greetings and search bar */}
      <AttendeeGreetings />

      {/* Categories section */}
      <CategoriesSection categories={categories} />

      {/* Top Picked Venues */}
      <TopVenues
        setSelectedVenue={setSelectedVenue}
        setIsAttendeeVenueDetailsOpen={setIsAttendeeVenueDetailsOpen}
        venues={venues}
      />

      {/* Caterers */}
      <TopCaterers topCaterers={topCaterers} />

      {/* Additional Services */}
      <AdditionalServicesSection topServices={topServices} />

      {/* Reviews */}
      <ReviewsSection />

      {/* How it works */}
      <HowItWorks />

      <div
        className="fixed top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full bg-neutral-800 shadow-lg z-50 transform translate-x-full"
        ref={attendeeVenueDetailsRef}
      >
        <AttendeeVenueDetails
          setIsAttendeeVenueDetailsOpen={handleClosePanel}
          selectedVenue={selectedVenue}
        />
      </div>

      {/* FaQs */}
      <FAQSection faqs={faqs} />

      {/* For temporary use */}
      <div className="h-[170px] w-full"></div>
    </main>
  );
};

export default AtendeeHome;
