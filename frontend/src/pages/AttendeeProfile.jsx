import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AttendeeDataContext } from "../contexts/AttendeeContext";
import axios from "axios";
import ProfileHeader from "../components/attendee_profile/ProfileHeader";
import AvatarSection from "../components/attendee_profile/AvatarSection";
import ProfileForm from "../components/attendee_profile/ProfileForm";
import ActionButtons from "../components/attendee_profile/ActionButtons";
import QuickLinks from "../components/attendee_profile/QuickLinks";

const AttendeeProfile = () => {
  const navigate = useNavigate();
  const { attendee, setAttendee } = useContext(AttendeeDataContext);

  const defaultUser = { name: "User" }; // keep your default

  const [user, setUser] = useState(attendee || defaultUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [saving] = useState(false);

  const rootRef = useRef(null);
  const avatarRef = useRef(null);

  // fetch profile from backend (same as before)...

  const uploadAvatar = (file) => {
    const url = URL.createObjectURL(file);
    setUser((u) => ({ ...u, avatar: url }));
    setForm((f) => ({ ...f, avatar: url }));
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("attendee_token");
      if (!token) {
        alert("Not logged in!");
        return;
      }

      // Make API call to update profile
      const res = await axios.put(
        "http://localhost:5000/attendee/profile",
        form, // sending the updated form data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // If successful, update both local state and context
      setUser(res.data); // update local UI
      setAttendee(res.data); // update context
      setEditing(false);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };
  const signOut = () => {
    localStorage.removeItem("attendee_token");
    setAttendee({});
    navigate("/attendee/login");
  };

  return (
    <main
      ref={rootRef}
      className="min-h-screen bg-neutral-900 text-white px-4 pb-24 pt-3"
    >
      <ProfileHeader onEdit={() => setEditing(!editing)} editing={editing} />
      <AvatarSection
        user={user}
        avatarRef={avatarRef}
        uploadAvatar={uploadAvatar}
      />
      <ProfileForm
        form={form}
        onChangeField={(k, v) => setForm({ ...form, [k]: v })}
        editing={editing}
      />
      <ActionButtons
        editing={editing}
        saveProfile={saveProfile}
        saving={saving}
        setEditing={setEditing}
        setForm={setForm}
        user={user}
        navigate={navigate}
      />
      <QuickLinks navigate={navigate} signOut={signOut} />
      <div className="h-32" />
    </main>
  );
};

export default AttendeeProfile;
