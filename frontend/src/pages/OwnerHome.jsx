import React, { useEffect, useState } from "react";
import OwnerHeader from "../components/owner_home/OwnerHeader";
import OwnerVenues from "../components/owner_home/OwnerVenues";
import OwnerStatistics from "../components/owner_home/OwnerStatistics";
import OwnerBooking from "../components/owner_home/OwnerBooking";
import { fetchOwnedVenues } from "../api/venueApi";
import { listBookings } from "../api/ownerApi";

const OwnerHome = () => {
  const [venuesData, setVenuesData] = useState([]);
  const [bookingsData, setBookingsData] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await listBookings();
        setBookingsData(res.attendees || []); // adjust based on actual response structure
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingsData({ attendees: [] }); // fallback
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchOwnerVenues = async () => {
      try {
        const data = await fetchOwnedVenues();
        // if API returns { success: true, venues: [...] } or the plain array
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

      {/* Statistics */}
      <OwnerStatistics venuesData={venuesData} />

      {/* Upcoming Bookings */}
      <OwnerBooking bookings={bookingsData} />

      {/* For temp use */}
      <div className="h-30"></div>
    </div>
  );
};

export default OwnerHome;
