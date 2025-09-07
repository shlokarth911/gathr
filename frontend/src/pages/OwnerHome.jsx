import React from "react";
import OwnerHeader from "../components/owner_home/OwnerHeader";
import OwnerVenues from "../components/owner_home/OwnerVenues";
import OwnerStatistics from "../components/owner_home/OwnerStatistics";
import OwnerBooking from "../components/owner_home/OwnerBooking";

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

  const mockBookings = [
    {
      id: "b_1001",
      guestName: "Jenny Patel",
      guestAvatar: "", // leave empty or put a placeholder URL
      guestContact: "+91-98765-43210",
      venueId: "v_201",
      venueName: "The Grand Hall",
      date: "2025-09-18T00:00:00.000Z",
      time: "18:30",
      guests: 120,
      price: 50000,
      status: "Confirmed",
    },
    {
      id: "b_1002",
      guestName: "Rahul Sharma",
      guestAvatar: "",
      guestContact: "+91-91234-56789",
      venueId: "v_202",
      venueName: "Rooftop Oasis",
      date: "2025-10-02T00:00:00.000Z",
      time: "14:00",
      guests: 60,
      price: 22000,
      status: "Pending",
    },
    {
      id: "b_1003",
      guestName: "Sara Khan",
      guestAvatar: "",
      guestContact: "",
      venueId: "v_203",
      venueName: "Sunset Garden",
      date: "2025-11-11T00:00:00.000Z",
      time: "11:00",
      guests: 40,
      price: 15000,
      status: "Confirmed",
    },
    {
      id: "b_1004",
      guestName: "Arjun Mehta",
      guestAvatar: "",
      guestContact: "+91-99876-54321",
      venueId: "v_201",
      venueName: "The Grand Hall",
      date: "2025-08-05T00:00:00.000Z",
      time: "19:00",
      guests: 200,
      price: 90000,
      status: "Past",
    },
    {
      id: "b_1005",
      guestName: "Kavita Rao",
      guestAvatar: "",
      guestContact: "+91-90123-45678",
      venueId: "v_204",
      venueName: "Green Pavilion",
      date: "2025-12-01T00:00:00.000Z",
      time: "17:00",
      guests: 80,
      price: 38000,
      status: "Confirmed",
    },
    {
      id: "b_1006",
      guestName: "Vikram Singh",
      guestAvatar: "",
      guestContact: "",
      venueId: "v_205",
      venueName: "Lakeside Terrace",
      date: "2025-07-20T00:00:00.000Z",
      time: "16:30",
      guests: 30,
      price: 12000,
      status: "Cancelled",
    },
    {
      id: "b_1007",
      guestName: "Meera Iyer",
      guestAvatar: "",
      guestContact: "+91-92345-67890",
      venueId: "v_202",
      venueName: "Rooftop Oasis",
      date: "2025-09-22T00:00:00.000Z",
      time: "20:00",
      guests: 50,
      price: 27000,
      status: "Confirmed",
    },
    {
      id: "b_1008",
      guestName: "Aditya Kumar",
      guestAvatar: "",
      guestContact: "+91-93456-78901",
      venueId: "v_206",
      venueName: "City Banquet",
      date: "2026-01-15T00:00:00.000Z",
      time: "13:00",
      guests: 150,
      price: 110000,
      status: "Pending",
    },
  ];

  return (
    <div>
      {/* Header */}
      <OwnerHeader />

      {/* Your Venues */}
      <OwnerVenues ownedVenues={ownedVenues} />

      {/* Statistics */}
      <OwnerStatistics />

      {/* Upcoming Bookings */}
      <OwnerBooking bookings={mockBookings} />

      {/* For temp use */}
      <div className="h-30"></div>
    </div>
  );
};

export default OwnerHome;
