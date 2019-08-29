import React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";

class UploadCategoryComponent extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleCategory}>
          <h4>Type your category</h4>
          <input
            type="text"
            name="category"
            onChange={e => this.props.changeAddCategory(e.target.value)}
            required
          />
          <h4>Add Image</h4>
          <Dropzone
            name="image"
            onDrop={acceptedFiles =>
              this.props.changeCategoryImage(acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input
                    {...getInputProps()}
                    name="image"
                    style={this.styleForImageDropzone}
                  />
                  <p>Drag 'n' drop some files here, or click to select file</p>
                </div>
              </section>
            )}
          </Dropzone>
          <button type="submit" style={{ float: "centre", marginLeft: 80 }}>
            Upload
          </button>
        </form>
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
    categoryAdd: state.timeLineReducer.categoryAdd,
    categoryImage: state.timeLineReducer.categoryImage
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
    },
    changeAddCategory: data => {
      dispatch({ type: "ADD_CATEGORY", payload: data });
    },
    changeCategoryImage: data => {
      dispatch({ type: "CHANGE_CATEGORY_IMAGE", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCategoryComponent);
