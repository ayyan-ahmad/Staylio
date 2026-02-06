const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");// plugin for passport local authentication

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);// add username and password fields and methods to UserSchema 

module.exports = mongoose.model("User", UserSchema);
