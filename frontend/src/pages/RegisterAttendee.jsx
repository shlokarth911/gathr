import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterAttendee = () => {
  return (
    <div className="bg-neutral-900 h-screen text-white">
      <div className=" px-5 py-4 flex items-center justify-between">
        <ArrowLeft size={28} />

        <Link to={"/attendee-login"}>
          <h2 className="underline">Login</h2>
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="px-5 py-6">
          <h1 className="text-3xl">
            Register as an <br /> Attendee
          </h1>
        </div>
        <div className="bg-neutral-800 px-5 pt-9  pb-7 rounded-t-4xl">
          <form>
            <h2 className="text-xl  ml-4 text-neutral-300">Name</h2>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
            />
            <h2 className="text-xl mt-6 ml-4 text-neutral-300">Email</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
            />
            <h2 className="text-xl mt-6 ml-4 text-neutral-300">Passowrd</h2>
            <input
              type="password"
              placeholder="Enter a strong password"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full"
            />
            <h2 className="text-xl mt-6 ml-4 text-neutral-300">
              City (Optional)
            </h2>
            <select
              placeholder="Click to select your city"
              className="bg-neutral-700 text-lg px-5 py-4 mt-2 w-full rounded-full appearance-none"
            >
              <option className="" value="">
                Ranchi
              </option>
              <option className="" value="">
                Delhi
              </option>
            </select>
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
    </div>
  );
};

export default RegisterAttendee;

//do e.preventDefault
