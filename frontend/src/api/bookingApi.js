import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const createBookingRequest = (bookingData) => {
  const attendeeToken = localStorage.getItem("attendee_token");
  return axios.post(`${API_BASE}/booking/request`, bookingData, {
    headers: {
      Authorization: `Bearer ${attendeeToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
