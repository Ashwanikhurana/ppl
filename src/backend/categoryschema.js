var mongoose = require('mongoose');
var schema = mongoose.Schema;

var categorySchema = new schema({
    category : "",
    image  : Object,
})

var letsaddCategories = mongoose.model("usercategories" , categorySchema);

module.exports =  letsaddCategories;