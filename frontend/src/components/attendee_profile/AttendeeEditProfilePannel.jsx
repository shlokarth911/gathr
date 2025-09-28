import { Check, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { updateAttendeeProfile } from "../../api/attendeeApi";

const AttendeeEditProfilePannel = ({ setEditAttendeeProfile }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const submitHandler = (e) => {
    try {
      e.preventDefault();

      if (!name || !email || !phoneNumber || !city) {
        alert("Please fill all the fields");
        return;
      }

      const attendeeData = {
        name,
        email,
        phoneNumber,
        city,
      };

      updateAttendeeProfile(attendeeData);
      setEditAttendeeProfile(false);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(`Error in updating profile: ${error}`);
    }
  };

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

  return (
    <div>
      <div className="bg-neutral-950/50 w-full p-6 rounded-t-4xl backdrop-blur-xl">
        <div
          onClick={() => {
            setEditAttendeeProfile(false);
          }}
          className="w-full items-center justify-center flex"
        >
          <ChevronUp size={28} />
        </div>
        <h1 className="text-lg  font-semibold">Edit Your Profile</h1>

        <form onSubmit={submitHandler} className="mt-4 flex flex-col gap-4 ">
          <div>
            <p className="text-sm ml-2 text-neutral-400">Name</p>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-transparent text-white placeholder:text-neutral-400 outline-none border border-white/10"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <p className="text-sm ml-2 text-neutral-400">Email</p>
            <input
              type="email"
              placeholder="email@email.com"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-transparent text-white placeholder:text-neutral-400 outline-none border border-white/10"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <p className="text-sm ml-2 text-neutral-400">Phone Number</p>
            <input
              type="text"
              placeholder="XXX-XXX-XXXX"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-transparent text-white placeholder:text-neutral-400 outline-none border border-white/10"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div>
            <p className="text-sm ml-2 text-neutral-400">City</p>
            <label htmlFor="city">
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-transparent text-white placeholder:text-neutral-400 outline-none border border-white/10"
              >
                <option className="bg-neutral-800" value="" disabled>
                  Select your city
                </option>
                {cities.map((city) => (
                  <option className="bg-neutral-800" key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button>
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-neutral-50 text-black font-semibold">
              <span className="text-lg">Save</span>
              <Check size={20} />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendeeEditProfilePannel;
