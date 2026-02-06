if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();// load environment variables from .env file
}



const express = require("express");
const app = express();
const mongoose = require('mongoose'); // import mongoose
const path = require("path"); // import path module
const methodOverride = require("method-override");// to support put and delete methods
const ejsMate = require("ejs-mate");// ejs layout engine
const ExpressError = require("./utils/ExpressError.js");// custom error class
const session = require("express-session");// session middleware
const MongoStore = require("connect-mongo");// mongo store for session
const flash = require("connect-flash");// flash messages middleware
const passport = require("passport");// authentication middleware
const LocalStrategy = require("passport-local");// local strategy for passport
const User = require("./models/user.js");// import User model


const listingRouter = require("./routes/listing.js");// import listing routes
const reviewRouter = require("./routes/review.js");// import review routes
const userRouter = require("./routes/user.js");// import user routes

// connect to MongoDB
 
const dbUrl = process.env.ATLASDB_URL;
main()
    .then((res) => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);

}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// // create mongo store for session
// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto: {
//         secret: process.env.SESSION_SECRET
//     },
//     touchAfter: 24 * 60 * 60 // time period in seconds to update session in db
// });
// store.on("error", (err) => {

// });


// session configuration
const sessionOptions = {
//    store: store, 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,// 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
}

// app.get("/", (req, res) => {
//     res.send("working");
// });

app.use(session(sessionOptions));
app.use(flash());


// passport configuration
app.use(passport.initialize()); // initialize passport
app.use(passport.session());// use passport session
passport.use(new LocalStrategy(User.authenticate())); // use local strategy for authentication
passport.serializeUser(User.serializeUser()); // serialize user means how to store user in session
passport.deserializeUser(User.deserializeUser()); // deserialize user means how to get user from session



// flash middleware to pass flash messages to all templates
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;// to access current user in all templates
    next();

});

// use routes
// app.get("/demouser", async  (req, res) => {
//    let fakeUser=new User({username:"demoUser",email:"demo@example.com"});
//     let registeredUser= await User.register(fakeUser,"demopassword");// means to hash the password and store it in  the database
//    res.send("registeredUser");
// });


app.use("/listings", listingRouter); // use listing routes
app.use("/listings/:id/reviews", reviewRouter); // use review routes
app.use("/", userRouter); // use user routes



//404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

//error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;// default value if not provided
    res.status(statusCode).render("error.ejs", { message });
});


//start the server
app.listen(8080, () => {
    console.log("server is running on port 8080");
});