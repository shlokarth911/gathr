import { Check, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { updateOwnerProfile } from "../../api/ownerApi";

const OwnerEditProfilePannel = ({ setEditOwnerProfile }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber) {
      alert("Please fill all the fields");
      return;
    }

    const ownerData = {
      name,
      email,
      phoneNumber,
    };

    updateOwnerProfile(ownerData);
    setEditOwnerProfile(false);

    console.log(ownerData);
  };

  return (
    <div>
      <div className="bg-neutral-950/50 w-full p-6 rounded-t-4xl backdrop-blur-xl">
        <div className="w-full items-center justify-center flex">
          <ChevronUp
            onClick={() => {
              setEditOwnerProfile(false);
            }}
            size={28}
          />
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

export default OwnerEditProfilePannel;
