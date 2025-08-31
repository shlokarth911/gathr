import React, { createContext, useState } from "react";

export const AttendeeDataContext = createContext();

const AttendeeContext = ({ children }) => {
  const [attendee, setAttendee] = useState({
    email: "",
    name: "",
    password: "",
    city: "",
    phoneNumber: "",
  });

  return (
    <AttendeeDataContext.Provider value={{ attendee, setAttendee }}>
      {children}
    </AttendeeDataContext.Provider>
  );
};

export default AttendeeContext;
