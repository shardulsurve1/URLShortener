const auth = require("basic-auth");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.authenticate = async (req, res, next) => {
  const credentials = auth(req);

  try {
    if (!credentials || !credentials.name || !credentials.pass) {
      // If credentials are missing, create a dummy user with tier 0
      const dummyUser = {
        tier: "Tier0",
      };
      req.user = dummyUser; // Attach the dummy user to the request
      return next();
    }

    const user = await User.findOne({ where: { email: credentials.name } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.pass,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid email or password." });
    }

    req.user = user; // Attach the authenticated user to the request
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to authenticate user.",
    });
  }
};
