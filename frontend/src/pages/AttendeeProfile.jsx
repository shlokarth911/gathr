import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AttendeeDataContext } from "../contexts/AttendeeContext";
import ProfileHeader from "../components/attendee_profile/ProfileHeader";
import AttendeeActions from "../components/attendee_profile/AttendeeActions";
import AttendeeDetails from "../components/attendee_profile/AttendeeDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AttendeeEditProfilePannel from "../components/attendee_profile/AttendeeEditProfilePannel";
import { fetchAttedeeProfile } from "../api/attendeeApi";

const AttendeeProfile = () => {
  const navigate = useNavigate();
  const { setAttendee } = useContext(AttendeeDataContext);

  const editAttendeeProfileRef = useRef(null);
  const mainScreenRef = useRef(null);
  const [mainScreen, setMainScreen] = useState(true);
  const [editAttendeeProfile, setEditAttendeeProfile] = useState(false);

  useGSAP(() => {
    if (editAttendeeProfile) {
      gsap.to(editAttendeeProfileRef.current, {
        y: 0,
        duration: 0.8,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(editAttendeeProfileRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [editAttendeeProfile]);

  useGSAP(() => {
    if (editAttendeeProfile) {
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
  }, [editAttendeeProfile]);

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

  useEffect(() => {
    const getAttendeeProfile = async () => {
      try {
        const data = await fetchAttedeeProfile();
        setAttendee(data);
      } catch (error) {
        console.log("Error fetching attendee profile:", error);
      }
    };

    getAttendeeProfile();
  }, [setAttendee]);

  const signOut = () => {
    localStorage.removeItem("attendee_token");
    setAttendee({});
    navigate("/attendee/login");
  };

  return (
    <main>
      <div
        onClick={() => {
          if (editAttendeeProfile) setEditAttendeeProfile(false);
        }}
        ref={mainScreenRef}
        className="max-w-5xl mx-auto w-full"
      >
        <ProfileHeader setEditAttendeeProfile={setEditAttendeeProfile} />

        {/* Attndee Details */}
        <AttendeeDetails />

        <AttendeeActions signOut={signOut} />
      </div>

      <div className="h-32" />

      <div
        ref={editAttendeeProfileRef}
        className="fixed bottom-0 z-20 w-full max-w-5xl mx-auto left-0 right-0 transform -translate-y-[-100%]"
      >
        <AttendeeEditProfilePannel
          setEditAttendeeProfile={setEditAttendeeProfile}
        />
      </div>
    </main>
  );
};

export default AttendeeProfile;
