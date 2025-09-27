import React, { useRef, useState } from "react";
import VenueCard from "../components/attendee_venues/VenueCard";
import AttendeeVenueDetails from "../components/attendee_venues/AttendeeVenueDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const venues = [
  {
    id: 1,
    name: "Grand Ballroom",
    address: "123 Main St, New York",
    location: "Downtown",
    capacity: 300,
    price: 5000,
    image:
      "https://www.aurusjewels.com/cdn/shop/articles/indian_wedding_planning_guide_ultimate.jpg?v=1679913681",
  },
  {
    id: 2,
    name: "Skyline Terrace",
    address: "456 Park Ave, New York",
    location: "Midtown",
    capacity: 150,
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];

const AttendeeVenues = () => {
  const attendeeVenueDetailsRef = useRef(null);
  const mainScreenRef = useRef(null);

  const [isAttendeeVenueDetailsOpen, setIsAttendeeVenueDetailsOpen] =
    useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useGSAP(() => {
    if (isAttendeeVenueDetailsOpen) {
      gsap.to(attendeeVenueDetailsRef.current, {
        x: 0,
        duration: 1,
        ease: "expo.inOut",
      });

      gsap.to(mainScreenRef.current, {
        scale: 0.9,
        duration: 1,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(attendeeVenueDetailsRef.current, {
        x: "100%",
        duration: 1,
        ease: "expo.inOut",
      });

      gsap.to(mainScreenRef.current, {
        scale: 1,
        duration: 1,
        ease: "expo.inOut",
      });
    }
  }, [isAttendeeVenueDetailsOpen]);

  const handleCardClick = (venue) => {
    setSelectedVenue(venue);
    setIsAttendeeVenueDetailsOpen(true);
  };

  const handleClosePanel = () => {
    setIsAttendeeVenueDetailsOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-neutral-900">
      <div ref={mainScreenRef}>
        <h1 className="text-4xl font-bold text-white mb-6">Top Venues</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onClick={() => handleCardClick(venue)}
            />
          ))}
        </div>
      </div>
      <div
        className="fixed top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full bg-neutral-800 shadow-lg z-50 transform translate-x-full"
        ref={attendeeVenueDetailsRef}
      >
        <AttendeeVenueDetails
          setIsAttendeeVenueDetailsOpen={handleClosePanel}
          selectedVenue={selectedVenue}
        />
      </div>
    </div>
  );
};

export default AttendeeVenues;
