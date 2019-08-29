import React from "react";
import Categories from "./categories";
import AddCategoryComponent from "./addCategory";
import ProfileComponent from "./timLineComponents/profile";
import { connect } from "react-redux";
import GetUploadDataComponent from "./timLineComponents/getUploadData";

class PostUploadComponent extends React.Component {
  handleUploadButon = () => {
    if (this.props.tempBoolean === true) {
      this.props.updateUploadButton("");
      this.props.updateTempBoolean(false);
    } else if (this.props.tempBoolean === false) {
      this.props.updateUploadButton(
        <GetUploadDataComponent handlePost={this.props.handlePost} />
      );
      this.props.updateTempBoolean(true);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <button className="rght_btn" onClick={this.handleUploadButon}>
              <span className="rght_btn_icon">
                <img src="images/btn_iconb.png" alt="up" />
              </span>{" "}
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a>Upload Post</a>{" "}
            </button>
            <div>{this.props.uploadComponent}</div>
            <AddCategoryComponent handleCategory={this.props.handleCategory} />
            <Categories />
          </div>
          <ProfileComponent
            handlePagination={this.props.handlePagination}
            handleLogOut={this.props.handleLogOut}
          />
        </div>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    tempBoolean: state.timeLineReducer.tempBoolean,
    uploadComponent: state.timeLineReducer.uploadComponent,
    posts: state.timeLineReducer.posts
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
      dispatch({ type: "CHANGE_POST", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostUploadComponent);
