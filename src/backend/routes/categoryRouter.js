var express = require("express");
var categoryRouter = express.Router();
var multer =  require("multer");
var Joi = require('@hapi/joi');
var categoryApi = require('../api/categoryApi');


var storage = multer.diskStorage({
    destination : (req , file , cb) => {
         cb(null , "uploads");
    },
    filename : (req , file , cb) => {
         cb(null , file.originalname);
    }
})

var upload = multer({storage : storage});

categoryRouter.post('/addcategory',  upload.single('image')  ,   (req , res) => {
    req.body.image=req.file;

    
    var check = {
        category : Joi.string().required(),
        image : Joi.object().required(),
    }

    const myresult = Joi.validate(req.body , check);
    console.log("data for add category is" , req.body)
    console.log(myresult.error);

    if(!myresult.error){
        categoryApi.addingCategory(req.body , (err , result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    }else{
        res.send("details are not correct").status(406);
    }
})

categoryRouter.get('/reterivecategory' , (req , res) => {
    
    categoryApi.reteriveCategory(req.body, (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

module.exports = categoryRouter;