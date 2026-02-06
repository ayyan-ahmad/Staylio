const Listing = require("../models/listing");




// INDEX Route
module.exports.index = async function (req, res) {
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", { allListings })
};

// NEW Route
module.exports.renderNewForm = function (req, res) {
    res.render("listings/new.ejs");
};

// SHOW Route
module.exports.showListing = async function (req, res) {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", // populate reviews
        populate: {
            path: "author", // populate author of each review
        },
    })
        .populate("owner");// populate owner details and reviews
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// CREATE Route
module.exports.createListing = async (req, res) => {
//  let response= await geocodingClient.forwardGeocode({
//     query:"New Delhi, India",
//     limit:1
// })

// .send();
// console.log(response);
// response.send("done");



    let url= req.file.path;
    let filename= req.file.filename;
     
    
    const newListing = new Listing(req.body.listing); // create new listing from form data
    newListing.owner = req.user._id; // set owner to currently logged in user
    newListing.image={url,filename};// set image url and filename
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");


};

// Edit Route
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
   let originalImageUrl= listing.image.url;// get original image url
   originalImageUrl= originalImageUrl.replace("/upload","upload/w_300");// modify url for display
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

if (typeof req.file !== 'undefined') {// check if new image is uploaded
     let url= req.file.path;
    let filename= req.file.filename;
    updatedListing.image= {url,filename};// update image url and filename
    await updatedListing.save();
}
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
}
