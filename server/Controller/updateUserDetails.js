const User = require("../Models/User");
const {
  getUserDeatilsFromToken,
} = require("../helpers/getUserDetailsFromToken");

module.exports.updateUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDeatilsFromToken(token);

    const { name, profile_pic } = req.body;

    console.log("profile_pic :", profile_pic);

    const updateUser = await User.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );

    const userInfo = await User.findById(user._id);

    return res.status(200).json({
      message: "User Updated Successfully",
      data: userInfo,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};
