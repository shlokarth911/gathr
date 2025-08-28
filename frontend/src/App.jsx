import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterAttendee from "./pages/RegisterAttendee";
import RegisterOwner from "./pages/RegisterOwner";
import LoginAttendee from "./pages/LoginAttendee";
import OnBoard from "./pages/OnBoard";
import LoginOwner from "./pages/LoginOwner";
import AtendeeHome from "./pages/AtendeeHome";
import AttendeeProfile from "./pages/AttendeeProfile";
import AttendeeLayout from "./components/AttendeeLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/attendee/register" element={<RegisterAttendee />} />
        <Route path="/attendee/login" element={<LoginAttendee />} />
        <Route path="/owner/register" element={<RegisterOwner />} />
        <Route path="/owner/login" element={<LoginOwner />} />

        {/* Secure paths */}

        <Route path="/attendee" element={<AttendeeLayout />}>
          <Route path="home" element={<AtendeeHome />} />
          <Route path="profile" element={<AttendeeProfile />} />
          {/* Add other attendee pages here */}
        </Route>
        {/* Other routes */}
      </Routes>
    </>
  );
};

export default App;
