var express = require("express");
var router = express.Router();
var letssavedata = require("./userapi");
var multer =  require("multer");


router.get("/" , (req , res) => {
    res.redirect("http://localhost:3000");
})

router.post("/verify" ,  (req , res) => {
    console.log(req.body);
    letssavedata.verifymail(req.body , (err , result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    })
})

router.post("/signup" ,  (req , res) => {
   letssavedata.savingdata(req.body,(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        res.send(result);
    }
}) 
   console.log(req.body);
})

router.post("/login"  ,  (req , res) => {
    letssavedata.checklogin(req.body , (err , result) => {
        if(err){
            console.log("error occured in router in login" + err);
        }else{
            res.send(result);
        }
    })
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
router.post('/upload' , upload.single('image') , (req , res) => {
    req.body.image = req.file;
   letssavedata.uploadingImage(req.body ,(err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
   })
})

router.post('/addcategory' , upload.single('image') , (req , res) => {
    req.body.image=req.file;
    letssavedata.addingCategory(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.get('/reterivecategory' , (req , res) => {
    letssavedata.reterivecategory(req.body, (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.get('/reterivepost' , (req , res) => {
    letssavedata.reterivepost(req.body, (err , result) => {

        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/enteremail' , (req , res) => {
    letssavedata.sendresetmail(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

})

router.post('/reset' , (req , res) => {
    letssavedata.updatepassword(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/getsinglepostdata' , (req , res) => {
    letssavedata.reterivesinglepostdata(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/reterivecategorypost' , (req , res) => {
    letssavedata.reterivecategorypost(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/savelikes' , (req , res) => {
    letssavedata.updatelikes(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/reterivelikes' , (req , res) => {
    letssavedata.reterivelikes(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/savecomments' , (req , res) => {
    console.log("in router body" , req.body);
    letssavedata.updatecomments(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/reterivecomments' , (req , res) => {
    letssavedata.reterivecomments(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


module.exports = router;
