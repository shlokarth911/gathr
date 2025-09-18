import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const fetchAttedeeProfile = async () => {
  try {
    const token = localStorage.getItem("attendee_token");

    const response = await axios.get(`${API_BASE}/attendee/profile`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });

    const payload = Array.isArray(response.data)
      ? response.data
      : response.data?.attendee || response.data;
    return {
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber || "",
      _id: payload._id,
      bookings: payload.bookings || [],
    };
  } catch (error) {
    console.error("Error fetching attendee profile:", error);
    throw error;
  }
};

export const updateAttendeeProfile = async (attendeeData) => {
  try {
    const token = localStorage.getItem("attendee_token");
    const response = await axios.put(
      `${API_BASE}/attendee/profile`,
      attendeeData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
