import React from "react";
import OwnerHeader from "../components/owner_home/OwnerHeader";
import { ArrowRight, Star } from "lucide-react";
import OwnerVenues from "../components/owner_home/OwnerVenues";

const OwnerHome = () => {
  const ownedVenues = [
    {
      name: "Mount View",
      address: "Ranchi",
      img: "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
      status: "booked",
      price: "50000",
      averageRating: 4.5,
    },
    {
      name: "Mount View",
      address: "Ranchi",
      img: "https://images.unsplash.com/photo-1712226652059-a34d334e6cd0?q=80&w=1170&auto=format&fit=crop",
      status: "booked",
      price: "50000",
      averageRating: 4.5,
    },
  ];

  return (
    <div>
      {/* Header */}
      <OwnerHeader />

      {/* Your Venues */}
      <OwnerVenues ownedVenues={ownedVenues} />

      {/* Statistics */}
      {/* TODO : Add Statistics */}
    </div>
  );
};

export default OwnerHome;
