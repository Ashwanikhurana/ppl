var userssaved = require("./schema");
var nodemailer = require("nodemailer");
var api = require('./imageschema');
var categoryapi = require('./categoryschema');


module.exports = {
    savingdata : (data,cb)=>{
        let email = data.email;
        userssaved.find({email}, (err , result) => {
            if(err){
                console.log(err)
            }
            else{
                if(result.length == 0){
                    userssaved.create(data,(err,result)=>{
                        if(err){
                            return cb(err,null)
                        }
                        else{
                            console.log('done in userapi for signup');
                            var otp = Math.floor(100000 + Math.random() * 900000);
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                  user: '',
                                  pass: ''
                                }
                              });
                              
                              var mailOptions = {
                                from: '',
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
                                      console.log("otp sent");
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
    checklogin : (data , cb) => {
        let email = data.email;
        let password = data.password;
        let isverified = data.isverified;
        userssaved.find({email} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else if(result.length == 0){
                console.log("email find be unregistered in userapi");
                return cb(null , "your entered email is notregistered with us");
            }else if(result.length >= 1){
                userssaved.find({$and : [{email} , {password}]} , (err , result) => {
                    if(err){
                        console.log(err);
                        return cb(err , null);
                    }else if(result.length == 0){
                        return cb(null , "password is incorrect please check the password");
                    }else{
                        userssaved.find({$and : [{email} , {password} , {isverified : true}]} , (err  , result) => {
                            if(err ){
                                console.log(err);
                            }else if(result.length == 0){
                                return cb(null , "your entered email is not verified yet" + result.username);
                            }else{
                                return cb(null , "thanks for logging in again " + result[0].username);
                            }
                        })
                    }
                })
            }
        })
    },
    verifymail : (data , cb) => {
        let email = data.email;
        let motp = data.otp;
        userssaved.update({} , {$set : {isverified : true}} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else if(result.length == 0){
                return cb(null , "otp is not correct");
            }else{
                return cb(null , "thanks for verifying the email");
            }
        })
    },
    uploadingImage : (data , cb) => {
        api.create(data , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else{
                api.find({} , (err , result) => {
                    if(err){
                        console.log(err);
                    }else{
                        return   cb(null , result);
                    }
                })
            }
        })
    },
    addingCategory : (data , cb) => {
        let category = data.category;
        let image = data.image;
        categoryapi.find({category} , (err , result) => {
            if(err){
                console.log(err);
            }else if(result.length == 0){
                categoryapi.create({category : data.category , image : data.image} , (err , result) => {
                    if(err){
                        console.log(err);
                        return cb(err , null);
                    }else{
                        categoryapi.find({} , (err , result) => {
                            if(err){
                                console.log(err);
                                return cb(err , null);
                            }else{
                                return cb(null , result);
                            }
                        })
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
                return cb(null , result);
            }
        })
    },
    reterivepost : (data , cb) => {
        api.find({} , (err , result) => {
            if(err){
                console.log(err);
            }else{
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
                console.log(result);
                var transporternew = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: '',
                      pass: ''
                    }
                  });
                  {`/singlepost/${data.input}`}
                  var mailOptionsnew = {
                    from: '',
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
       let id = data.id;
        api.find({_id : id} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else{
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
            api.find({"_id" : data.id} , (err , result) => {
                if(err){
                    console.log(err);
                    return cb(err , null);
                }else{
                    return cb(null , result);
                }
            })
        }
       })
   },
   reterivelikes : (data , cb) => {
       api.find({"_id" : data.id} , (err , result) => {
        if(err){
            return cb(err ,null);
        }else{
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
                    return cb(null , result);
                }
            })
        }
     })
   },
   reterivecomments : (data , cb) => {
        api.find({_id : data.id} , (err , result) => {
            if(err){
                console.log(err);
                return cb(err , null);
            }else{
                return cb(null , result);
            }
        })
   }
} 
