require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE, // Path to SQLite storage file
  logging: false,
});

module.exports = sequelize;
