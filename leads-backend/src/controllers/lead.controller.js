const { Lead } = require("../models");

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leads" });
  }
};

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, source, status } = req.body;
    const newLead = await Lead.create({ name, email, phone, source, status });
    res.json(newLead);
  } catch (error) {
    res.status(500).json({ error: "Error creating lead" });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Lead.update(req.body, { where: { id } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating lead" });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    await Lead.destroy({ where: { id } });
    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting lead" });
  }
};
