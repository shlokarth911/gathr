import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenu from "../NavigationMenu";

const items = [
  { key: "home", label: "Home", path: "/attendee/home" },
  { key: "bookings", label: "Bookings", path: "/attendee/bookings" },
  { key: "favorites", label: "Favorites" },
  { key: "profile", label: "Profile", path: "/attendee/profile" },
];

const AttendeeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentItem =
    items.find((item) => item.path === location.pathname) || items[0];

  return (
    <div className="bg-neutral-900 min-h-screen text-white w-full h-full relative">
      {/* Page content */}
      <Outlet />

      {/* Centralized Navbar */}
      <div className="w-full bg-neutral-950/10 fixed flex items-center justify-center bottom-[3%]">
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

export default AttendeeLayout;
