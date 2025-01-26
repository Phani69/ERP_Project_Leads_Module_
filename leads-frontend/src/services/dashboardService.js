import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/dashboard";

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};
