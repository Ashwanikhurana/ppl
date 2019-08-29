var postDB = require("../schema/postSchema");

module.exports = {
  uploadingImage: (data, cb) => {
    postDB.create(data, (err, result) => {
      if (err) {
        console.log("error in uploading image data in userapi" + err);
        return cb(err, null);
      } else {
        postDB
          .find({})
          .sort({ _id: -1 })
          .limit(10)
          .skip(data.page)
          .populate("postedBy")
          .exec((err, result) => {
            if (err) {
              console.log(err);
            } else {
              return cb(null, result);
            }
          });
      }
    });
  },
  reterivePost: (data, cb) => {
    var perPage = 10;
    var page = data.page;

    postDB
      .find({})
      .sort({ _id: -1 })
      .limit(perPage)
      .skip(perPage * page - perPage)
      .populate("postedBy")
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          return cb(null, result);
        }
      });
  },
  sortCategory: (data, cb) => {
    postDB.find({ category: data.category }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return cb(null, result);
      }
    });
  },
  getSinglePostData: async data => {
    try {
      const result = await postDB
        .find({ _id: data.id })
        .populate("postedBy")
        .populate("commentarray.commentedby");
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updatePost: async data => {
    try {
      const result = await postDB
        .updateOne({ _id: data.id }, data.update)
        .populate("postedBy")
        .populate("commentarray.commentedby");
      console.log(result);
      const post = await postDB
        .find({ _id: data.id })
        .populate("commentarray.commentedby");
      return post;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
