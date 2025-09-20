import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterAttendee from "./pages/RegisterAttendee";
import RegisterOwner from "./pages/RegisterOwner";
import LoginAttendee from "./pages/LoginAttendee";
import OnBoard from "./pages/OnBoard";
import LoginOwner from "./pages/LoginOwner";
import AtendeeHome from "./pages/AtendeeHome";
import AttendeeProfile from "./pages/AttendeeProfile";
import AttendeeLayout from "./components/attendee_home/AttendeeLayout";
import AttendeeContext from "./contexts/AttendeeContext";
import OwnerContext from "./contexts/OwnerContext";
import AttendeeProtectedWrapper from "./pages/AttendeeProtectedWrapper";
import OwnerLayout from "./pages/OwnerLayout";
import OwnerHome from "./pages/OwnerHome";
import OwnerProtectedWrapper from "./pages/OwnerProtectedWrapper";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerVenues from "./pages/OwnerVenues";
import OwnerProfile from "./pages/OwnerProfile";
import AttendeeBookings from "./pages/AttendeeBookings";

const App = () => {
  return (
    <AttendeeContext>
      <OwnerContext>
        <Routes>
          <Route path="/onboard" element={<OnBoard />} />
          <Route path="/attendee/register" element={<RegisterAttendee />} />
          <Route path="/attendee/login" element={<LoginAttendee />} />
          <Route path="/owner/register" element={<RegisterOwner />} />
          <Route path="/owner/login" element={<LoginOwner />} />

          {/* Secure paths */}
          <Route
            path="/attendee"
            element={
              <AttendeeProtectedWrapper>
                <AttendeeLayout />
              </AttendeeProtectedWrapper>
            }
          >
            <Route path="home" element={<AtendeeHome />} />
            <Route path="profile" element={<AttendeeProfile />} />
            <Route path="bookings" element={<AttendeeBookings />} />
            {/* Add other attendee pages here */}
          </Route>

          <Route
            path={"/owner"}
            element={
              <OwnerProtectedWrapper>
                <OwnerLayout />
              </OwnerProtectedWrapper>
            }
          >
            <Route path="home" element={<OwnerHome />} />
            <Route path="bookings" element={<OwnerBookings />} />
            <Route path="venues" element={<OwnerVenues />} />
            <Route path="profile" element={<OwnerProfile />} />
          </Route>
        </Routes>
      </OwnerContext>
    </AttendeeContext>
  );
};

export default App;
