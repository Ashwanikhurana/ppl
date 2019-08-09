// importing the required modules and files
var mongooose = require("mongoose");
var schema = mongooose.Schema;

// setting the schema of data
var mydata = new schema({
    username : String,
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    myotp : Number,
    isverified : Boolean,
});

// making the schema to model and exporting that model
module.exports = mongooose.model("users" ,mydata);

