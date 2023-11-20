const express = require("express");

const healthzRouter = require("./Routes/healthzRoute");
const userRouter = require("./Routes/userRoute");
const urlShortnerRouter = require("./Routes/urlShortnerRoute");
const redirectRouter = require("./Routes/redirectRoute");

const logger = require("./Loggers/logger");
//declare app as instance of Express
const app = express();

app.use(express.json());

app.use("/healthz", healthzRouter);
app.use("/v1", urlShortnerRouter);
app.use("/v1/createAccount", userRouter);
app.use("/", redirectRouter);

//all other routes except /healthz will get routed here
app.all("*", (req, res) => {
  logger.log("info", "Bad request.1 Unable to resolve");
  res.status(400).end();
});

module.exports = app;
