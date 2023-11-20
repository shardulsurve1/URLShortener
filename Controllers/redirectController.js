const UrlShortner = require("../Models/urlShortnerModel");

exports.redirectToLongURL = async (req, res) => {
  try {
    console.log(req.params);
    const shortID = req.params.shortID;

    // Validate shortID
    if (!shortID) {
      return res.status(400).json({
        error: "Bad Request",
        message: "ShortID parameter is required.",
      });
    }

    // Find the URL based on shortID
    const urlData = await UrlShortner.findOne({ where: { shortID } });

    if (!urlData) {
      return res.status(404).json({
        error: "Not Found",
        message: "URL not found for the provided shortID.",
      });
    }

    // Redirect the user to the original long URL
    res.redirect(urlData.longURL);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: process.env.SERVER_ERROR });
  }
};
