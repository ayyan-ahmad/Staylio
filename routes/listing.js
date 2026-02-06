const express = require("express"); // import express
const router = express.Router();//create new router object
const wrapAsync = require("../utils/wrapAsync.js"); // to handle async errors
const Listing = require("../models/listing.js"); // import Listing model
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");// import isLoggedIn middleware

const listingController = require("../controllers/listing.js");
const multer = require("multer");// import multer for file uploads
const { storage } = require("../cloudConfig.js");// import cloudinary storage from cloudConfig.js
const upload = multer({ storage });// configure multer to use cloudinary storage


// INDEX and CREATE ROUTES with the help of router.route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));
    

    



//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW, UPDATE, DELETE ROUTES with the help of router.route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));



// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;