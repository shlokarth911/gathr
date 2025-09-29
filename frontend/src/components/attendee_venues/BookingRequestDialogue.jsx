import React, { useState } from "react";
import { createBookingRequest } from "../../api/bookingApi";

const BookingRequestDialogue = ({ setIsDialogueOpen, selectedVenue }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!name || !date || !time || !numberOfGuests) {
        alert("Please fill all the fields");
        return;
      }
      const bookingData = {
        event: name,
        venue: selectedVenue,
        date,
        time,
        numberOfGuests,
      };

      await createBookingRequest(bookingData);
      setIsDialogueOpen(false);
      alert("Booking Request Sent Successfully");
    } catch (error) {
      console.log(`Error in creating booking request: ${error}`);
      alert("Failed to create booking request");
    } finally {
      setName("");
      setDate("");
      setTime("");
      setNumberOfGuests("");
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-2xl ">
      <h1 className="text-xl font-semibold">Confirm Request</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <div>
          <p className="text-sm">Event Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-neutral-800/90 text-base px-3 py-3 mt-2 rounded-xl w-full focus:ring-2  focus:outline-none focus:ring-emerald-800 transition"
            placeholder="e.g., Marriage Anniversary"
          />
        </div>
        <div>
          <p>Event Date</p>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="bg-neutral-800/90 text-base px-3 py-3 mt-2 rounded-xl w-full focus:ring-2  focus:outline-none focus:ring-emerald-800 transition"
          />
        </div>
        <div>
          <p>Event Time</p>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            className="bg-neutral-800/90 text-base px-3 py-3 mt-2 rounded-xl w-full focus:ring-2  focus:outline-none focus:ring-emerald-800 transition"
          />
        </div>
        <div>
          <p>Number of Guests</p>
          <input
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            type="number"
            className="bg-neutral-800/90 text-base px-3 py-3 mt-2 rounded-xl w-full focus:ring-2  focus:outline-none focus:ring-emerald-800 transition"
            placeholder="e.g., 50"
          />
        </div>

        <div className="mt-4 flex w-full gap-3">
          <button
            type="submit"
            className="w-full  py-3 rounded-full text-base bg-emerald-600 text-white font-semibold"
          >
            Confirm Request
          </button>
          <button
            onClick={() => {
              setIsDialogueOpen(false);
            }}
            type="reset"
            className="w-full  py-3 rounded-full text-base border border-red-700 text-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingRequestDialogue;
