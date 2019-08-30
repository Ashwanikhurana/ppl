import React from "react";
import LinkedComponent from "./leftSide";
import { connect } from "react-redux";

class SinglePost extends React.Component {
  render() {
    this.props.changeImageName(
      this.props.post.image && this.props.post.image.filename
    );
    return (
      <div className="container">
        <div className="content">
          <div className="content_lft">
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{this.props.post.description}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{this.props.post.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="/images/img_6.png" />
                    {this.props.post.postedBy &&
                      this.props.post.postedBy.username}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">
                      {new Date(this.props.post.time).toString().slice(0, 15)}
                    </span>
                    <span className="span_time">
                      {new Date(this.props.post.time).toString().slice(16, 24)}
                    </span>
                  </div>
                </div>
                <div className="div_image">
                  <img
                    alt="pet"
                    src={"http://localhost:3030/" + this.props.imageName}
                  />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a
                          href="javascript:void(0)"
                          onClick={this.props.updateFlag}
                        >
                          <span className="btn_icon">
                            <img src="/images/icon_002.png" alt="share" />
                          </span>
                          {this.props.flagStatus}
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          onClick={this.props.updatePost}
                        >
                          <span className="btn_icon">
                            <img src="/images/icon_003.png" alt="share" />
                          </span>
                          {this.props.post.likearray &&
                            this.props.post.likearray.length}
                          {" " + this.props.likeStatus}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img alt="share" src="/images/icon_004.png" />
                          </span>
                          Comments
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LinkedComponent />
        </div>
        <div className="contnt_3">
          <ul>
            {this.props.post.commentarray != undefined &&
              this.props.post.commentarray.map(i => (
                <li>
                  <div className="list_image">
                    <div className="image_sec">
                      <img src="/images/post_img.png" />
                    </div>
                    <div className="image_name">{i.commentedby.username}</div>
                  </div>
                  <div className="list_info">{i.comment}</div>
                </li>
              ))}
            <li>
              <div className="cmnt_div1">
                <form onSubmit={this.props.handleComments}>
                  <input
                    onChange={e => this.props.changeComment(e.target.value)}
                    type="text"
                    className="cmnt_bx1"
                  />
                  <input
                    type="submit"
                    className="sub_bttn1"
                    defaultValue="Submit Comment"
                  />
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.singlePostReducer.post,
    imageName: state.singlePostReducer.imageName,
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
    changeComment: data => {
      dispatch({ type: "SET_COMMENT", payload: data });
    },
    changeFlag: () => {
      console.log("particular action called");
      dispatch({ type: "TEST" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
