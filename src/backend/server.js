// importing the needed modules and files 
var express = require("express");
var app = express();
var router  = require("./router");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use(express.static('uploads'));

app.use(cors());


// making momgodb connection
mongoose.connect('mongodb://localhost:27017/practice', { useNewUrlParser: true } , 
    (error) => {
        if(error){
            console.log(error);
        }else{
            console.log("we are connected to mongoDB");
        }
    });
  
// using the router    
app.use("/",router);




// starting the server
app.listen(3030 ,() => {
    console.log("we are live at port 3030");
})


