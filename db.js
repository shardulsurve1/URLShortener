const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config({ path: "./config.env" });

const { DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_HOST } = process.env;

const sequelize = new Sequelize({
  dialect: "mysql",
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
});

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (err) {
    return false;
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("Database and tables synced!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = {
  Sequelize,
  sequelize,
  testDatabaseConnection,
};
