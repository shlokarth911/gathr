import { ArrowDown } from "lucide-react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ListedVenuesPannel = ({ setIsListedVenuesPannelOpen }) => {
  const [isVerifyPINPannelOpen, setIsVerifyPINPannelOpen] = useState(false);

  const verifyPINPannelRef = useRef(null);

  const venuesData = [
    {
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Venue 1",
      address: "Ranchi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Venue 1",
      address: "Ranchi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Venue 1",
      address: "Ranchi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Venue 1",
      address: "Ranchi",
    },
  ];

  useGSAP(() => {
    if (isVerifyPINPannelOpen) {
      gsap.to(verifyPINPannelRef.current, {
        transform: "translateY(0)",
        ease: "power4.out",
        duration: 0.7,
      });
    } else {
      gsap.to(verifyPINPannelRef.current, {
        transform: "translateY(100%)",
        ease: "power4.out",
        duration: 0.7,
      });
    }
  }, [isVerifyPINPannelOpen]);

  return (
    <div className="fixed bottom-0 px-4 py-5 bg-neutral-900 h-full w-full">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl ">Listed Venues</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsListedVenuesPannelOpen(!setIsListedVenuesPannelOpen);
          }}
        >
          <ArrowDown />
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search"
          className="w-full mt-2 p-2 border rounded-full px-5 border-neutral-600"
        />

        <div className=" overflow-y-scroll h-[73vh] rounded-2xl mt-2">
          {venuesData.map((venue, idx) => (
            <div
              key={idx}
              className="overflow-hidden relative bg-neutral-800 rounded-2xl mt-7"
            >
              <img
                className="h-40 w-full object-cover rounded-2xl"
                src={venue.image}
              />
              <div className="p-3">
                <h1 className="text-2xl font-semibold"> {venue.name}</h1>
                <p>{venue.address}</p>
              </div>
              <div className="absolute bottom-0 right-0 p-3">
                <label className="flex flex-col items-end cursor-pointer">
                  <h4 className="text-xs mb-1 text-neutral-400">
                    Clcik here to select
                  </h4>
                  <input
                    type="checkbox"
                    className="peer appearance-none w-16 h-8 border-2 border-neutral-600 rounded-lg bg-neutral-900 checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setIsVerifyPINPannelOpen(true)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="w-full mt-9 text-xl text-black py-3 rounded-full"
        style={{
          background: " linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
        }}
        onClick={() => setIsListedVenuesPannelOpen(false)}
      >
        {" "}
        Confirm{" "}
      </button>

      <div
        className="fixed left-0 bottom-0 w-full p-4"
        style={{
          backgroundColor: "rgba(29, 29, 29, 0.8)",
          backdropFilter: "blur(10px)",
          transform: "translateY(100%)",
        }}
        ref={verifyPINPannelRef}
      >
        <form action="">
          <h1 className="text-xl">Enter Security PIN</h1>
          <input
            type="number"
            className="w-full mt-5 text-3xl bg-neutral-100 p-4 py-2 rounded-xl text-black text-center"
          />
          <button className="w-full mt-9 text-xl  py-3 rounded-full bg-blue-600">
            Verify
          </button>
        </form>
        <button
          onClick={() => setIsVerifyPINPannelOpen(false)}
          className="w-full underline  text-sm rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ListedVenuesPannel;
