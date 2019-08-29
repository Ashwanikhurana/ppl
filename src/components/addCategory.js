import React from "react";
import { connect } from "react-redux";
import UploadCategoryComponent from "./timLineComponents/getUploadCategoryData";

class AddCategoryComponent extends React.Component {
  handleAddCategoryButton = () => {
    if (this.props.tempBoolean1 === true) {
      this.props.changeCategoryComponent("");
      this.props.changeTemp(false);
    } else if (this.props.tempBoolean1 === false) {
      this.props.changeCategoryComponent(
        <UploadCategoryComponent handleCategory={this.props.handleCategory} />
      );
      this.props.changeTemp(true);
    }
  };
  render() {
    return (
      <div>
        <button className="rght_btn" onClick={this.handleAddCategoryButton}>
          <span className="rght_btn_icon">
            <img src="/images/btn_icona.png" alt="up" />
          </span>
          <span className="btn_sep">
            <img src="/images/btn_sep.png" alt="sep" />
          </span>
          <a>Add category</a>
        </button>
        <div>{this.props.addCategoryComponent}</div>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    categoryAdd: state.timeLineReducer.categoryAdd,
    categoryImage: state.timeLineReducer.categoryImage,
    tempBoolean1: state.timeLineReducer.tempBoolean1,
    addCategoryComponent: state.timeLineReducer.addCategoryComponent
  };
};

var mapDispatchToProps = dispatch => {
  return {
    changeAddCategory: data => {
      dispatch({ type: "ADD_CATEGORY", payload: data });
    },
    changeCategoryImage: data => {
      dispatch({ type: "CHANGE_CATEGORY_IMAGE", payload: data });
    },
    changeTemp: data => {
      dispatch({ type: "CHANGE_TEMP_BOOLEAN1", payload: data });
    },
    changeCategoryComponent: data => {
      dispatch({ type: "CHANGE_CATEGORY_BUTTON", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryComponent);
