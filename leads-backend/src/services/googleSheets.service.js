const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { Lead } = require("../models"); // Import the Leads model

// ✅ Load Google API credentials
const credentialsPath = path.join(__dirname, "../config/google-credentials.json");

// Handle missing/invalid Google credentials gracefully
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
} catch (error) {
  console.error(`⚠️ Google Credentials file not found or invalid at path: ${credentialsPath}`);
  process.exit(1); // Exit process if credentials are missing or invalid
}

// ✅ Define Scopes and Auth
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});
const sheets = google.sheets({ version: "v4", auth });

// ✅ Replace with your Google Sheet ID (from the URL)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || "YOUR_GOOGLE_SHEET_ID"; // Default if not in .env
const RANGE = "Sheet1!A2:E"; // Assuming columns: Name, Email, Phone, Source, Status

// 🔹 Fetch Leads from Google Sheets
const fetchLeadsFromGoogleSheets = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheets.");
      return [];
    }

    // Map rows to leads
    return rows.map((row) => ({
      name: row[0] || "",
      email: row[1] || "",
      phone: row[2] || "",
      source: row[3] || "Google Forms", // Default source if not specified
      status: row[4] || "New", // Default status if not specified
    }));
  } catch (error) {
    console.error("Error fetching leads from Google Sheets:", error);
    return [];
  }
};

// 🔹 Sync Google Sheets leads to SQLite Database
const syncLeadsToDatabase = async () => {
  try {
    const leads = await fetchLeadsFromGoogleSheets();
    if (!leads || leads.length === 0) {
      console.log("No new leads to sync.");
      return;
    }

    for (const lead of leads) {
      const existingLead = await Lead.findOne({ where: { email: lead.email } });
      if (!existingLead) {
        await Lead.create(lead); // Create a new lead if it doesn't exist
      }
    }

    console.log("Google Sheets leads synced successfully.");
  } catch (error) {
    console.error("Error syncing leads to the database:", error);
  }
};

console.log("🛠️ Debug: Looking for Google credentials at:", credentialsPath);


// ✅ Export Functions
module.exports = { fetchLeadsFromGoogleSheets, syncLeadsToDatabase };
