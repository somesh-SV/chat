const User = require("../Models/User");

const bcryptjs = require("bcryptjs");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Already user exist",
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const user = new User(payload);

    const UserSave = await user.save();

    return res.status(200).json({
      message: "User created successfully",
      data: UserSave,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};
