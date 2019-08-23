import React from 'react';
import axios from 'axios';
import NavBar from '../navbar';
import Footer from '../footer';
import Header from '../header';
import { connect } from 'react-redux'
import Container from './container';

class ForgotComponent extends React.Component {

  handleForgot = (e) => {
    e.preventDefault();
    // console.log("a form was submitted" + this.props.email)
    axios.post('http://localhost:3030/forgot', { email: this.props.email }).then((res) => {
      this.props.getResponse(res.data);
    })
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
        <NavBar />
        <Header />
        <Container handleForgot = {this.handleForgot}/>        
        <Footer />
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    email: state.forgotReducer.email,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    getResponse: err => { dispatch({ type: "GET_RESPONSE_FORGOT", payload: err }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotComponent);

