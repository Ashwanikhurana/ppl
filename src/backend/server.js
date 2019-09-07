const express = require("express");
const app = express();
const userRouter  = require("./routes/userRouter");
const postRouter = require('./routes/postRouter');
const categoryRouter = require('./routes/categoryRouter');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");

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
  

app.use("/",userRouter);
app.use("/post" , postRouter);
app.use("/category" , categoryRouter);



app.listen(3030 ,() => {
    console.log("we are live at port 3030");
})



