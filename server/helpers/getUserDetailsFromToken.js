const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports.getUserDeatilsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }
  const decode = await jwt.verify(token, "JWT_SECREAT_KEY");

  const user = await User.findById(decode.id).select("-password");
  return user;
};
