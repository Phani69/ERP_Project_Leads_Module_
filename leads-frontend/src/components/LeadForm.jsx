import React, { useState, useEffect } from "react";
import { addLead, updateLead } from "../services/api";
import { predictLeadConversion } from "../services/aiService"; // ✅ AI Service
import { TextField, Select, MenuItem, Button, Paper, Typography, FormControl, InputLabel } from "@mui/material";

const LeadForm = ({ selectedLead, refreshLeads, clearSelection }) => {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Manual",
    status: "New",
  });

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (selectedLead) {
      setLead(selectedLead);
    }
  }, [selectedLead]);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lead.id) {
      await updateLead(lead.id, lead);
    } else {
      await addLead(lead);
    }
    refreshLeads();
    clearSelection();
    setLead({ name: "", email: "", phone: "", source: "Manual", status: "New" });
    setPrediction(null); // Reset prediction after submission
  };

  const getPrediction = async () => {
    const data = await predictLeadConversion(lead.source, lead.status); // ✅ Call AI API
    setPrediction(data);
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        {lead.id ? "Edit Lead" : "Add New Lead"}
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Name" name="name" variant="outlined" value={lead.name} onChange={handleChange} required fullWidth />
        <TextField label="Email" type="email" name="email" variant="outlined" value={lead.email} onChange={handleChange} required fullWidth />
        <TextField label="Phone" name="phone" variant="outlined" value={lead.phone} onChange={handleChange} required fullWidth />

        <FormControl fullWidth>
          <InputLabel>Lead Source</InputLabel>
          <Select name="source" value={lead.source} onChange={handleChange}>
            <MenuItem value="Manual">Manual</MenuItem>
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="Google">Google</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Lead Status</InputLabel>
          <Select name="status" value={lead.status} onChange={handleChange}>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Converted">Converted</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {lead.id ? "Update Lead" : "Add Lead"}
        </Button>

        {/* AI Prediction Button */}
        <Button variant="contained" color="success" onClick={getPrediction} fullWidth>
          Get AI Prediction
        </Button>

        {/* Display AI Prediction */}
        {prediction && (
          <Typography variant="body1" sx={{ marginTop: 2, color: "green" }}>
            Conversion Score: <strong>{prediction.conversionScore}%</strong> - {prediction.recommendation}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default LeadForm;
