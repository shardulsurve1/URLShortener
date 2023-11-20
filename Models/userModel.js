const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tier: {
    type: DataTypes.ENUM("Tier0", "Tier1", "Tier2"),
    allowNull: false,
  },
  requestsMade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});
module.exports = User;
