const { testDatabaseConnection } = require("./../db");
const logger = require("./../Loggers/logger");

exports.healthzCheck = async (req, res) => {
  const dbStatus = await testDatabaseConnection();

  logger.log("info", "Healthz check performed - Connection Successful");
  if (dbStatus) {
    res.setHeader("Cache-Control", "no-cache");

    res
      .status(200)
      .json({
        Message: "Service available - database connection - Sucessfull",
      });
  } else {
    logger.log(
      "error",
      "Service not available - database connection - Unsucessfull"
    );
    res.setHeader("Cache-Control", "no-cache");
    res.status(503).end();
  }
};
