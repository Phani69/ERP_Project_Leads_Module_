const app = require("./src/app");
const PORT = process.env.PORT || 5001;

// Correct path for the upload route
const uploadRoutes = require("./src/routes/upload.routes");
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




const dashboardRoutes = require("./src/routes/dashboard.routes");
app.use("/api/dashboard", dashboardRoutes);

const { syncLeadsToDatabase } = require("./src/services/googleSheets.service");

// Run sync every 10 minutes
setInterval(syncLeadsToDatabase, 10 * 60 * 1000);
