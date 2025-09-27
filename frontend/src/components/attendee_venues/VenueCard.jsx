import { MapPin, Star, Users } from "lucide-react";

const VenueCard = ({ venue, onClick }) => (
  <div
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={`View details for ${venue.name}`}
    onKeyPress={(e) => {
      if (e.key === "Enter") onClick();
    }}
    className="bg-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl group"
  >
    <div className="relative">
      <img
        src={venue.image}
        alt={venue.name}
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-5 flex flex-col flex-1 relative">
      <span className="absolute right-2 top-2 backdrop-blur-2xl bg-neutral-50/20 text-white text-xl font-bold px-3 py-1 rounded-full shadow-lg ">
        ₹{venue.price.toLocaleString()}{" "}
        <span className="text-sm text-neutral-300">/ day</span>
      </span>
      <span className="absolute bottom-5 right-2 backdrop-blur-2xl bg-neutral-50/20 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg ">
        4.5 <Star className="w-4 h-4 inline-block text-yellow-400 ml-1" />
      </span>
      <h2 className="text-lg font-bold text-white mb-1 truncate">
        {venue.name}
      </h2>

      <div className="flex items-center text-gray-400 text-sm mb-1">
        <MapPin className="w-4 h-4 mr-1 text-blue-400" />
        {venue.address}
      </div>
      <div className="flex items-center text-gray-400 text-sm">
        <Users className="w-4 h-4 mr-1 text-green-400" />
        Capacity: <span className="ml-1 font-semibold">
          {venue.capacity}
        </span>{" "}
        guests
      </div>
    </div>
  </div>
);

export default VenueCard;
