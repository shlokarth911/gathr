import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookingCard from "../components/owner_bookings/BookingCard";
import BookedAttendeePannel from "../components/owner_bookings/BookedAttendeePannel";
import { listBookingsForOwner } from "../api/bookingApi";

const OwnerBookings = () => {
  // state variables
  const [mainScreen, setMainScreen] = useState(false);
  const [bookedAttendeePannel, setBookedAttendeePannel] = useState(false);
  const [bookingsData, setBookingsData] = useState(null);
  const [selectedBookingData, setSelectedBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // refs
  const bookedAttendeePannelRef = useRef();
  const mainScreenRef = useRef();

  // animations for attendee panel
  useGSAP(() => {
    // guard against missing ref to avoid "GSAP target undefined" warnings
    if (!bookedAttendeePannelRef.current) return;

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
    if (!mainScreenRef.current) return;

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
      const res = await listBookingsForOwner();

      setBookingsData(res.data);
      setLoading(false);
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
  if (!bookingsData || bookingsData.length === 0) {
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
        className="p-4 min-h-screen max-w-5xl mx-auto w-full"
      >
        <h1 className="text-xl font-bold">Bookings</h1>
        <div className="mt-4 flex gap-4 flex-col">
          {bookingsData.map((data, idx) => {
            return (
              <BookingCard
                onClick={() => {
                  setMainScreen(true);
                  setBookedAttendeePannel(true);
                }}
                data={data}
                setSelectedBookingData={setSelectedBookingData}
                key={idx}
              />
            );
          })}
        </div>
      </div>

      {/* attendee panel */}
      <div
        ref={bookedAttendeePannelRef}
        style={{ transform: "translateY(100%)" }}
        className="fixed left-0 right-0 mx-auto max-w-5xl bottom-0 z-10 w-full"
      >
        <BookedAttendeePannel
          selectedBookingData={selectedBookingData}
          bookedAttendeePannel={bookedAttendeePannel}
          setMainScreen={setMainScreen}
          setBookedAttendeePannel={setBookedAttendeePannel}
        />
      </div>
    </div>
  );
};

export default OwnerBookings;
