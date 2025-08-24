import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import { Camera, Home, Newspaper, Search, Settings } from "lucide-react";

const AtendeeHome = () => {
  return (
    <main className="bg-neutral-900 h-screen">
      <div className="w-[100%] fixed flex items-center justify-center bottom-[3%] ">
        <div className="w-[80%] flex items-center justify-center">
          <NavigationMenu />
        </div>
      </div>
    </main>
  );
};

// ..make the navmenu fleible by inputiing coustom data

export default AtendeeHome;
