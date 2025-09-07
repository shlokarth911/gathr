import React, { useRef, useState } from "react";
import BookedAttendeePannel from "../components/owner_bookings/BookedAttendeePannel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const OwnerBookings = () => {
  //state variables
  const [bookedAttendeePannel, setBookedAttendeePannel] = useState(false);

  //ref variables
  const bookedAttendeePannelRef = useRef(null);

  const bookings = [
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Bookings</h1>

      <div className="mt-4 flex gap-4 flex-col">
        {bookings.map((booking, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center gap-2 bg-neutral-500/20 p-2 rounded-xl relative"
              onClick={() => {
                setBookedAttendeePannel(true);
              }}
            >
              {/* Avatar */}
              <img
                src={booking.avatar}
                className="h-20 object-cover rounded-full border border-white/10"
                alt=""
              />

              <div className="h-[100%] relative">
                <h1 className="text-lg font-semibold">{booking.name}</h1>
                <p className="text-sm text-neutral-50/70">{booking.venue}</p>
              </div>

              <div>
                <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                  {booking.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        ref={bookedAttendeePannelRef}
        style={{
          transform: "translateY(100%)",
        }}
        className="fixed left-0 bottom-0 z-10 w-full"
      >
        <BookedAttendeePannel
          setBookedAttendeePannel={setBookedAttendeePannel}
        />
      </div>
    </div>
  );
};

export default OwnerBookings;
