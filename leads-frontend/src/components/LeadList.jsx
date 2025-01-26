import React, { useEffect, useState } from "react";
import { fetchLeads, deleteLead } from "../services/api";

const LeadList = ({ selectLead }) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await fetchLeads();
    setLeads(data);
  };

  const handleDelete = async (id) => {
    await deleteLead(id);
    loadLeads(); // Refresh the list after deleting
  };

  return (
    <div>
      <h2>Leads List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
              <td>
                <button onClick={() => selectLead(lead)}>Edit</button>
                <button onClick={() => handleDelete(lead.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadList;
