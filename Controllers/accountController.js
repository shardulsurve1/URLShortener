const User = require("../Models/userModel"); // Adjust the path based on your project structure

exports.createAccount = async (req, res) => {
  try {
    const { email, password, tier } = req.body;

    // Check if email, password, and tier are provided
    if (!email || !password || !tier) {
      return res
        .status(400)
        .json({ error: "Email, password, and tier are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Check if the tier is valid
    const validTiers = ["Tier1", "Tier2"];
    if (!validTiers.includes(tier)) {
      return res
        .status(400)
        .json({
          error: "Bad Request",
          message: "Invalid tier specified. allowed Tiers : Tier1 and Tier2",
        });
    }

    // Create a new user
    const newUser = await User.create({
      email,
      password,
      tier,
    });

    return res.status(201).json({
      message: "User account created successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        tier: newUser.tier,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
