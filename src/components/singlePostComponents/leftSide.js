import React from "react";
import { Link } from "react-router-dom";

class LinkedComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="content_rgt">
          <Link to="/posts">
            <button className="rght_btn" style={{ color: "white" }}>
              <span className="rght_btn_icon">
                <img src="/images/btn_icona.png" alt="up" />
              </span>
              <span className="btn_sep">
                <img src="/images/btn_sep.png" alt="sep" />
              </span>
              <h3>Upload post</h3>
            </button>
          </Link>
          <Link to="/posts">
            <button className="rght_btn" style={{ color: "white" }}>
              <span className="rght_btn_icon">
                <img src="/images/btn_icona.png" alt="up" />
              </span>
              <span className="btn_sep">
                <img src="/images/btn_sep.png" alt="sep" />
              </span>
              <h3>Add category</h3>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LinkedComponent;
