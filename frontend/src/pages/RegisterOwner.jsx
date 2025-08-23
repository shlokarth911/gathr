import { ArrowLeft } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ListedVenuesPannel from "../components/ListedVenuesPannel";

const RegisterOwner = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isListedVenuesPannelOpen, setIsListedVenuesPannelOpen] =
    useState(false);

  const listedVenuesPannelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const attendeeData = {
      name: name,
      email: email,
      password: password,
    };

    console.log(attendeeData);
  };

  useGSAP(() => {
    if (isListedVenuesPannelOpen) {
      gsap.to(listedVenuesPannelRef.current, {
        duration: 0.5,
        transform: "translateY(0vh)", // Show panel
        ease: "power4.out",
      });
    } else {
      gsap.to(listedVenuesPannelRef.current, {
        duration: 0.5,
        transform: "translateY(100vh)", // Hide panel
        ease: "power4.in",
      });
    }
  }, [isListedVenuesPannelOpen]);

  return (
    <div className="bg-neutral-900 h-screen overflow-hidden text-white">
      <div className=" px-5 py-4 flex items-center justify-between">
        <ArrowLeft size={28} />

        <Link to={"/attendee-login"}>
          <h2 className="underline">Login</h2>
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="px-5 py-6">
          <h1 className="text-3xl">
            Register as an <br /> Owner
          </h1>

          <p className="pt-2 text-neutral-300">Manage your venues</p>
        </div>
        <div className="bg-neutral-800 px-5 pt-9  pb-7 rounded-t-4xl">
          <form onSubmit={submitHandler}>
            <h2 className="text-xl  ml-4 text-neutral-300">Name</h2>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <h2 className="text-xl mt-6 ml-4 text-neutral-300">Email</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <h2 className="text-xl mt-6 ml-4 text-neutral-300">Passowrd</h2>
            <input
              type="password"
              placeholder="Enter a strong password"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <h2 className="text-xl mt-6 ml-4 text-neutral-300">
              Select your venue
            </h2>

            <div
              onClick={() => setIsListedVenuesPannelOpen(true)}
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
            >
              <h4 className="text-neutral-400 font-semibold">
                Click here to see all listed venues
              </h4>
            </div>

            <h2 className="text-sm mt-2 text-neutral-300 text-center">
              Not listed your venue? Click{" "}
              <Link>
                <span className="underline">here</span>
              </Link>{" "}
              to list yours{" "}
            </h2>

            <button
              className="w-full mt-9 text-2xl text-black py-3 rounded-full"
              style={{
                background:
                  " linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div
        ref={listedVenuesPannelRef}
        style={{
          transform: "translateY(100vh)", // Panel starts hidden
        }}
        className="bg-neutral-900 z-10 fixed left-0 bottom-0 w-full h-full"
      >
        <ListedVenuesPannel
          setIsListedVenuesPannelOpen={setIsListedVenuesPannelOpen}
        />
      </div>
    </div>
  );
};

export default RegisterOwner;
