const express = require("express");
const userRouter = express.Router();
const userApi = require("../api/userApi");
const Joi = require("@hapi/joi");

userRouter.post("/signup", async (req, res) => {
  const check = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required()
  };

  const result = Joi.validate(req.body, check);

  if (!result.error) {
    try {
      const result = await userApi.createUser(req.body);
      console.log("result at use router", result);
      if (result === true) {
        res.end( "thanks for registering" );
      } else {
        res.end("e mail already exists");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    res.send("details are not correct").status(406);
  }
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
  console.log("data at router", req.body);
  try {
    const result = await userApi.updateFlag(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;
