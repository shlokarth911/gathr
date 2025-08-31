import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OwnerDataContext } from "../contexts/OwnerContext";
import axios from "axios";

const OwnerProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("owner_token");
  const { setOwner } = useContext(OwnerDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/owner/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/owner/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setOwner(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("owner_token");
        navigate("/owner/login");
      });
  }, [token, navigate, setOwner]);

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

export default OwnerProtectedWrapper;
