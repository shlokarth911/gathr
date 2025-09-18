import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const fetchOwnedVenues = async () => {
  try {
    const token = localStorage.getItem("owner_token");
    const response = await axios.get(`${API_BASE}/venue/get`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });

    const payload = Array.isArray(response.data)
      ? response.data
      : response.data.venues || [];

    return payload.map((venue) => ({
      name: venue.name,
      address: venue.address,
      img: venue.images?.[0],
      status: venue.status,
      price: (venue.price ?? "").toString(),
      averageRating: venue.averageRating || 0,
      _id: venue._id,
    }));
  } catch (error) {
    console.error(
      "Error fetching owned venues:",
      error.response?.status,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchVenueDetails = async (venueID) => {
  try {
    const token = localStorage.getItem("owner_token");
    const response = await axios.get(`${API_BASE}/venue/get/${venueID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });

    const venue = response.data.venue;
    return {
      name: venue.name,
      address: venue.address,
      img: venue.images,
      amenities: venue.amenities,
      status: venue.status,
      price: (venue.price ?? "").toString(),
      averageRating: venue.averageRating || 0,
      _id: venue._id,
    };
  } catch (error) {
    console.error(
      "Error fetching venue details:",
      error.response?.status,
      error.response?.data || error.message
    );
    throw error;
  }
};
