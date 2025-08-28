import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import { useLocation, useNavigate } from "react-router-dom";

const AttendeeProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "home", label: "Home", path: "/attendee/home" },
    { key: "bookings", label: "Bookings", path: "/onboard" },
    { key: "favorites", label: "Favorites" },
    { key: "profile", label: "Profile", path: "/attendee/profile" },
  ];

  const currentItem =
    items.find((item) => item.path === location.pathname) || items[0];

  return (
    <div className="w-full h-screen bg-black">
      <h1>AttendeeProfile</h1>

      <div className="w-[100%] fixed flex items-center justify-center bottom-[3%] ">
        <div className="w-[80%] flex items-center justify-center">
          <NavigationMenu
            activeKey={currentItem.key}
            onChange={(key) => {
              const selected = items.find((i) => i.key === key);
              if (selected) navigate(selected.path);
            }}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendeeProfile;
