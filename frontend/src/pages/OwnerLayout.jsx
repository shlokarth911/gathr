import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenu from "../components/ui/NavigationMenu";

const items = [
  { key: "home", label: "Home", path: "/owner/home" },
  { key: "bookings", label: "Bookings", path: "/owner/bookings" },
  { key: "venues", label: "Venues", path: "/owner/venues" },
  { key: "profile", label: "Profile", path: "/owner/profile" },
];
const OwnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentItem =
    items.find((item) => item.path === location.pathname) || items[0];

  return (
    <div className="bg-neutral-900 min-h-screen text-white w-full h-full relative">
      {/* Page content */}
      <Outlet />

      {/* Centralized Navbar */}
      <div className="w-full bg-neutral-950/10 fixed flex items-center justify-center bottom-[2%]">
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

export default OwnerLayout;
