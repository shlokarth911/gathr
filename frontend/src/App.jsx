import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterAttendee from "./pages/RegisterAttendee";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register-attendee" element={<RegisterAttendee />} />
      </Routes>
    </>
  );
};

export default App;
