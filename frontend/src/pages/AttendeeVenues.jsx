import React, { useContext, useEffect, useRef, useState } from "react";
import VenueCard from "../components/attendee_venues/VenueCard";
import AttendeeVenueDetails from "../components/attendee_venues/AttendeeVenueDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Filter, Search, X } from "lucide-react";
import FilterVenues from "../components/attendee_venues/FilterVenues";
import { listVenues } from "../api/venueApi";
import { AttendeeDataContext } from "../contexts/AttendeeContext";

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
  const { attendee } = useContext(AttendeeDataContext);
  const [city, setCity] = useState(attendee?.city || "");
  const [venues, setVenues] = useState([]);

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
        scale: 1,
        y: 0,
        opacity: 1,
        backdropFilter: "blur(10px)",
        display: "flex",
        duration: 1,
        ease: "elastic.out(1,0.8)",
      });
    } else {
      gsap.to(searchBarRef.current, {
        y: -20,
        opacity: 0,
        scale: 0.9,
        display: "none",
        duration: 1,
        ease: "elastic.out(1,0.8)",
      });
    }
  }, [isSearchBarOpen]);

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await listVenues(city);
        setVenues(
          Array.isArray(response.data.venues) ? response.data.venues : []
        );
      } catch (error) {
        console.error("Error fetching venues:", error);
        setVenues([]);
      }
    };
    if (city) fetchVenues();
  }, [city]);

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="fixed top-6 z-2 right-6">
        <div className="flex items-center gap-6 mb-1 cursor-pointer w-fit p-3 rounded-full bg-neutral-800/70 backdrop-blur-md transition">
          <Search onClick={() => setIsSearchBarOpen(true)} size={22} />
          <Filter onClick={() => setIsFilterOpen(true)} size={22} />
        </div>
      </div>
      <div className="fixed top-18 z-2 left-8 right-8">
        <div ref={searchBarRef} className="opacity-0 items-center gap-3 mt-3 ">
          <input
            type="text"
            placeholder="Search venues..."
            className="w-full p-3 rounded-full text-white bg-neutral-800/70 backdrop-blur-sm placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xl shadow-black/70"
          />
          <div className="bg-neutral-800/70 backdrop-blur-sm w-12 h-12 rounded-full flex justify-center items-center p-3 shadow-xl shadow-black/70">
            <Search size={28} />
          </div>
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
              key={venue._id || venue.id}
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
        className="fixed bottom-0 left-0 z-[10] w-full transform translate-y-full"
      >
        <FilterVenues
          city={city}
          setCity={setCity}
          setIsFilterOpen={setIsFilterOpen}
          cities={cities}
        />
      </div>
    </div>
  );
};

export default AttendeeVenues;
