var mongooose = require("mongoose");
var schema = mongooose.Schema;

var mydata = new schema({
    username : {
        type : String,
        required : true,
    },
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isverified : {
        type : Number,
    },
    resetPasswordToken : {
        type : String,
    },
    flag : [{
        type : schema.Types.ObjectId,
        ref : 'posts',
    }]
});



user = mongooose.model("users" ,mydata);

module.exports = user;

