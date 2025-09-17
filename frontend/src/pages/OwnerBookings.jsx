import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookingCard from "../components/owner_bookings/BookingCard";
import BookedAttendeePannel from "../components/owner_bookings/BookedAttendeePannel";
import { listBookings } from "../api/ownerApi";

const OwnerBookings = () => {
  // state variables
  const [mainScreen, setMainScreen] = useState(false);
  const [bookedAttendeePannel, setBookedAttendeePannel] = useState(false);
  const [bookingsData, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // refs
  const bookedAttendeePannelRef = useRef(null);
  const mainScreenRef = useRef(null);

  // animations for attendee panel
  useGSAP(() => {
    if (bookedAttendeePannel) {
      gsap.to(bookedAttendeePannelRef.current, {
        y: 0,
        duration: 0.8,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(bookedAttendeePannelRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [bookedAttendeePannel]);

  // animations for main screen
  useGSAP(() => {
    if (mainScreen) {
      gsap.to(mainScreenRef.current, {
        scale: 0.95,
        opacity: 0.5,
        duration: 0.8,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(mainScreenRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [mainScreen]);

  // close panel & reset main screen
  const mainScreenClickHandler = () => {
    setMainScreen(false);
    setBookedAttendeePannel(false);
  };

  // fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await listBookings();
        setBookingsData(res);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingsData({ attendees: [] }); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading bookings...</p>
      </div>
    );
  }

  // EMPTY STATE UI
  if (!bookingsData || bookingsData.attendees.length === 0) {
    return (
      <div className="p-4 min-h-screen">
        <h1 className="text-xl font-bold">Bookings</h1>
        <div className="mt-4 flex gap-4 flex-col">
          <p>No bookings found.</p>
        </div>
      </div>
    );
  }

  // MAIN UI
  return (
    <div>
      {/* main screen */}
      <div
        ref={mainScreenRef}
        onClick={mainScreenClickHandler}
        className="p-4 min-h-screen"
      >
        <h1 className="text-xl font-bold">Bookings</h1>
        <div className="mt-4 flex gap-4 flex-col">
          <BookingCard
            bookings={bookingsData.attendees}
            setMainScreen={setMainScreen}
            setBookedAttendeePannel={setBookedAttendeePannel}
          />
        </div>
      </div>

      {/* attendee panel */}
      <div
        ref={bookedAttendeePannelRef}
        style={{ transform: "translateY(100%)" }}
        className="fixed left-0 bottom-0 z-10 w-full"
      >
        <BookedAttendeePannel
          setMainScreen={setMainScreen}
          setBookedAttendeePannel={setBookedAttendeePannel}
        />
      </div>
    </div>
  );
};

export default OwnerBookings;
