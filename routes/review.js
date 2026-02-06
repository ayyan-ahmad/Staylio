const express = require("express");
const router = express.Router({mergeParams: true});// create new router object with mergeParams to access :id from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review= require("../models/review.js"); // import Review model
const Listing = require("../models/listing.js");// import Listing model
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");// import validateReview middleware

const reviewController = require("../controllers/review.js");


      // Review 
//post routes for adding review to a listing
router.post("/",  isLoggedIn, validateReview, wrapAsync(reviewController.addReview));
 
// delete review route
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewController.deleteReview)
);


module.exports = router;