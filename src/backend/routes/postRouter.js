var express = require("express");
var postRouter = express.Router();
var multer = require("multer");
var Joi = require("@hapi/joi");
var postApi = require("../api/postApi");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

postRouter.post("/upload", upload.single("image"), (req, res) => {
  req.body.image = req.file;

  console.log("upload body is", req.body);
  const check = {
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.object().required(),
    postedBy: Joi.string().required()
  };

  const myresult = Joi.validate(req.body, check);

  console.log(myresult.error);

  if (!myresult.error) {
    postApi.uploadingImage(req.body, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("details are not correct").status(406);
  }
});

postRouter.post("/reterivepost", (req, res) => {
  postApi.reterivePost(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

postRouter.post("/sortcategory", (req, res) => {
  postApi.sortCategory(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

postRouter.post("/getsinglepostdata", async (req, res) => {
  try {
    const result = await postApi.getSinglePostData(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

postRouter.post("/updatepost", async (req, res) => {
  try {
    const result = await postApi.updatePost(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = postRouter;
