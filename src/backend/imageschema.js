var mongoose = require('mongoose');
var schema = mongoose.Schema;

var imageSchema = new schema({
    category : String,
    Description : String,
    time : String,
    image : Object,
    likecount : Number,
    likearray : [],
    commentcount : Number,
    commentarray : [
        {
            commentedby : String, 
            comment : String,
    }
],
})

var imageapi = mongoose.model('imagesdata' , imageSchema);

module.exports = imageapi;
