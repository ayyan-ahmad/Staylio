const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");// authentication middleware
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");


// Signup Routes and Logic
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.signup);

// Login Routes and Logic
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), userController.login);

// Logout Route
router.get("/logout", userController.logout);

module.exports = router; 