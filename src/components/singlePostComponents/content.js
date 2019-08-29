import React from "react";
import SinglePost from "./post";
import axios from "axios";
import { connect } from "react-redux";

class SinglePostComponent extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:3030/post/getsinglepostdata", {
        id: this.props.match.params.id
      })
      .then(res => {
        console.log("at get single post data", res.data);
        this.props.changePost(res.data[0]);
      });

    if (token) {
      axios
        .post("http://localhost:3030/verifytoken", { token: token })
        .then(res => {
          console.log("token response is", res.data);
          this.props.changeLoggedUser(res.data[0]);
          this.checkLikeStatus();
        });
    } else {
      alert("please login to view this page");
      this.props.history.push("/login");
    }
  }

  checkLikeStatus = () => {
    let temp =
      this.props.post.likearray != undefined &&
      this.props.post.likearray.includes(this.props.loggedUser._id);
    if (temp === true) {
      this.props.changeLikeStatus("unlike");
    } else if (temp === false) {
      this.props.changeLikeStatus("like");
    }

    let temp1 =
      this.props.post.postedBy != undefined &&
      this.props.post.postedBy.flag.includes(this.props.match.params.id);
      console.log(temp);

      if(temp1 === true){
        this.props.changeFlag("flagged");
      }else if(temp1 === false) {
        this.props.changeFlag("flag");
      }
  };

  updatePost = e => {
    e.preventDefault();
    if (this.props.likeStatus === "like") {
      axios
        .post("http://localhost:3030/post/updatepost", {
          id: this.props.post._id,
          update: { $addToSet: { likearray: this.props.loggedUser._id } }
        })
        .then(res => {
          console.log(res.data);
          this.props.changePost(res.data[0]);
          this.props.changeLikeStatus("unlike");
        });
    } else if (this.props.likeStatus === "unlike") {
      axios
        .post("http://localhost:3030/post/updatepost", {
          id: this.props.post._id,
          update: { $pull: { likearray: this.props.loggedUser._id } }
        })
        .then(res => {
          console.log(res.data);
          this.props.changePost(res.data[0]);
          this.props.changeLikeStatus("like");
        });
    }
  };

  updateComments = e => {
    e.preventDefault();
    console.log("i am called");
    axios
      .post("http://localhost:3030/post/updatepost", {
        id: this.props.post._id,
        update: {
          $push: {
            commentarray: {
              commentedby: this.props.loggedUser._id,
              comment: this.props.comment
            }
          }
        }
      })
      .then(res => {
        console.log(res.data);
        this.props.changePost(res.data[0]);
      });
  };

  render() {
    return (
      <>
        <SinglePost
          updatePost={this.updatePost}
          handleComments={this.updateComments}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.singlePostReducer.post,
    imageName: state.singlePostReducer.imageName,
    loggedUser: state.singlePostReducer.loggedUser,
    likeStatus: state.singlePostReducer.likeStatus,
    comment: state.singlePostReducer.comment,
    flagStatus: state.singlePostReducer.flagStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePost: data => {
      dispatch({ type: "SET_POST", payload: data });
    },
    changeImageName: data => {
      dispatch({ type: "SET_IMAGE_NAME", payload: data });
    },
    changeLikeStatus: data => {
      dispatch({ type: "SET_LIKE_STATUS", payload: data });
    },
    changeLoggedUser: data => {
      dispatch({ type: "SET_LOGGED_USER", payload: data });
    },
    changeFlag: data => {
      dispatch({ type: "SET_FLAG", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostComponent);
