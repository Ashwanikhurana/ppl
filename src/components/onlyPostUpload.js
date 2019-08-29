import React from "react";
import AddCategoryComponent from "./addCategory";
import Categories from "./categories";

class OnlyUploadPostComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <button className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="/images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a>Upload post</a>{" "}
              </button>
              <AddCategoryComponent />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OnlyUploadPostComponent;
