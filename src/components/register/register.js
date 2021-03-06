import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Container from "./container";

class SignUpComponent extends React.Component {
  handleSignUp = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/signup", {
        username: this.props.username,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        email: this.props.email,
        password: this.props.password
      })
      .then(res => {
        console.log(res);
        if (res.data === "thanks for registering") {
          alert(res.data);
          this.props.history.push("/login");
        }
        this.props.getResponse(res.data);
      });
  };

  render() {
    document.title = "Register";
    return (
      <div>
        <Container handleSignUp={this.handleSignUp} />
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    username: state.signUpReducer.username,
    firstname: state.signUpReducer.firstname,
    lastname: state.signUpReducer.lastname,
    email: state.signUpReducer.email,
    password: state.signUpReducer.password
  };
};

var mapDispatchToProps = dispatch => {
  return {
    getResponse: err => {
      dispatch({ type: "GET_RESPONSE_SIGNUP", payload: err });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);
