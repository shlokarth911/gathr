import { Cross, Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OwnerVenuesCards from "../components/owner_venues/OwnerVenuesCards";
import OwnerVenueDetails from "../components/owner_venues/OwnerVenueDetails";
import CreateNewVenuePannel from "../components/owner_venues/CreateNewVenuePannel";

const OwnerVenues = () => {
  const ownerVenueDetailRef = useRef(null);
  const OwnerVenueCardsRef = useRef(null);
  const createNewVenuePannelRef = useRef(null);

  const [isOwnerVenueDetailsOpen, setIsOwnerVenueDetailsOpen] = useState(false);
  const [isCreateNewVenuePannelOpen, setIsCreateNewVenuePannelOpen] =
    useState(false);

  useGSAP(() => {
    if (isOwnerVenueDetailsOpen) {
      gsap.to(ownerVenueDetailRef.current, {
        y: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.to(OwnerVenueCardsRef.current, {
        scale: 0.9,
        opacity: "0.5",
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

  useGSAP(() => {
    if (isCreateNewVenuePannelOpen) {
      gsap.to(createNewVenuePannelRef.current, {
        y: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.to(OwnerVenueCardsRef.current, {
        scale: 0.9,
        opacity: "0.5",
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

  // TODO : Replace mock data
  const ownedVenues = [
    {
      name: "Mount View",
      address: "Ranchi",
      img: "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
      status: "booked",
      price: "50000",
      averageRating: 4.5,
    },
    {
      name: "Sunset Terrace",
      address: "Ranchi",
      img: "https://images.unsplash.com/photo-1505691723518-36a77bada6d5?q=80&w=1170&auto=format&fit=crop",
      status: "available",
      price: "35000",
      averageRating: 4.3,
    },
  ];

  const venueBookings = [
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
    {
      id: 3,
      name: "Rahul's Reception",
      date: "2025-11-05",
      pax: 300,
      status: "Confirmed",
    },
  ];

  const reviews = [
    {
      id: 1,
      user: "Tina",
      rating: 5,
      text: "Amazing experience — staff was fantastic.",
    },
    {
      id: 2,
      user: "Rohit",
      rating: 4,
      text: "Great venue, pool area needs a quick refresh.",
    },
  ];

  const amenities = [
    "Free WiFi",
    "Rooftop Pool",
    "Banquet Halls",
    "Catering",
    "Parking",
  ];

  const images = [
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
  ];

  return (
    <div>
      <div className="p-6 ">
        <div ref={OwnerVenueCardsRef}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Venues</h1>
            <button
              onClick={() => {
                setIsCreateNewVenuePannelOpen(true);
              }}
              className="cursor-pointer"
            >
              <Plus size={28} />
            </button>
          </div>
          <div className="mt-4 flex items-center  flex-col gap-5">
            <OwnerVenuesCards
              setIsOwnerVenueDetailsOpen={setIsOwnerVenueDetailsOpen}
              ownedVenues={ownedVenues}
            />
          </div>
        </div>
      </div>

      <div
        ref={ownerVenueDetailRef}
        className="fixed left-0 right-0 bottom-0 h-screen w-full transform -translate-y-[-100%]"
      >
        <OwnerVenueDetails
          setIsOwnerVenueDetailsOpen={setIsOwnerVenueDetailsOpen}
          images={images}
          amenities={amenities}
          reviews={reviews}
          bookings={venueBookings}
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
