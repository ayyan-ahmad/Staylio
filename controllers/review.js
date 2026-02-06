const Listing = require("../models/listing");
const Review = require("../models/review");

// CREATE Review Route
module.exports.addReview = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review); // create new review from form data
    listing.reviews.push(newReview); // add review reference to listing
    newReview.author = req.user._id; // set the author of the review to the current user
    await newReview.save();
    
    await listing.save();
    req.flash("success","Review Added Successfully!");
    res.redirect(`/listings/${listing._id}`);// 
};

// DELETE Review Route
module.exports.deleteReview =  async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });// remove reference from listing
   await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted Successfully!");
   
    res.redirect(`/listings/${id}`);
}