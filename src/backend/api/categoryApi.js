var categoryDB = require('../schema/categorySchema');

module.exports = {
    addingCategory: (data, cb) => {
        categoryDB.find({ category : data.category }, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result.length == 0) {
                categoryDB.create({ category: data.category, image: data.image }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null);
                    } else {
                        categoryDB.find({}, (err, result) => {
                            if (err) {
                                console.log(err);
                                return cb(err, null);
                            } else {
                                return cb(null, result);
                            }
                        })
                    }
                })
            } else {
                return cb(null, result);
            }
        })
    },
    reteriveCategory: (data, cb) => {
        categoryDB.find({}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return cb(null, result);
            }
        })
    },

}