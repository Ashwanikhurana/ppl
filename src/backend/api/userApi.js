var userDB = require("../schema/userSchema");
var nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

module.exports = {
  createNewUser: data => {
    return new Promise((resolve, reject) => {
      userDB
        .create(data)
        .then(resolve(true))
        .catch(reject(false));
    });
  },

  checkUserExist: data => {
    return new Promise((resolve, reject) => {
      userDB
        .find({ email: data.email })
        .then(result => {
          if (result.length !== 0) {
            resolve(true);
          }
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
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
              password: data.password
            };

            jwt.sign({ user }, "mySecretKeyForJWT", (err, token) => {
              if (err) {
                console.log(err);
              } else {
                return cb(null, "thanks for logging in again" + token);
              }
            });
          }
        });
      }
    });
  },

  sendResetMail: (data, cb) => {
    userDB.find({ email: data.email }, (err, result) => {
      if (err) {
        console.log(err);
        return cb(err, null);
      } else if (result.length >= 1) {
        jwt.sign({ data }, "mySecretKeyForResetPassword", (err, token) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            data.token = token;
            var transporternew = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "ashwanikhurana627@gmail.com",
                pass: "ashwanikhurana@2001"
              }
            });
            var mailOptionsnew = {
              from: "ashwanikhurana627@gmail.com",
              to: data.email,
              subject: "PLEASE RESET YOUR PASSWORD",
              html:
                `<a href = http://localhost:3000/reset/${data.token}` +
                ">click here to reset your password </a>"
            };

            transporternew.sendMail(mailOptionsnew, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        });
        return cb(null, "password reset link was send to your email");
      } else {
        return cb(null, "email not found");
      }
    });
  },

  updatePassword: (data, cb) => {
    console.log(data);
    jwt.verify(data.email, "mySecretKeyForResetPassword", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        userDB.updateOne(
          { email: result.data.email },
          { $set: { password: data.newPassword } },
          (err, result) => {
            if (err) {
              console.log(err);
              return cb(err, null);
            } else {
              console.log(result);
              return cb(null, "password changed succesully");
            }
          }
        );
      }
    });
  },
  verifyToken: (data, cb) => {
    //    console.log("data for token is" , data.token);
    jwt.verify(data.token, "mySecretKeyForJWT", (err, result) => {
      if (err) {
        console.log(err);
        return cb(err, null);
      } else {
        // console.log("decoded token is" , result);
        // userDB.find({ email: result.user.email }, (err, result) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     // console.log("data fond is" , result);
        //     return cb(null, result);
        //   }
        // });
        userDB.find({email : result.user.email}).populate('flag').exec((err , result) => {
          if(err){
            console.log(err);
          }else{
            return cb(null , result);
          }
        })
      }
    });
  },
  updateFlag: async data => {
    console.log("data at userapi", data);
    try {
      const result = await userDB.update({ _id: data.id }, data.update);
      console.log(result);
      const user = await userDB.find({ _id: data.id });
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
};
