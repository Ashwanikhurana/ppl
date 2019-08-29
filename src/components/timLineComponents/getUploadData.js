import React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";

class GetUploadPostDataComponent extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handlePost}>
          SELECT CATEGORY:
          <select
            name="category"
            onChange={e => this.props.changeCategory(e.target.value)}
            required
          >
            <option hidden value={this.props.category}></option>
            {this.props.categories.map(category => (
              <option>{category.category}</option>
            ))}
          </select>
          <br />
          DESCRIPTION:
          <br />
          <input
            type="text"
            name="Description"
            onChange={e => this.props.changeDescription(e.target.value)}
            required
          />
          <Dropzone
            name="image"
            onDrop={acceptedFiles => this.props.changeImage(acceptedFiles[0])}
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
    categories: state.timeLineReducer.categories
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
)(GetUploadPostDataComponent);
