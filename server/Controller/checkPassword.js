const User = require("../Models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;
    const user = await User.findById(userId);

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please check password",
        error: true,
      });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, "JWT_SECREAT_KEY", {
      expiresIn: "2d",
    });

    const cookieOption = {
      http: true,
      secure: true,
    };
    return res.cookie("token", token, cookieOption).status(200).json({
      message: "Login Successfully",
      token,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};
