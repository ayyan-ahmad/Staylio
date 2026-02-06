const Listing = require("./models/listing");
const Review = require("./models/review");

const ExpressError = require("./utils/ExpressError.js"); // custom error class
const { listingSchema, reviewSchema } = require("./schema.js") // joi schema for server side validation (listing)



// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // store the url they are requesting

        req.flash("error", "You must be logged in to access that page!");
        return res.redirect("/login");
    }
    next();
};
// Middleware to save redirect URL for after login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();

};
// Middleware to check if the current user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);

    }
    next();
};


//middleware for validating listing data
module.exports.validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errorMessage = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errorMessage);
    } else {
        next();
    }
};

//middleware for validating review data

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errorMessage = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errorMessage);
    } else {
        next();
    }
};

// Middleware to check if the current user is the author of the review
module.exports.isreviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);

    }
    next();
};