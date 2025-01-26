const express = require("express");
const cors = require("cors");
const { syncDB } = require("./models");
const leadRoutes = require("./routes/lead.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/leads", leadRoutes);

syncDB(); // Sync database on startup

module.exports = app;
