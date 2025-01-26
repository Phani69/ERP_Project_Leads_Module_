import React, { useEffect, useState } from "react";
import { fetchLeads } from "../services/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
import LeadForm from "../components/LeadForm";

const Leads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads().then(setLeads); // Fetch leads from API
  }, []);

  // 📌 Handle Excel File Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5001/api/upload/import-excel", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.message) {
      alert(result.message);
      fetchLeads().then(setLeads); // Refresh Leads
    }
  };

  // 📌 Handle Google Forms Sync
  const handleGoogleSync = async () => {
    const response = await fetch("http://localhost:5001/api/upload/sync-google-forms");
    const result = await response.json();
    alert(result.message);
    fetchLeads().then(setLeads); // Refresh Leads
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Lead Management</Typography>

      {/* 📌 Excel Upload & Google Sync Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <Button variant="contained" color="primary" onClick={handleGoogleSync} style={{ marginLeft: "10px" }}>
          Sync from Google Forms
        </Button>
      </div>

      {/* Lead Form Component */}
      <LeadForm refreshLeads={() => fetchLeads().then(setLeads)} />

      {/* Lead Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Source</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leads;
