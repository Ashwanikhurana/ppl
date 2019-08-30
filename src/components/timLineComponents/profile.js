import React from "react";
import PostComponent from "./post";
import { connect } from "react-redux";
import axios from "axios";

class ProfileComponent extends React.Component {
  handleFlaggedPost = async e => {
    await this.props.changeFlag(e.target.checked);
    if (this.props.flag === true) {
      console.log("true is called");
      console.log(this.props.user.flag);
      this.props.changePosts(this.props.user.flag);
    } else if (this.props.flag === false) {
      axios
        .post("http://localhost:3030/post/reterivepost", {
          page: this.props.page
        })
        .then(res => {
          console.log("post after render are ", res.data);
          if (res.status !== 200) {
            alert(res.data);
          } else {
            this.props.changePosts(res.data);
          }
        });
    }
  };
  render() {
    console.log(this.props.flag);
    return (
      <div className="content_lft">
        <div className="contnt_1">
          <div className="list_1">
            <ul>
              <li>
                <input
                  type="checkbox"
                  className="chk_bx"
                  checked={this.props.flag}
                  onChange={this.handleFlaggedPost}
                />
                Flaged
              </li>
              <div className="timeline_div">
                <div className="timeline_div1">
                  <div className="profile_pic">
                    <img src="images/pic.png" />
                  </div>
                  <div className="profile_info">
                    <div className="edit_div">
                      <button onClick={this.props.handleLogOut}>
                        Log Out{" "}
                      </button>
                    </div>
                    <div className="profile_form">
                      <ul>
                        <li>
                          <div className="div_name1">Name :</div>
                          <div className="div_name2">
                            {this.props.user.username}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <PostComponent handlePagination={this.props.handlePagination} />
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    description: state.timeLineReducer.description,
    category: state.timeLineReducer.category,
    image: state.timeLineReducer.image,
    posts: state.timeLineReducer.posts,
    user: state.timeLineReducer.user,
    flag: state.timeLineReducer.flag
  };
};

var mapDispatchToProps = dispatch => {
  return {
    changeDescription: data => {
      dispatch({ type: "CHANGE_DESCRIPTION", payload: data });
    },
    changeCategory: data => {
      dispatch({ type: "CHANGE_CATEGORY", payload: data });
    },
    changeImage: data => {
      dispatch({ type: "CHANGE_IMAGE", payload: data });
    },
    changePosts: data => {
      dispatch({ type: "CHANGE_POSTS", payload: data });
    },
    changeFlag: data => {
      dispatch({ type: "CHANGE_FLAG", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
