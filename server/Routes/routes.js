const express = require("express");
const apiRoutes = express.Router();
const { registerUser } = require("../Controller/registerUser");
const { checkEmail } = require("../Controller/checkEmail");
const { checkPassword } = require("../Controller/checkPassword");
const { userDeatils } = require("../Controller/userDeatils");
const { logout } = require("../Controller/logout");
const { updateUserDetails } = require("../Controller/updateUserDetails");
const { searchUser } = require("../Controller/searchUser");
const { checkPasswordMobile } = require("../Controller/checkPasswordMobile");
const { userDeatilsMobile } = require("../Controller/userDeatilsMobile");

apiRoutes.post("/register", registerUser);

apiRoutes.post("/email", checkEmail);

apiRoutes.post("/password", checkPassword);

apiRoutes.get("/user-details", userDeatils);

apiRoutes.get("/logout", logout);

apiRoutes.post("/update-user", updateUserDetails);

apiRoutes.post("/search-user", searchUser);

// mobile
apiRoutes.post("/passwordMobile", checkPasswordMobile);
apiRoutes.post("/user-details-Mobile", userDeatilsMobile);

module.exports = apiRoutes;
