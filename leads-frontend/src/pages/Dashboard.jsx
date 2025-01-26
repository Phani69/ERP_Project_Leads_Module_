import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// ✅ Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 10000); // Auto-refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/api/analytics");
      setDashboardData(data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  if (!dashboardData) return <p>Loading dashboard...</p>;

  // Prepare Chart Data
  const sourceData = {
    labels: dashboardData.sourceCounts.map((item) => item.source),
    datasets: [
      {
        data: dashboardData.sourceCounts.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const statusData = {
    labels: dashboardData.statusCounts.map((item) => item.status),
    datasets: [
      {
        data: dashboardData.statusCounts.map((item) => item.count),
        backgroundColor: ["#4BC0C0", "#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Paper sx={{ padding: 3, margin: 3 }}>
      <Typography variant="h4" gutterBottom>Leads Dashboard</Typography>
      <Typography variant="h6">Total Leads: {dashboardData.totalLeads}</Typography>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ width: "50%" }}>
          <Typography variant="h6">Leads by Source</Typography>
          <Pie data={sourceData} />
        </div>
        <div style={{ width: "50%" }}>
          <Typography variant="h6">Leads by Status</Typography>
          <Bar data={statusData} />
        </div>
      </div>
    </Paper>
  );
};

export default Dashboard;
