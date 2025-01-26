const xlsx = require("xlsx");
const fs = require("fs");
const { Lead } = require("../models");

const importLeadsFromExcel = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  for (const row of data) {
    const lead = {
      name: row.Name || "",
      email: row.Email || "",
      phone: row.Phone || "",
      source: row.Source || "Excel Import",
      status: row.Status || "New",
    };

    const existingLead = await Lead.findOne({ where: { email: lead.email } });
    if (!existingLead) {
      await Lead.create(lead);
    }
  }

  fs.unlinkSync(filePath);
  return data;
};

module.exports = { importLeadsFromExcel };
