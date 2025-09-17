import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import OwnerProfileHeader from "../components/owner_profile/OwnerProfileHeader";
import OwnerDetails from "../components/owner_profile/OwnerDetails";
import OwnerStats from "../components/attendee_profile/OwnerStats";
import OwnerActions from "../components/attendee_profile/OwnerActions";
import OwnerEditProfilePannel from "../components/attendee_profile/OwnerEditProfilePannel";
import { useNavigate } from "react-router-dom";
import { OwnerDataContext } from "../contexts/OwnerContext";
import gsap from "gsap";
import { fetchOwnerProfile } from "../api/ownerApi";

const OwnerProfile = () => {
  const [editOwnerProfile, setEditOwnerProfile] = useState(false);
  const [mainScreen, setMainScreen] = useState(true);

  const { setOwner } = useContext(OwnerDataContext);

  const editOwnerProfileRef = useRef(null);
  const mainScreenRef = useRef(null);

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

  useGSAP(() => {
    if (editOwnerProfile) {
      gsap.to(mainScreenRef.current, {
        scale: 0.95,
        duration: 0.8,
        opacity: 0.5,
        ease: "expo.inOut",
      });

      setMainScreen(false);
    } else {
      gsap.to(mainScreenRef.current, {
        scale: 1,
        duration: 0.8,
        opacity: 1,
        ease: "expo.inOut",
      });

      setMainScreen(true);
    }
  }, [editOwnerProfile]);

  useGSAP(() => {
    if (mainScreen) {
      gsap.to(mainScreenRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(mainScreenRef.current, {
        opacity: 0.5,
        scale: 0.95,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [mainScreen]);

  const stats = {
    pending: 2,
    confirmed: 3,
    completed: 1,
  };

  //fetch Owner profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchOwnerProfile();
        setOwner(data);
      } catch (error) {
        console.log("Error fetching owner profile data:", error);
      }
    };

    loadProfileData();
  }, [setOwner]);

  const signOut = () => {
    localStorage.removeItem("owner_token");
    setOwner({});
    navigate("/owner/login");
  };

  return (
    <>
      <div
        onClick={() => {
          if (editOwnerProfile) setEditOwnerProfile(false);
        }}
        ref={mainScreenRef}
      >
        {/* Header */}
        <OwnerProfileHeader setEditOwnerProfile={setEditOwnerProfile} />
        {/* Owner Details */}
        <OwnerDetails />
        {/* Owner stats */}
        <OwnerStats stats={stats} />
        {/* Owner Actions */}
        <OwnerActions signOut={signOut} />
      </div>

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
