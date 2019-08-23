import React from 'react';
import axios from 'axios';
import NavBar from '../navbar';
import Footer from '../footer';
import Header from '../header';
import { connect } from 'react-redux';
import Container from './container';

class ResetComponent extends React.Component {

  handleReset = (e) => {
    e.preventDefault();
    if (this.props.newPassword === this.props.confirmPassword) {
      // console.log("form is submitted", { newpassword: this.props.newPassword, email: this.props.match.params.email });
      axios.post('http://localhost:3030/reset', { newPassword: this.props.newPassword, email: this.props.match.params.email }).then((res) => {
        if (res.status === 200) {
          this.props.history.push('/login');
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert("password does not match");
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Header />
        <Container handleReset={this.handleReset} />
        <Footer />
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    newPassword: state.resetReducer.newPassword,
    confirmPassword: state.resetReducer.confirmPassword,
    err: state.resetReducer.err,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: password => { dispatch({ type: "CHANGE_PASSWORD_RESET", payload: password }) },
    confirmUpdatePassword: confirmPassword => { dispatch({ type: "CHANGE_CHANGE_PASSWORD_RESET", payload: confirmPassword }) },
    getResponse: err => { dispatch({ type: "GET_RESPONSE_RESET", payload: err }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetComponent);

