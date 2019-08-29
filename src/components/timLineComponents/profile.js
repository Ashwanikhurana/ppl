import React from "react";
import PostComponent from "./post";
import { connect } from "react-redux";

class ProfileComponent extends React.Component {
  render() {
    return (
      <div className="content_lft">
        <div className="contnt_1">
          <div className="list_1">
            <ul>
              <li>
                <input type="checkbox" className="chk_bx" />
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
    user: state.timeLineReducer.user
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
      dispatch({ type: "CHANGE_POST", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
