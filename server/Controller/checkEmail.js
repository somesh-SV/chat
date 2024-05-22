const User = require("../Models/User");

module.exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await User.findOne({ email }).select("-password");

    if (!checkEmail) {
      return res.status(400).json({
        message: "User not exit",
      });
    }
    return res.status(200).json({
      message: "Email Verify",
      success: true,
      data: checkEmail,
    });
  } catch (err) {
    return res.stutus(500).json({
      message: err.message || err,
      error: true,
    });
  }
};
