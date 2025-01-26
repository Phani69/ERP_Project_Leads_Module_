const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Lead = sequelize.define("Lead", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.ENUM("Manual", "Facebook", "Google"),
    defaultValue: "Manual",
  },
  status: {
    type: DataTypes.ENUM("New", "Contacted", "Converted", "Lost"),
    defaultValue: "New",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Lead;
