import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

class PostComponent extends React.Component {
  handlePaginationPrevious = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/post/reterivepost", {
        page: this.props.page - 1
      })
      .then(res => {
        this.props.changePage(this.props.page - 1);
        console.log(res.data);
        this.props.changePosts(res.data);
        console.log("ater changing state", this.props.posts);
        window.scrollTo(0, 0);
      });
  };
  render() {
    return (
      <div>
        {this.props.posts.map(post => (
          <Link to={`/singlepost/${post._id}`}>
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{post.description}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{post.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="images/img_6.png" />
                    {post.postedBy.username}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">
                      {new Date(post.time).toString().slice(0, 15)}
                    </span>
                    <span className="span_time">
                      {new Date(post.time).toString().slice(17, 24)}
                    </span>
                  </div>
                </div>
                <div className="div_image">
                  <img
                    src={"http://localhost:3030/" + post.image.filename}
                    alt="pet"
                  />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <span className="btn_icon">
                          <img src="images/icon_002.png" alt="share" />
                        </span>
                        Flag
                      </li>
                      <li>
                        <span className="btn_icon">
                          <img src="images/icon_003.png" alt="share" />
                        </span>
                        Likes
                      </li>
                      <li>
                        <span className="btn_icon">
                          <img src="images/icon_004.png" alt="share" />
                        </span>
                        Comments
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {this.props.page > 1 && (
          <button
            style={{ marginTop: 30, marginLeft: 170 }}
            onClick={this.handlePaginationPrevious}
          >
            Previous
          </button>
        )}
        {this.props.posts.length == 10 && (
          <button
            style={{ marginTop: 30, marginLeft: 170 }}
            onClick={this.props.handlePagination}
          >
            Next
          </button>
        )}
      </div>
    );
  }
}
var mapStateToProps = state => {
  return {
    tempBoolean: state.timeLineReducer.tempBoolean,
    uploadComponent: state.timeLineReducer.uploadComponent,
    posts: state.timeLineReducer.posts,
    page: state.timeLineReducer.page
  };
};

var mapDispatchToProps = dispatch => {
  return {
    updateUploadButton: data => {
      dispatch({ type: "CHANGE_UPLOAD_BUTTON", payload: data });
    },
    updateTempBoolean: data => {
      dispatch({ type: "CHANGE_TEMP_BOOLEAN", payload: data });
    },
    changePosts: data => {
      dispatch({ type: "CHANGE_POSTS", payload: data });
    },
    changePage: data => {
      dispatch({ type: "CHANGE_PAGE", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComponent);
