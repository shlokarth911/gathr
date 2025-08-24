import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterAttendee from "./pages/RegisterAttendee";
import RegisterOwner from "./pages/RegisterOwner";
import LoginAttendee from "./pages/LoginAttendee";
import OnBoard from "./pages/OnBoard";
import LoginOwner from "./pages/LoginOwner";
import AtendeeHome from "./pages/AtendeeHome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/register-attendee" element={<RegisterAttendee />} />
        <Route path="/login-attendee" element={<LoginAttendee />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/login-owner" element={<LoginOwner />} />

        {/* Secure paths */}
        <Route path="/home-attendee" element={<AtendeeHome />} />
      </Routes>
    </>
  );
};

export default App;
