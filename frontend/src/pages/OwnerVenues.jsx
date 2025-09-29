import { Cross, Plus, X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OwnerVenuesCards from "../components/owner_venues/OwnerVenuesCards";
import OwnerVenueDetails from "../components/owner_venues/OwnerVenueDetails";
import CreateNewVenuePannel from "../components/owner_venues/CreateNewVenuePannel";
import { fetchOwnedVenues, fetchVenueDetails } from "../api/venueApi";

const OwnerVenues = () => {
  const ownerVenueDetailRef = useRef(null);
  const OwnerVenueCardsRef = useRef(null);
  const createNewVenuePannelRef = useRef(null);

  const [isOwnerVenueDetailsOpen, setIsOwnerVenueDetailsOpen] = useState(false);
  const [selectedVenueID, setSelectedVenueID] = useState(null);
  const [venuesData, setVenuesData] = useState([]);

  // this holds the full venue object returned by the API
  const [selectedVenueData, setSelectedVenueData] = useState(null);
  const [isCreateNewVenuePannelOpen, setIsCreateNewVenuePannelOpen] =
    useState(false);

  // GSAP: details panel open/close
  useGSAP(() => {
    if (isOwnerVenueDetailsOpen) {
      gsap.to(ownerVenueDetailRef.current, {
        y: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.to(OwnerVenueCardsRef.current, {
        scale: 0.9,
        opacity: 0.5,
        duration: 0.9,
        ease: "expo.out",
      });
    } else {
      gsap.to(ownerVenueDetailRef.current, {
        y: "100%",
        duration: 0.9,
        ease: "expo.out",
      });
      gsap.to(OwnerVenueCardsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      });
    }
  }, [isOwnerVenueDetailsOpen]);

  // GSAP: create-panel open/close (keeps same cards scale animation)
  useGSAP(() => {
    if (isCreateNewVenuePannelOpen) {
      gsap.to(createNewVenuePannelRef.current, {
        y: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.to(OwnerVenueCardsRef.current, {
        scale: 0.9,
        opacity: 0.5,
        duration: 0.9,
        ease: "expo.out",
      });
    } else {
      gsap.to(createNewVenuePannelRef.current, {
        y: "100%",
        duration: 0.9,
        ease: "expo.out",
      });
      gsap.to(OwnerVenueCardsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      });
    }
  }, [isCreateNewVenuePannelOpen]);

  // Load all owned venues at mount
  useEffect(() => {
    const loadVenues = async () => {
      try {
        const data = await fetchOwnedVenues();
        // if API returns { success: true, venues: [...] } or the plain array
        const payload = Array.isArray(data) ? data : data?.venues ?? data;
        setVenuesData(payload || []);
      } catch (error) {
        console.error("loadVenues error:", error);
      }
    };

    loadVenues();
  }, []);

  // When a card is clicked we set selectedVenueID.
  // This effect watches selectedVenueID and fetches the full venue data.
  useEffect(() => {
    if (!selectedVenueID) {
      setSelectedVenueData(null);
      setIsOwnerVenueDetailsOpen(false);
      return;
    }

    const loadVenueDetails = async () => {
      try {
        const data = await fetchVenueDetails(selectedVenueID);
        const venue =
          data?.venue ?? (data && data.success === false ? null : data);
        if (!venue) {
          console.warn("No venue returned from fetchVenueDetails", data);
          setSelectedVenueData(null);
          return;
        }
        setSelectedVenueData(venue);

        setIsOwnerVenueDetailsOpen(true);
      } catch (error) {
        console.error("loadVenueDetails error:", error);
      }
    };

    loadVenueDetails();
  }, [selectedVenueID]);

  // Example fallback static data for the detail panel (if your details component expects those props)
  const sampleBookings = [
    {
      id: 1,
      name: "Aman Sharma",
      date: "2025-09-18",
      pax: 120,
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Priya & Co.",
      date: "2025-10-02",
      pax: 250,
      status: "Pending",
    },
  ];

  return (
    <div>
      <div className="p-6 ">
        <div ref={OwnerVenueCardsRef}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Venues</h1>
            <button
              onClick={() => setIsCreateNewVenuePannelOpen(true)}
              className="cursor-pointer"
            >
              <Plus size={28} />
            </button>
          </div>

          <div className="mt-4 flex items-center flex-col gap-5">
            <OwnerVenuesCards
              venuesData={venuesData}
              onCardClick={(id) => setSelectedVenueID(id)}
              selectedVenueID={selectedVenueID}
              setIsOwnerVenueDetailsOpen={setIsOwnerVenueDetailsOpen}
            />
          </div>
        </div>
      </div>

      <div className="h-12"></div>

      <div
        ref={ownerVenueDetailRef}
        className="fixed left-0 right-0 bottom-0 h-screen w-full transform -translate-y-[-100%]"
      >
        <OwnerVenueDetails
          // pass the fetched venue object (or null while loading)
          selectedVenue={selectedVenueData}
          setIsOwnerVenueDetailsOpen={(open) => {
            setIsOwnerVenueDetailsOpen(open);
            if (!open) setSelectedVenueID(null);
          }}
          // keep the sample props if your details component requires them
          bookings={sampleBookings}
        />
      </div>

      <div
        ref={createNewVenuePannelRef}
        className="fixed bg-neutral-950/70 left-0 right-0 bottom-0 h-screen w-full backdrop-blur-xl overflow-auto transform -translate-y-[-100%] "
      >
        <CreateNewVenuePannel
          setIsCreateNewVenuePannelOpen={setIsCreateNewVenuePannelOpen}
        />
      </div>
    </div>
  );
};

export default OwnerVenues;
