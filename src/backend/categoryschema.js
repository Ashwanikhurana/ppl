var mongoose = require('mongoose');
var schema = mongoose.Schema;

var categorySchema = new schema({
    category : {
        type : String,
        required : true,
    },
    image  : {
        type : {},
        required : true,
    },
})

var letsaddCategories = mongoose.model("category" , categorySchema);

module.exports =  letsaddCategories;