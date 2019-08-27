var mongoose = require('mongoose');
var schema = mongoose.Schema;

var imageSchema = new schema({
    category : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        default :  Date.now,
    },
    image : {
        type : {},
        required : true,
    },
    likearray : {
        type : Array,
    },
    commentcount : {
        type : Number,
    },
    commentarray : [{
        commentedby : {
            type : schema.Types.ObjectId,
            ref : 'users',
            required : true,
        },
        comment : {
            type : String,
        }
    }],
    postedBy : {
        type : schema.Types.ObjectId,
        ref : 'users',
        required : true,
    },
})


var imageapi = mongoose.model('posts' , imageSchema);

module.exports = imageapi;
