import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/ai";

export const predictLeadConversion = async (source, status) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-lead`, { source, status });
    return response.data;
  } catch (error) {
    console.error("Error fetching AI prediction:", error);
    return { conversionScore: 0, recommendation: "No prediction available" };
  }
};
