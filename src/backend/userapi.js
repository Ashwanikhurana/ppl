var userDB = require("./schema");
var nodemailer = require("nodemailer");
var postDB = require('./imageschema');
var categoryDB = require('./categoryschema');
var jwt = require('jsonwebtoken');


module.exports = {
    savingData: (data, cb) => {
        let email = data.email;
        userDB.find({ email }, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                if (result.length == 0) {
                    userDB.create(data, (err, result) => {
                        if (err) {
                            console.log(err);
                            return cb(err, null)
                        }
                        else {
                            return cb(null, "thanks for registering please login");
                        }
                    })
                } else {
                    return cb(null, "sorry that e-mail is already registered with us");
                }
            }
        })
    },
    checkLogin: (data, cb) => {
        let email = data.email;
        let password = data.password;
        userDB.find({ email }, (err, result) => {
            if (err) {
                console.log("error occured" + err);
                return cb(err, null);
            } else if (result.length == 0) {
                return cb(null, "your entered email is not registered with us");
            } else if (result.length >= 1) {
                userDB.find({ $and: [{ email }, { password }] }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null);
                    } else if (result.length == 0) {
                        return cb(null, "password is incorrect please check the password");
                    } else {
                        const user = {
                            email: data.email,
                            password: data.password,
                        }

                        jwt.sign({ user }, 'mySecretKeyForJWT', (err, token) => {
                            if (err) {
                                console.log(err);
                            } else {
                                return cb(null, "thanks for logging in again" + token);
                            }
                        })
                    }
                })
            }
        })
    },
    uploadingImage: (data, cb) => {
        postDB.create(data, (err, result) => {
            if (err) {
                console.log("error in uploading image data in userapi" + err);
                return cb(err, null);
            } else {
                postDB.find({_id : result._id}).sort({ time: -1 }).limit(10).populate('postedBy').exec((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return cb(null, result);
                    }
                })
            }
        })
    },
    addingCategory: (data, cb) => {
        let category = data.category;
        let image = data.image;
        categoryDB.find({ category }, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result.length == 0) {
                categoryDB.create({ category: data.category, image: data.image }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null);
                    } else {
                        categoryDB.find({}, (err, result) => {
                            if (err) {
                                console.log(err);
                                return cb(err, null);
                            } else {
                                return cb(null, result);
                            }
                        })
                    }
                })
            } else {
                return cb(null, result);
            }
        })
    },
    reteriveCategory: (data, cb) => {
        categoryDB.find({}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return cb(null, result);
            }
        })
    },
    reterivePost: (data, cb) => {

        postDB.find({}).sort({ time: -1 }).skip(data.skippedPost).limit(10).populate('postedBy').exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(result[0].postedBy.username)
                return cb(null, result);
            }
        })
    },
    sendResetMail: (data, cb) => {
        userDB.find({ email: data.email }, (err, result) => {
            if (err) {
                console.log(err);
                return cb(err, null);
            } else if (result.length >= 1) {
                jwt.sign({ data }, 'mySecretKeyForResetPassword', (err, token) => {
                    if (err) {
                        console.log(err);
                    } else {
                                console.log(result);
                                data.token = token;
                                var transporternew = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'ashwanikhurana627@gmail.com',
                                        pass: 'ashwanikhurana@2001'
                                    }
                                });
                                var mailOptionsnew = {
                                    from: 'ashwanikhurana627@gmail.com',
                                    to: data.email,
                                    subject: 'PLEASE RESET YOUR PASSWORD',
                                    html: `<a href = http://localhost:3000/reset/${data.token}` + '>click here to reset your password </a>'
                                };

                                transporternew.sendMail(mailOptionsnew, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                        })
                    }
                })
                return cb(null, "password reset link was send to your email");
            } else {
                return cb(null, "email not found")
            }
        })
    },
    updatePassword: (data, cb) => {
        console.log(data);
        jwt.verify(data.email, 'mySecretKeyForResetPassword', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                userDB.updateOne({ email: result.data.email }, { $set: { password: data.newPassword } }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null);
                    } else {
                        console.log(result);
                        return cb(null, "password changed succesully");
                    }
                })
            }
        })

    },
    reteriveSinglePostData: (data, cb) => {
        let id = data.id;

        postDB.find({ _id: id }).populate('postedBy').populate('commentarray.commentedby').exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(" i am the king" , result[0].postedBy);
                return cb(null, result);
            }
        })
    },
    reteriveCategoryPost: (data, cb) => {
        postDB.find({ category: data.category }, (err, result) => {
            if (err) {
                console.log(err);
                return cb(err, null);
            } else {
                return cb(null, result)
            }
        })
    },
    updateLikeTrue: (data, cb) => {
        postDB.updateOne({ "_id": data.post }, { $addToSet: { likearray: data.user } }, (err, result) => {
            if (err) {
                console.log(err);
                return cb(err, null);
            } else {
                postDB.find({ "_id": data.post }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null);
                    } else {
                        return cb(null, result);
                    }
                })
            }
        })
    },
    updateLikeFalse: (data, cb) => {
        postDB.updateOne({ "_id": data.post }, { $pull: { likearray: data.user } }, (err, result) => {
            if (err) {
                console.log(err);
                return cb(err, null);
            } else {
                postDB.find({ "_id": data.post }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null);
                    } else {
                        return cb(null, result);
                    }
                })
            }
        })
    },
    updateComments: (data, cb) => {

        postDB.updateOne({ _id: data.id }, { $push: { commentarray: [{ commentedby: data.user, comment: data.comment }] } }).exec((err, result) => {
            if (err) {
                console.log(err);
                return cb(err, null);
            } else {
                postDB.find({ _id: data.id }).populate('commentarray.commentedby').exec((err, result) => {
                    if (err) {
                        console.log(err);
                        return cb(err, null)
                    } else {
                        return cb(null, result[0].commentarray);
                    }
                })
            }
        })
    },
    verifyToken: (data, cb) => {
        //    console.log("data for token is" , data.token);
        jwt.verify(data.token, 'mySecretKeyForJWT', (err, result) => {
            if (err) {
                console.log(err);
                return cb(err, null);
            } else {
                // console.log("decoded token is" , result);            
                userDB.find({ email: result.user.email }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log("data fond is" , result);
                        return cb(null, result);
                    }
                })
            }
        })
    },
    checkToken: (req, res, next) => {

        let token = req.body.token;
        // console.log("token from chektken is" , token);

        if (token != null) {
            jwt.verify(token, 'mySecretKeyForJWT', (err, decoded) => {
                if (err) {
                    res.send("invalid token");
                } else {
                    req.decoded = decoded;
                    //   console.log(decoded);
                    next();
                }
            });
        } else {
            res.send("invalid token");
        }
    },
    updateFlagTrue: (data, cb) => {
        userDB.update({ _id: data.user }, { $addToSet: { flag: data.post } }).populate('flag').exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                return cb(null, result);
            }
        })
    },
    updateFlagFalse: (data, cb) => {
        userDB.update({ _id: data.user }, { $pull: { flag: data.post } }).populate('flag').exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                return cb(null, result);
            }
        })
    },

    getFlaggedPost: (data, cb) => {
        console.log("data at userapi is", data);
        userDB.find({ _id: data.user }).populate('flag').exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("result at userapi is", result);
                return cb(null, result);
            }
        })
    }
} 
