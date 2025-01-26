const sequelize = require("../config/db.config");
const Lead = require("./lead.model");

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Sync models with database
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = { Lead, syncDB };
