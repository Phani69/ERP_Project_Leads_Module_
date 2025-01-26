import React, { useEffect, useState } from "react";
import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";
import ExcelUpload from "../components/ExcelUpload";
import socket from "../services/socket";

const Home = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for new lead notifications
    socket.on("newLead", (lead) => {
      setNotifications((prev) => [
        ...prev,
        `New Lead Added: ${lead.name} (${lead.source})`,
      ]);
    });

    // Cleanup the socket connection
    return () => socket.off("newLead");
  }, []);

  return (
    <div>
      <h1>Leads Management</h1>
      {notifications.length > 0 && (
        <div style={{ backgroundColor: "#f8d7da", padding: "10px", marginBottom: "20px" }}>
          <h3>Notifications</h3>
          <ul>
            {notifications.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <LeadForm
        selectedLead={selectedLead}
        refreshLeads={() => window.location.reload()}
        clearSelection={() => setSelectedLead(null)}
      />
      <ExcelUpload refreshLeads={() => window.location.reload()} />
      <LeadList selectLead={setSelectedLead} />
    </div>
  );
};

export default Home;
