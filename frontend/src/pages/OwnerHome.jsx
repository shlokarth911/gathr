import React, { useEffect, useState } from "react";
import OwnerHeader from "../components/owner_home/OwnerHeader";
import OwnerVenues from "../components/owner_home/OwnerVenues";
import OwnerStatistics from "../components/owner_home/OwnerStatistics";
import OwnerBooking from "../components/owner_home/OwnerBooking";
import { fetchOwnedVenues } from "../api/venueApi";
import { listBookingsForOwner } from "../api/bookingApi";

const OwnerHome = () => {
  const [venuesData, setVenuesData] = useState([]);
  const [bookingsData, setBookingsData] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await listBookingsForOwner();

        setBookingsData(res.data);
      } catch (error) {
        console.error("Error fetching bookings for owner:", error);
        setBookingsData([]);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchOwnerVenues = async () => {
      try {
        const data = await fetchOwnedVenues();

        const payload = Array.isArray(data) ? data : data?.venues ?? data;
        setVenuesData(payload || []);
      } catch (error) {
        console.error("loadVenues error:", error);
      }
    };

    fetchOwnerVenues();
  }, []);

  return (
    <div>
      {/* Header */}
      <OwnerHeader />
      {/* Your Venues */}
      <OwnerVenues venuesData={venuesData} />
      {/* 
      <OwnerStatistics venuesData={venuesData} /> */}
      {/* Upcoming Bookings */}
      <OwnerBooking bookings={bookingsData} />
      {/* For temp use */}
      <div className="h-30"></div>
    </div>
  );
};

export default OwnerHome;
