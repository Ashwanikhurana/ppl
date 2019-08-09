// inmporting the various required modules and files
var express = require("express");
var router = express.Router();
var letssavedata = require("./userapi");
var multer =  require("multer");

// setting the multer stored file destinatin and filename


// setting storage space

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
    // console.log("yes" + JSON.stringify(req.body.image));
    req.body.image = req.file;
   letssavedata.uploadingImage(req.body ,(err , result) => {
        if(err){
            console.log(err);
        }else{
            // console.log(req.body);
            // console.log("result from router" , result);
            res.send(result);
        }
   })
})

router.post('/addcategory' , upload.single('image') , (req , res) => {
    // console.log("category input in router" + JSON.stringify(req.body));
    req.body.image=req.file;
    letssavedata.addingCategory(req.body , (err , result) => {
        if(err){
            console.log("error in router while uploading category" + err);
        }else{
            // console.log("data updated from router" + JSON.stringify(result));
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
            // console.log("hehe" , JSON.stringify(result));
        }
    })
})

router.get('/reterivepost' , (req , res) => {
    letssavedata.reterivepost(req.body, (err , result) => {

        if(err){
            console.log(err);
        }else{
            res.send(result);
            // console.log("hehe" , JSON.stringify(result));
        }
    })
})

router.post('/enteremail' , (req , res) => {
    // console.log("from router" + JSON.stringify(req.body));
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
            // console.log("password changed successfully");
            res.send(result);
        }
    })
})

router.post('/getsinglepostdata' , (req , res) => {
    // console.log("from router" + JSON.stringify(req.body));
    letssavedata.reterivesinglepostdata(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            // console.log("in router" + result);
            res.send(result);
        }
    })
})

router.post('/reterivecategorypost' , (req , res) => {
    // console.log("from router" + req.body);
    letssavedata.reterivecategorypost(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            // console.log("result from router" + result);
            res.send(result);
        }
    })
})

router.post('/savelikes' , (req , res) => {
    // console.log("in router body" , req.body);
    letssavedata.updatelikes(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            // console.log(" in router " , result);
            res.send(result);
        }
    })
})

router.post('/reterivelikes' , (req , res) => {
    letssavedata.reterivelikes(req.body , (err , result) => {
        if(err){
            console.log(result);
        }else{
        console.log(result);
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
            console.log(result);
            res.send(result);
        }
    })
})

router.post('/reterivecomments' , (req , res) => {
    letssavedata.reterivecomments(req.body , (err , result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
})


// getting the homepage
router.get("/" , (req , res) => {
    res.redirect("http://localhost:3000");
})

router.post("/verify" ,  (req , res) => {
    console.log(req.body);
    // calling the function from userapi to verify email
    letssavedata.verifymail(req.body , (err , result) => {
        if(err){
            console.log("error occured at verification time in router" + err)
        }else{
            // console.log("is verified updated");
            res.send(result);
        }
    })
})

// posting the data getted from the signup page
router.post("/signup" ,  (req , res) => {
    console.log("from router " + JSON.stringify(req.body));
    // calling the function written in userapi to save data in database
   letssavedata.savingdata(req.body,(err,result)=>{
    if(err){
        console.log('err in router during signup '+err);
    }
    else{
        // console.log('done in router by signup')
        res.send(result);
    }
}) 
   console.log(req.body);
})

// posting the data getted from the login page
router.post("/login"  ,  (req , res) => {
    // console.log("from router log in " , req.body);
    letssavedata.checklogin(req.body , (err , result) => {
       
        if(err){
            console.log("error occured in router in login" + err);
        }else{
            // console.log("sucessfully login at router");
            res.send(result);
        }
    })
    console.log(req.body);
})

// exporting the module router
module.exports = router;