import React, { Children, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AttendeeDataContext } from "../contexts/AttendeeContext";
import axios from "axios";

const AttendeeProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("attendee_token");
  const navigate = useNavigate();
  const { setAttendee } = useContext(AttendeeDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/attendee/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAttendee(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/attendee/login");
      });
  }, [token, setAttendee, navigate, setIsLoading]);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default AttendeeProtectedWrapper;
