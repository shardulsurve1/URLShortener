const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf, splat } = format;

const myFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ""
  }`;
});

const logger = createLogger({
  format: combine(timestamp(), splat(), myFormat),
  transports: [
    new transports.File({
      filename: `./Logs/urlShortner.log`,
    }),
    new transports.Console(),
  ],
});

module.exports = logger;
