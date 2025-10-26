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

export const listBookingsForAttendee = async () => {
  const attendeeToken = localStorage.getItem("attendee_token");
  return axios.get(`${API_BASE}/booking/list_atendee`, {
    headers: {
      Authorization: `Bearer ${attendeeToken}`,
    },
    withCredentials: true,
  });
};

export const listBookingsForOwner = async () => {
  const ownerToken = localStorage.getItem("owner_token");
  return axios.get(`${API_BASE}/booking/list_owner`, {
    headers: {
      Authorization: `Bearer ${ownerToken}`,
    },
    withCredentials: true,
  });
};

export const rejectBooking = async (bookingId) => {
  const ownerToken = localStorage.getItem("owner_token");
  return axios.post(
    `${API_BASE}/booking/reject/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${ownerToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const acceptBooking = async (bookingId) => {
  try {
    const ownerToken = localStorage.getItem("owner_token");
    return axios.post(
      `${API_BASE}/booking/accept/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${ownerToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    alert("Error confirming booking");
    console.log(error);
  }
};

export const setPayableAmount = async (bookingId, amount) => {
  try {
    const ownerToken = localStorage.getItem("owner_token");
    return axios.post(
      `${API_BASE}/booking/set_payable_amount/${bookingId}`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${ownerToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    alert("Error confirming booking");
    console.log(error);
  }
};
