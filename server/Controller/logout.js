module.exports.logout = (req, res) => {
  try {
    const cookieOption = {
      http: true,
      secure: true,
    };
    return res.cookie("token", "", cookieOption).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};
