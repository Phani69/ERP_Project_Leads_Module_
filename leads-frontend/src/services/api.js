import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/leads"; // Your backend API

// Fetch all leads
export const fetchLeads = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
};

// Add a new lead
export const addLead = async (leadData) => {
  try {
    const response = await axios.post(API_BASE_URL, leadData);
    return response.data;
  } catch (error) {
    console.error("Error adding lead:", error);
    return null;
  }
};

// Update a lead
export const updateLead = async (id, leadData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, leadData);
    return response.data;
  } catch (error) {
    console.error("Error updating lead:", error);
    return null;
  }
};

// Delete a lead
export const deleteLead = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting lead:", error);
  }
};
