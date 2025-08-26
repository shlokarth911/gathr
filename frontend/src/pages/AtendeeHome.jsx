import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import {
  Camera,
  Home,
  Newspaper,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

const AtendeeHome = () => {
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "Venues" },
    { key: "services", label: "Services" },
    { key: "contact", label: "Contact" },
  ];

  const categories = [
    {
      name: "Luxury",
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  //add mock data

  return (
    <main className="bg-neutral-900 h-screen text-white">
      <div className="p-6 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-white p-2 rounded-full">
            <UserRound color="black" size={20} />
          </div>
          <h3 className="text-base font-semibold">Hi, Alex</h3>
        </div>
        {/* <div></div> Add notifications pannel */}
      </div>

      <div className="p-6 pt-7">
        <p className="text-2xl font-bold">
          Your next unforgettable <br /> event starts here.
        </p>

        <form action="">
          <div className="mt-7  relative">
            <input
              type="text"
              className="bg-neutral-100 w-full py-3 px-5 rounded-2xl text-lg text-black placeholder:text-neutral-500 shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.08)]"
              placeholder="Search for your venue"
            />
            <button
              type="submit"
              className="absolute top-[50%] right-0 bg-white p-2 transform- translate-y-[-50%] translate-x-[-30%] rounded-full shadow-[0px_10px_20px_0px_rgba(0,_0,_0,_0.15)]"
            >
              <Search color="black" size={20} />
            </button>
          </div>
        </form>
      </div>

      <div className="p-7 pt-3">
        <h2 className="text-lg font-semibold ">Categories</h2>

        <div className="py-2 flex w-full overflow-x-scroll gap-4">
          {categories.map((category, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-nowrap items-center gap-3 px-3 py-1 pl-1 font-semibold rounded-2xl bg-neutral-600  flex-shrink-0 h-16"
              >
                <img
                  src={category.img}
                  alt=""
                  className="h-12 rounded-xl w-16 object-cover"
                />
                <p className="inline-block">{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[100%] fixed flex items-center justify-center bottom-[3%] ">
        <div className="w-[80%] flex items-center justify-center">
          <NavigationMenu items={items} />
        </div>
      </div>
    </main>
  );
};

// ..make the navmenu fleible by inputiing coustom data

export default AtendeeHome;
