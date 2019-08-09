var mongooose = require("mongoose");
var schema = mongooose.Schema;

var mydata = new schema({
    username : String,
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    myotp : Number,
    isverified : Boolean,
});

module.exports = mongooose.model("users" ,mydata);

