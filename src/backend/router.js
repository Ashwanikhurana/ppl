var express = require("express");
var router = express.Router();
var api = require("./userapi");
var multer =  require("multer");
var Joi = require('@hapi/joi');


router.get("/" , (req , res) => {
    res.redirect("http://localhost:3000");
})


router.post("/signup" ,  (req , res) => {
    var check = {
        email : Joi.string().required(),
        username : Joi.string().required(),
        password : Joi.string().required(),
        firstname : Joi.string().required(),
        lastname : Joi.string().required(),
    }
    const result = Joi.validate(req.body , check);

    if(!result.error){
        api.savingData(req.body,(err,result)=>{
            if(err){
                console.log('err in router during signup ', err);
            }
            else{
                res.send(result);
            }
        }) 
    }else {
         res.send("details are not correct").status(406);
    }
   
})

router.post("/login"  ,  (req , res) => {
    
    var check = {
        email : Joi.string().required(),
        password : Joi.string().required(),
    }
    const result = Joi.validate(req.body , check);
    if(!result.error){
        api.checkLogin(req.body , (err , result) => {
            if(err){
                console.log("error occured in router in login" + err);
            }else{
                res.send(result);
            }
        })
    }else{
        res.send("details are not correct").status(406);
    }
    
})

router.post("/verify" ,  (req , res) => {
    var check = {
        email : Joi.string().required(),
    }
    const result = Joi.validate(req.body , check);

    if(!result.error){
        api.verifyMail(req.body , (err , result) => {
            if(err){
            }else{
                res.send(result);
            }
        })
    }else{
        res.send("datails are not corect");
    }
})

var storage = multer.diskStorage({
    destination : (req , file , cb) => {
         cb(null , "uploads");
    },
    filename : (req , file , cb) => {
         cb(null , file.originalname);
    }
})


var upload = multer({storage : storage});


router.post('/upload' ,  upload.single('image') ,   (req , res) => {
    // console.log("upload body is" ,  req.body);
    req.body.image = req.file;
        
    console.log("upload body is" , req.body);
    const check = {
        description : Joi.string().required(),
        category : Joi.string().required(),
        image : Joi.object().required(),
        // postedBy : Joi.string().required(),
        // skippedPost : Joi.number().required(),
    }

    const myresult = Joi.validate(req.body , check);

    console.log(myresult.error);
    
        if(!myresult.error){
            api.uploadingImage(req.body , (err , result) => {
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

router.post('/addcategory',  api.checkToken , upload.single('image')  ,   (req , res) => {
    req.body.image=req.file;

    
    var check = {
        category : Joi.string().required(),
        image : Joi.object().required(),
        token : Joi.string(),
    }

    const myresult = Joi.validate(req.body , check);
    console.log("data for add category is" , req.body)
    console.log(myresult.error);

    let token = req.body.token;
    console.log("token is" , token);

    if(!myresult.error){
        api.addingCategory(req.body , (err , result) => {
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

router.get('/reterivecategory' , (req , res) => {
    
    api.reteriveCategory(req.body, (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/reterivepost'  , (req , res) => {
    var check = {
        // skippedPost : Joi.number().required(),
    }

    const myresult = Joi.validate(req.body , check);

    if(!myresult.error){
        api.reterivePost(req.body, (err , result) => {
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

router.post('/forgot' , (req , res) => {
    api.sendResetMail(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

router.post('/reset' , (req , res) => {
    api.updatePassword(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result).status(400);
        }
    })
})

router.post('/getsinglepostdata' , (req , res) => {
    let check = {
        id : Joi.string().required(),
    }
    const result = Joi.validate(req.body , check);

    if(!result.error){
        api.reteriveSinglePostData(req.body , (err , result) => {
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

router.post('/reterivecategorypost' , (req , res) => {
    api.reteriveCategoryPost(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/savelikes' , (req , res) => {
    console.log("data at router is" , req.body);
    let check = {
        post : Joi.string().required(),
        user : Joi.string().required(),
    }

    const result = Joi.validate(req.body , check);
    console.log(result.error);

    if(!result.error){
        api.updateLikeTrue(req.body , (err , result) => {
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

router.post('/unSavelikes' , (req , res) => {
    console.log("data at router is" , req.body);
    let check = {
        post : Joi.string().required(),
        user : Joi.string().required(),
    }

    const result = Joi.validate(req.body , check);
    console.log(result.error);

    if(!result.error){
        api.updateLikeFalse(req.body , (err , result) => {
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



router.post('/reterivelikes' , (req , res) => {
    let check = {
        id : Joi.string().required(),
    }

    const result = Joi.validate(req.body , check);

    if(!result.error){
        api.reteriveLikes(req.body , (err , result) => {
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

router.post('/savecomments' , (req , res) => {
    let check = {
        user : Joi.string(),
        comment : Joi.string(),
        id : Joi.string(),
    }

    const result = Joi.validate(req.body , check);
    console.log(result.error);


    if(!result.error){
        api.updateComments(req.body , (err , result) => {
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


router.post('/verifytoken' , (req , res) => {
    api.verifyToken(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/flagPost' , (req , res) => {
    api.updateFlagTrue(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
})

router.post('/unflagPost' , (req , res) => {
    api.updateFlagFalse(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
})

router.post('/getFlaggedPost' , (req , res) => {
    console.log("body to check is" , req.body);
    api.getFlaggedPost(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })  
})



module.exports = router;