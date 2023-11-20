const dotenv = require("dotenv");
const UrlShortner = require("../Models/urlShortnerModel");
const logger = require("../Loggers/logger");
const { nanoid } = require("nanoid");
const validURL = require("valid-url");

dotenv.config({ path: "./config.env" });

// exports.createShortURL = async (req, res) => {
//   const { longURL, customAlias } = req.body;
//   const shortID = customAlias ? customAlias : nanoid(12);

//   if (!longURL) {
//     return res.status(400).json({ Message: process.env.LONG_URL_REQUIRED });
//   }

//   if (customAlias && customAlias.length >= 32) {
//     return res.status(400).json({ message: process.env.INVALID_CUSTOM_ALIAS });
//   }

//   if (
//     !validURL.isUri(longURL) ||
//     (customAlias && !validURL.isUri(`${process.env.BASE_URL}/${customAlias}`))
//   ) {
//     return res.status(400).json({ error: process.env.INVALID_BOTH });
//   }

//   try {
//     const existingURL = await UrlShortner.findOne({ where: { longURL } });

//     if (existingURL) {
//       return res.json({ newURL: existingURL });
//     }

//     const newURL = await UrlShortner.create({
//       longURL,
//       shortURL: `${process.env.BASE_URL}/${shortID}`,
//       shortID,
//     });
//     return res.json({ newURL });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: process.env.SERVER_ERROR });
//   }
// };

exports.createShortURL = async (req, res) => {
  try {
    const { longURL, customAlias } = req.body;
    const shortID = customAlias ? customAlias : nanoid(12);

    if (!longURL) {
      return res.status(400).json({ Message: process.env.LONG_URL_REQUIRED });
    }

    if (customAlias && customAlias.length >= 32) {
      return res
        .status(400)
        .json({ message: process.env.INVALID_CUSTOM_ALIAS });
    }

    if (
      !validURL.isUri(longURL) ||
      (customAlias && !validURL.isUri(`${process.env.BASE_URL}/${customAlias}`))
    ) {
      return res.status(400).json({ error: process.env.INVALID_BOTH });
    }

    const user = req.user; // Assuming the user object is attached to the request

    // Check user tier and request limit
    let requestLimit;
    switch (user.tier) {
      case "Tier0":
        requestLimit = 10;
        break;
      case "Tier1":
        requestLimit = 100;
        break;
      case "Tier2":
        requestLimit = 1000;
        break;
      default:
        requestLimit = 0; // Default to no limit for unknown tiers
    }

    // Check if user has exceeded the request limit
    if (user.requestsMade >= requestLimit) {
      return res.status(403).json({ error: "Request Limit Exceeded" });
    }

    const existingURL = await UrlShortner.findOne({ where: { longURL } });

    if (existingURL) {
      return res.json({ newURL: existingURL });
    }

    const newURL = await UrlShortner.create({
      userId: user.id,
      longURL,
      shortURL: `${process.env.BASE_URL}/${shortID}`,
      shortID,
    });

    // Increment requestsMade for the user
    await user.increment("requestsMade");

    return res.json({
      message: `Total requests made by user: ${user.requestsMade + 1}`,
      newURL,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: process.env.SERVER_ERROR });
  }
};

// exports.getShortURLHistory = async (req, res) => {
//   try {
//     console.log(req.query);
//     const limit = parseInt(req.query.limit) || 10; // Default to 10 if limit is not provided

//     const history = await UrlShortner.findAll({
//       order: [["createdAt", "DESC"]],
//       limit: limit, // Add limit here
//     });

//     res.json({ history });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: process.env.SERVER_ERROR });
//   }
// };

exports.getShortURLHistory = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      // If userId is not available, assume it's a Tier 0 (Free Tier) user
      return res.status(403).json({
        error: "Forbidden",
        message:
          "You are using a Tier 0 (Free Tier) account. Please register to use this functionality.",
      });
    }

    console.log(req.query);
    const limit = parseInt(req.query.limit) || 10;

    const history = await UrlShortner.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
      limit: limit,
    });

    if (history.length === 0) {
      return res.json({
        message: "No URL history found for the specified user.",
      });
    }

    res.json({ history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: process.env.SERVER_ERROR });
  }
};
