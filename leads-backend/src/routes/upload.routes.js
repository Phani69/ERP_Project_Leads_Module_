const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const { Lead } = require("../models"); // Import Lead model
const { syncLeadsToDatabase } = require("../services/googleSheets.service"); // Google Forms Sync

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory for parsing
const upload = multer({ storage: storage });

/**
 * 📌 Route: Import Leads from Excel File
 * ✅ Checks if leads already exist before inserting
 */
router.post("/import-excel", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the uploaded Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Get first sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Convert Excel data to Leads
    const newLeads = sheetData.map((row) => ({
      name: row.Name,
      email: row.Email,
      phone: row.Phone,
      source: row.Source || "Excel Import",
      status: row.Status || "New",
    }));

    // Check for existing leads before inserting
    for (const lead of newLeads) {
      const existingLead = await Lead.findOne({ where: { email: lead.email } });
      if (!existingLead) {
        await Lead.create(lead);
      }
    }

    res.json({ message: "Leads imported successfully!", data: newLeads });
  } catch (error) {
    console.error("Error importing leads:", error);
    res.status(500).json({ error: "Failed to import leads" });
  }
});

/**
 * 📌 Route: Sync Leads from Google Forms (Google Sheets API)
 * ✅ Pulls new leads from Google Forms and inserts them into DB
 */
router.get("/sync-google-forms", async (req, res) => {
  try {
    await syncLeadsToDatabase();
    res.json({ message: "Google Forms data synced successfully!" });
  } catch (error) {
    console.error("Error syncing Google Forms leads:", error);
    res.status(500).json({ error: "Failed to sync Google Forms leads" });
  }
});

module.exports = router;
