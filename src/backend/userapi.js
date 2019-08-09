// importing schema for the database
var userssaved = require("./schema");
var nodemailer = require("nodemailer");
var api = require('./imageschema');
var categoryapi = require('./categoryschema');


// exporting all the modules as a object
module.exports = {
    // function to save data in database
    savingdata : (data,cb)=>{
        let email = data.email;
        // finding the email that is entered  by the user
        userssaved.find({email}, (err , result) => {
            if(err){
                console.log("Error in find of userapi "+err)
            }
            else{
                // checking that it can-not exist in the database
                if(result.length == 0){
                    userssaved.create(data,(err,result)=>{
                        if(err){
                        console.log('err in user');
                        return cb(err,null)
                        }
                        else{
                            console.log('done in userapi for signup');
                            // sending the  result in router  
                            var otp = Math.floor(100000 + Math.random() * 900000);
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                  user: 'ashwanikhurana627@gmail.com',
                                  pass: 'ashwanikhurana@2001'
                                }
                              });
                              
                              var mailOptions = {
                                from: 'ashwanikhurana627@gmail.com',
                                to: data.email,
                                subject: 'PLEASE VERIFY YOUR ACCOUNT',
                                html: '<a href = "http://localhost:3000/login">click here to verify </a>' + "your otp is " + otp
                              };
                              
                              transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });
                              userssaved.update({email : data.email} , {$set : {myotp : otp}}, (err , result) => {
                                  if(err){
                                      console.log(err);
                                      return cb(err , null);
                                  }else{
                                      console.log("otp sent is " + otp + "and saves in database");
                                  }
                              })
                            return cb(null,"thanks for registering please verify the mail");
                        }
                    })
                }else{
                    return cb(null , "sorry that e-mail is already registered with us");
                }
            }
        })
    },
    // function to authenticate at the login time
    checklogin : (data , cb) => {
        let email = data.email;
        let password = data.password;
        let isverified = data.isverified;
        // finding th e-mail from the database
        userssaved.find({email} , (err , result) => {
            if(err){
                console.log("error occured" + err);
                return cb(err , null);
                // checking that if that email is not registered
            }else if(result.length == 0){
                console.log("email find be unregistered in userapi");
                return cb(null , "your entered email is notregistered with us");
                // checking if the email is registered
            }else if(result.length >= 1){
                userssaved.find({$and : [{email} , {password}]} , (err , result) => {
                    if(err){
                        console.log(err);
                        return cb(err , null);
                        // checking id=f the entered pssword is not correct
                    }else if(result.length == 0){
                        console.log("password is incorrect");
                        return cb(null , "password is incorrect please check the password");
                    }else{
                        // checking if the email is verified
                        userssaved.find({$and : [{email} , {password} , {isverified : true}]} , (err  , result) => {
                            if(err ){
                                console.log(err);
                                // checking if the email is not verified
                            }else if(result.length == 0){
                                console.log("not verified");
                                return cb(null , "your entered email is not verified yet" + result.username);
                            }else{
                                // checking that the user has logged in successfully
                                console.log("log in sucessfully" );
                                console.log(result);
                                return cb(null , "thanks for logging in again " + result[0].username);
                            }
                        })
                    }
                    // return cb(null , result);
                    // console.log(result);
                })
            }
        })
    },
    // verifying the email entered by the user
    verifymail : (data , cb) => {
        let email = data.email;
        let motp = data.otp;
        // updating the isverified in the schema 
        userssaved.update({} , {$set : {isverified : true}} , (err , result) => {
            if(err){
                console.log("an error occurred"+ err);
                return cb(err , null);
            }else if(result.length == 0){
                // sending to user that the email is now verified
                console.log("otp is found wrong");
                return cb(null , "otp is not correct");
            }else{
                console.log("updated database for verification in userapi ");
                return cb(null , "thanks for verifying the email");
            }
        })
    },
    uploadingImage : (data , cb) => {
        // console.log(data);
        api.create(data , (err , result) => {
            if(err){
                console.log("error in uploading image data in userapi" + err);
                return cb(err , null);
            }else{
                // console.log("image data saved in database");
                // console.log(data);
                api.find({} , (err , result) => {
                    if(err){
                        console.log(err);
                    }else{
                        return   cb(null , result);
                    }
                })
                // return cb(null , result);
            }
        })
    },
    addingCategory : (data , cb) => {
        let category = data.category;
        let image = data.image;
         console.log("image is" + image)
         console.log("category is " + category)
        categoryapi.find({category} , (err , result) => {
            if(err){
                console.log(err);
            }else if(result.length == 0){
                categoryapi.create({category : data.category , image : data.image} , (err , result) => {
                    if(err){
                        console.log("an error occured" + err);
                        return cb(err , null);
                    }else{
                        // console.log("category array updated" + JSON.stringify(result));
                        categoryapi.find({} , (err , result) => {
                            if(err){
                                console.log(err);
                                return cb(err , null);
                            }else{
                                return cb(null , result);
                            }
                        })
                        //  return cb(null , result);
                    }
                })
            }else{
                return cb(null , result);
            }
        })
    } ,
    reterivecategory : (data , cb) => {
        categoryapi.find({} , (err , result) => {
            if(err){
                console.log(err);
            }else{
                // console.log("ye");
                return cb(null , result);
            }
        })
    },
    reterivepost : (data , cb) => {
        api.find({} , (err , result) => {
            if(err){
                console.log(err);
            }else{
                // console.log("ye");
                return cb(null , result);
            }
        })
    },
   sendresetmail : (data , cb) => {
       
       userssaved.find({email : data.input} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else if(result.length >= 1){
                // console.log(result);
                console.log(result);
                var transporternew = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'ashwanikhurana627@gmail.com',
                      pass: 'ashwanikhurana@2001'
                    }
                  });
                  {`/singlepost/${data.input}`}
                  var mailOptionsnew = {
                    from: 'ashwanikhurana627@gmail.com',
                    to: data.input,
                    subject: 'PLEASE RESET YOUR PASSWORD',
                    html: `<a href = http://localhost:3000/reset/${data.input}` + '>click here to reset your password </a>'
                  };
                  
                  transporternew.sendMail(mailOptionsnew, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                return cb(null , "password reset link was send to your email");
            }else{
               return cb(null , "email not found")
            }
       })
   },
   updatepassword : (data , cb) => {
    userssaved.update({email : data.email} , {$set : {password : data.newpassword}} , (err , result) => {
        if(err){
            console.log(err);
            return cb(err , null);
        }else{
            console.log(result);
            return cb(null , result);
        }
    })
   },
   reterivesinglepostdata : (data , cb) => {
       console.log("i am there" + data.id);
       let id = data.id;
        api.find({_id : id} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else{
                // console.log(result);
                return cb(null , result)
            }
        })
   },
   reterivecategorypost : (data , cb) => {
       api.find({category : data.category} , (err , result) => {
           if(err){
               console.log(err);
               return cb(err , null);
           }else{
               return cb(null , result)
           }
       })
   },
   updatelikes : (data , cb) => {
       api.update({"_id" : data.id} , {$set: {likecount : data.likecount , likearray : data.likearray}}, (err , result) =>{
        if(err){
            console.log(err);
            return cb(err , null);
        }else {
            // console.log(result);
            api.find({"_id" : data.id} , (err , result) => {
                if(err){
                    console.log(err);
                    return cb(err , null);
                }else{
                    // console.log(result);
                    return cb(null , result);
                }
            })
        }
       })
   },
   reterivelikes : (data , cb) => {
       api.find({"_id" : data.id} , (err , result) => {
        if(err){
            console.log(err);
            return cb(err ,null);
        }else{
            // console.log(result);
            return cb(null , result);
        }
       })
   },
   updatecomments : (data , cb) => {
       console.log("data reached to me " , data);
    api.update({_id : data.id} , {$push : {commentarray : [{commentedby : data.user , comment : data.comment}]}} , (err , result) => {
        if(err){
            console.log(err);
            return cb(err , null);
        }else{
            console.log(result);
            api.find({_id : data.id} , (err , result) => {
                if(err){
                    console.log(err);
                    return cb(err , null)
                }else{
                    console.log(result);
                    return cb(null , result);
                }
            })
            // return cb(null , result);
        }
    })
   },
   reterivecomments : (data , cb) => {
        api.find({_id : data.id} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else{
                console.log(result);
                return cb(null , result);
            }
        })
   }
} 
