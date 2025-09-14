import React, { useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import OwnerProfileHeader from "../components/owner_profile/OwnerProfileHeader";
import OwnerDetails from "../components/owner_profile/OwnerDetails";
import OwnerStats from "../components/attendee_profile/OwnerStats";
import OwnerActions from "../components/attendee_profile/OwnerActions";
import OwnerEditProfilePannel from "../components/attendee_profile/OwnerEditProfilePannel";
import { useNavigate } from "react-router-dom";
import { OwnerDataContext } from "../contexts/OwnerContext";
import gsap from "gsap";

const OwnerProfile = () => {
  const [editOwnerProfile, setEditOwnerProfile] = useState(false);
  const { setOwner } = useContext(OwnerDataContext);
  const editOwnerProfileRef = useRef(null);

  const navigate = useNavigate();

  useGSAP(() => {
    if (editOwnerProfile) {
      gsap.to(editOwnerProfileRef.current, {
        y: 0,
        duration: 0.8,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(editOwnerProfileRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [editOwnerProfile]);

  const stats = {
    pending: 2,
    confirmed: 3,
    completed: 1,
  };

  const signOut = () => {
    localStorage.removeItem("owner_token");
    setOwner({});
    navigate("/owner/login");
  };

  return (
    <>
      {/* Header */}
      <OwnerProfileHeader setEditOwnerProfile={setEditOwnerProfile} />

      {/* Owner Details */}
      <OwnerDetails />

      {/* Owner stats */}
      <OwnerStats stats={stats} />

      {/* Owner Actions */}
      <OwnerActions signOut={signOut} />

      {/* Edit Profile Pannel */}
      <div
        ref={editOwnerProfileRef}
        className="fixed bottom-0 z-20 w-full transform -translate-y-[-100%]"
      >
        <OwnerEditProfilePannel setEditOwnerProfile={setEditOwnerProfile} />
      </div>

      <div className="w-full h-28"></div>
    </>
  );
};

export default OwnerProfile;
