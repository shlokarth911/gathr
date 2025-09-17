import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const fetchOwnerProfile = async () => {
  try {
    const token = localStorage.getItem("owner_token");
    const response = await axios.get(`${API_BASE}/owner/profile`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });

    const payload = Array.isArray(response.data)
      ? response.data
      : response.data?.owner || response.data;

    return {
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber || "",
      owningVenues: payload.owningVenues || [],
      _id: payload._id,
    };
  } catch (error) {
    console.error("Error fetching owner profile:", error);
    throw error;
  }
};

export const updateOwnerProfile = async (ownerData) => {
  try {
    const token = localStorage.getItem("owner_token");
    const response = await axios.put(`${API_BASE}/owner/profile`, ownerData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating owner profile:", error);
    throw error;
  }
};

export const listBookings = async () => {
  try {
    const token = localStorage.getItem("owner_token");
    const response = await axios.get(`${API_BASE}/owner/bookings`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
