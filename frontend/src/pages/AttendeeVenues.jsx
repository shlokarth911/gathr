import React, { useRef, useState } from "react";
import VenueCard from "../components/attendee_venues/VenueCard";
import AttendeeVenueDetails from "../components/attendee_venues/AttendeeVenueDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronUp, Filter, Search, X } from "lucide-react";
import FilterVenues from "../components/attendee_venues/FilterVenues";
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
  {
    id: 3,
    name: "Sunset Pavilion",
    address: "789 Ocean Dr, Miami",
    location: "Beachside",
    capacity: 80,
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Emerald Hall",
    address: "321 Lakeview Ave, Chicago",
    location: "Lakeside",
    capacity: 450,
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "City Lights Banquet",
    address: "654 Market St, Los Angeles",
    location: "Downtown",
    capacity: 220,
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Palm Grove",
    address: "987 Palm Blvd, Miami",
    location: "Suburbs",
    capacity: 120,
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Royal Heritage",
    address: "111 Heritage Rd, Houston",
    location: "Historic District",
    capacity: 600,
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Gardenia Lawn",
    address: "222 Blossom St, Los Angeles",
    location: "Gardens",
    capacity: 350,
    price: 6700,
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Sky High Rooftop",
    address: "333 Skyline Ave, Chicago",
    location: "Rooftop",
    capacity: 180,
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Opal Conference Center",
    address: "444 Opal Rd, New York",
    location: "Business District",
    capacity: 250,
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
];
const AttendeeVenues = () => {
  const attendeeVenueDetailsRef = useRef(null);
  const mainScreenRef = useRef(null);
  const venueFilterRef = useRef(null);
  const searchBarRef = useRef(null);

  const [isAttendeeVenueDetailsOpen, setIsAttendeeVenueDetailsOpen] =
    useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  useGSAP(() => {
    if (isAttendeeVenueDetailsOpen) {
      gsap.to(attendeeVenueDetailsRef.current, {
        x: 0,
        duration: 1,
        ease: "expo.inOut",
      });

      gsap.to(mainScreenRef.current, {
        opacity: 0.2,
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
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      });
    }
  }, [isAttendeeVenueDetailsOpen]);

  useGSAP(() => {
    if (isFilterOpen) {
      gsap.to(venueFilterRef.current, {
        y: 0,
        duration: 0.6,
        ease: "expo.inOut",
      });

      gsap.to(mainScreenRef.current, {
        opacity: 0.2,
        duration: 0.6,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(venueFilterRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "expo.inOut",
      });

      gsap.to(mainScreenRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  }, [isFilterOpen]);

  const handleCardClick = (venue) => {
    setSelectedVenue(venue);
    setIsAttendeeVenueDetailsOpen(true);
  };

  const handleClosePanel = () => {
    setIsAttendeeVenueDetailsOpen(false);
  };

  useGSAP(() => {
    if (isSearchBarOpen) {
      gsap.to(searchBarRef.current, {
        y: 0,
        opacity: 1,
        display: "flex",
        duration: 1,
        ease: "elastic.out(1,0.8)",
      });
    } else {
      gsap.to(searchBarRef.current, {
        y: -20,
        opacity: 0,
        display: "none",
        duration: 1,
        ease: "elastic.out(1,0.8)",
      });
    }
  }, [isSearchBarOpen]);

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

  return (
    <div className=" min-h-screen bg-neutral-900">
      <div className=" fixed top-6 z-2 right-6   ">
        <div className="flex items-center gap-6 mb-1  cursor-pointer w-fit p-3 rounded-full  bg-neutral-800/70 backdrop-blur-md transition">
          <Search onClick={() => setIsSearchBarOpen(true)} size={22} />
          <Filter onClick={() => setIsFilterOpen(true)} size={22} />
        </div>
      </div>

      <div className=" fixed top-18 z-2 left-8 right-8">
        <div ref={searchBarRef} className="flex items-center gap-3 mt-3 ">
          <input
            type="text"
            placeholder="Search venues..."
            className="w-full p-3 rounded-full  text-white bg-neutral-800/70 backdrop-blur-sm placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xl shadow-black/70"
          />
          <div
            onClick={() => setIsSearchBarOpen(false)}
            className="bg-neutral-800/70 backdrop-blur-sm w-12 h-12 rounded-full flex justify-center items-center p-3 shadow-xl shadow-black/70"
          >
            <X size={28} />
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          if (isFilterOpen) setIsFilterOpen(false);
        }}
        ref={mainScreenRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative p-6 ">
          <h1 className="text-2xl font-semibold">Top Venues</h1>
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

      <div
        ref={venueFilterRef}
        className="fixed bottom-0 left-0  z-[10] w-full transform translate-y-full"
      >
        <FilterVenues setIsFilterOpen={setIsFilterOpen} cities={cities} />
      </div>
    </div>
  );
};

export default AttendeeVenues;
