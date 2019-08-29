var express = require("express");
var userRouter = express.Router();
var userApi = require("../api/userApi");
var Joi = require("@hapi/joi");

userRouter.post("/signup", (req, res) => {
  userApi.checkUserExist(req.body).then(result => {
    if (result === true) {
      console.log("already registered");
      res.send("sorry that e-mail already exist try with another");
    } else {
      console.log("newly registered");
      userApi
        .createNewUser(req.body)
        .then(result => {
          if (result === true) {
            res.send("thanks for registering");
          }
        })
        .catch(err => console.log(err));
    }
  });
});

userRouter.post("/login", (req, res) => {
  var check = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };
  const result = Joi.validate(req.body, check);
  if (!result.error) {
    userApi.checkLogin(req.body, (err, result) => {
      if (err) {
        console.log("error occured in router in login" + err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("details are not correct").status(406);
  }
});

userRouter.post("/forgot", (req, res) => {
  userApi.sendResetMail(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

userRouter.post("/reset", (req, res) => {
  userApi.updatePassword(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result).status(400);
    }
  });
});

userRouter.post("/verifytoken", (req, res) => {
  userApi.verifyToken(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

userRouter.post("/updateflag", async (req, res) => {
    console.log("data at router" , req.body);
  try {
    const result = await userApi.updateFlag(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;
