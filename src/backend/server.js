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


mongoose.connect('mongodb://localhost:27017/practice', { useNewUrlParser: true } , 
    (error) => {
        if(error){
            console.log(error);
        }else{
            console.log("we are connected to mongoDB");
        }
    });
  
app.use("/",router);


app.listen(3030 ,() => {
    console.log("we are live at port 3030");
})

// var express = require('express');
// // var cookieParser = require('cookie-parser');
// var session = require('express-session');

// var app = express();

// // app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!" }));

// app.get('/', function(req, res){
//    if(req.session.email){
//       req.session.email++;
//       session.secret = "kjhkqj";
//       console.log(session.secret);
//       res.send("You visited this page " + req.session.email + " times");
//    } else {
//       req.session.email = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });
// app.listen(3030);

