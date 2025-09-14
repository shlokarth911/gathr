import React, { useRef, useState } from "react";
import BookedAttendeePannel from "../components/owner_bookings/BookedAttendeePannel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookingCard from "../components/owner_bookings/BookingCard";

const OwnerBookings = () => {
  //state variables
  const [mainScreen, setMainScreen] = useState(false);
  const [bookedAttendeePannel, setBookedAttendeePannel] = useState(false);

  //ref variables
  const bookedAttendeePannelRef = useRef(null);
  const mainScreenRef = useRef(null);

  const bookings = [
    {
      avatar:
        "https://lh3.googleusercontent.com/Ej74BaoxGgz_NWcUIhnlwlHH_wBBN54vGnzSbalds41OAylbsOxC2BNqJubYYsp_JQkkaD9g4-IKVJQ=w544-h544-l90-rj",
      name: "John Doe",
      venue: "The grand hall",
      status: "Pending",
    },
    {
      avatar:
        "https://lh3.googleusercontent.com/Ej74BaoxGgz_NWcUIhnlwlHH_wBBN54vGnzSbalds41OAylbsOxC2BNqJubYYsp_JQkkaD9g4-IKVJQ=w544-h544-l90-rj",
      name: "John Doe",
      venue: "The grand hall",
      status: "Pending",
    },
  ];

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

  const mainScreenClickHandler = () => {
    if (mainScreen) {
      setMainScreen(false);
    }

    if (bookedAttendeePannel) {
      setBookedAttendeePannel(false);
    }
  };

  return (
    <div>
      <div
        ref={mainScreenRef}
        onClick={mainScreenClickHandler}
        className="p-4 min-h-screen"
      >
        <h1 className="text-xl font-bold">Bookings</h1>
        <div className="mt-4 flex gap-4 flex-col">
          <BookingCard
            bookings={bookings}
            setMainScreen={setMainScreen}
            setBookedAttendeePannel={setBookedAttendeePannel}
          />
        </div>
      </div>

      <div
        ref={bookedAttendeePannelRef}
        style={{
          transform: "translateY(100%)",
        }}
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
