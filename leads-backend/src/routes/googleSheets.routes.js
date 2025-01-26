const express = require("express");
const router = express.Router();
const { syncLeadsToDatabase } = require("../services/googleSheets.service");

router.get("/sync", async (req, res) => {
  try {
    await syncLeadsToDatabase();
    res.status(200).json({ message: "Google Sheets data synced successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to sync Google Sheets data." });
  }
});

module.exports = router;
