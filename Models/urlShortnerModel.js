const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("./../db");

const UrlShortner = sequelize.define("UrlShortner", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  longURL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = UrlShortner;
