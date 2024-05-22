const {
  getUserDeatilsFromToken,
} = require("../helpers/getUserDetailsFromToken");

module.exports.userDeatils = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDeatilsFromToken(token);
    return res.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};
