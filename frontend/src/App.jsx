import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterAttendee from "./pages/RegisterAttendee";
import RegisterOwner from "./pages/RegisterOwner";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register-attendee" element={<RegisterAttendee />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
      </Routes>
    </>
  );
};

export default App;
