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
import { AttendeeDataProvider } from "./contexts/AttendeeContext"; // <-- import provider
import BookingsPage from "./pages/BookingsPage";
import AttendeeProtectedWrapper from "./pages/AttendeeProtectedWrapper";
import OwnerLayout from "./pages/OwnerLayout";
import OwnerHome from "./pages/OwnerHome";

const App = () => {
  return (
    <AttendeeDataProvider>
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
          <Route path="bookings" element={<BookingsPage />} />
          {/* Add other attendee pages here */}
        </Route>

        <Route path={"/owner"} element={<OwnerLayout />}>
          <Route path="home" element={<OwnerHome />} />
        </Route>
      </Routes>
    </AttendeeDataProvider>
  );
};

export default App;
