var postDB = require("../schema/postSchema");
var jwt = require('jsonwebtoken');


module.exports = {
    uploadingImage: (data, cb) => {
        postDB.create(data, (err, result) => {
            if (err) {
                console.log("error in uploading image data in userapi" + err);
                return cb(err, null);
            } else {
                postDB.find({}).sort({ _id : -1 }).limit(10).skip(data.page).populate('postedBy').exec((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return cb(null, result);
                    }
                })
            }
        })
    },
    reterivePost: (data, cb) => {
        var perPage = 10;
        var page = data.page;

        postDB.find({}).sort({ _id : -1 }).limit(perPage).skip((perPage * page) - perPage).populate('postedBy').exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                return cb(null, result);
            }
        })
    },
    sortCategory : (data , cb) => {
        postDB.find({category : data.category} , (err , result) => {
            if(err){
                console.log(err);
            }else{
                return cb(null , result);
            }
        }) 
    }
    
}
