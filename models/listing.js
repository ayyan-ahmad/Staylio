const mongoose =require("mongoose");
const Schema= mongoose.Schema;
const Review = require("./review.js");
const listingSchema=new Schema({
    title:{
        type: String,
        required:true,
    },
    description:String,
 image: {
    url: String,
    filename: String,
   
},

    price:Number,
    location:String,
    country:String,
    category:{
        type: String,
        enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing pool", "Camping", "Farms", "Arctic", "Domes", "Boats"],
        default: "Trending",
    },
    reviews:[
        {
            type:Schema.Types.ObjectId, //reference to Review model
            ref:"Review" // model name
        },
    ],

owner:{
    type:Schema.Types.ObjectId,
    ref:"User" // reference to User model
}, 

//:{ // gemoetry field for map location
//     type:{
//         type:String,//dont do {location:{type:String}
//         enum:["Point"],// must be Point
//         required:true,
//     },
//     coordinates:{
//         type:[Number], // array of numbers
//         required:true,
//     },


// },


});
// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({
            _id:{
                $in:listing.reviews,
            },
        });
    }
});



const Listing=mongoose.model("Listing",listingSchema);
module.exports= Listing;