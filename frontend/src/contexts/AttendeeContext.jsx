import React, { createContext, useState } from "react";

export const AttendeeDataContext = createContext();

export const AttendeeDataProvider = ({ children }) => {
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
