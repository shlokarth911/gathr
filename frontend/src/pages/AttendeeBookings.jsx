import { Calendar, Clock, Users } from "lucide-react";
import React from "react";
import BookingCard from "../components/attendee_bookings/BookingCard";
import { useEffect } from "react";
import { listBookingsForAttendee } from "../api/bookingApi";
import { useState } from "react";

const AttendeeBookings = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const listBookings = async () => {
      try {
        const res = await listBookingsForAttendee();

        setBookingData(res.data);
      } catch (error) {
        alert("Error fetching bookings");
        console.error("Error fetching bookings:", error);
      }
    };

    listBookings();
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bookings</h1>

        {bookingData.length === 0 ? (
          <div className="text-neutral-400 mt-6">No bookings found.</div>
        ) : (
          bookingData.map(({ booking, venue }) => (
            <BookingCard key={booking._id} booking={booking} venue={venue} />
          ))
        )}
      </div>
    </>
  );
};

export default AttendeeBookings;
