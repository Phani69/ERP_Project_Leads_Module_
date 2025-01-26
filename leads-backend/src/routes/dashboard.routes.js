const express = require("express");
const { Lead } = require("../models");

const router = express.Router();

// Get dashboard stats
router.get("/", async (req, res) => {
  try {
    // Count total leads
    const totalLeads = await Lead.count();

    // Count leads by status
    const leadStatusCounts = await Lead.findAll({
      attributes: ["status", [Lead.sequelize.fn("COUNT", "*"), "count"]],
      group: ["status"],
    });

    // Count leads by source
    const leadSourceCounts = await Lead.findAll({
      attributes: ["source", [Lead.sequelize.fn("COUNT", "*"), "count"]],
      group: ["source"],
    });

    // Get latest 5 leads
    const latestLeads = await Lead.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalLeads,
      leadStatusCounts,
      leadSourceCounts,
      latestLeads,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

module.exports = router;
