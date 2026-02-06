const User = require("../models/user");


// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
}

// Signup Logic
module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password); // register user with hashed password
        console.log(registeredUser);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect(req.session.redirectUrl || "/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};

// Render Login Form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

// Login Logic
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

// Logout Logic
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
};