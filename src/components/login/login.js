import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Header from '../header';
import Footer from '../footer';
import NavBar from '../navbar';
import Container from './container';

class LogInComponent extends React.Component {

  componentDidMount() {
    const checkToken = localStorage.getItem('token');
    if (checkToken) {
      alert("please logout first to login")
      this.props.history.push('/posts');
    }
  }


  handleLogIn = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/login", { email: this.props.email, password: this.props.password }).then((res) => {
      const temp = res.data.slice(0, 27);
      if (temp === "thanks for logging in again") {
        const token = res.data.slice(27, res.data.length);
        localStorage.setItem('token', token);
        this.props.history.push("/posts");
      } else {
        this.props.getResponse(res.data);
      }
    })
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <Container handleLogIn={this.handleLogIn} />
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    email: state.loginReducer.email,
    password: state.loginReducer.password,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    getResponse: err => { dispatch({ type: "GET_RESPONSE_LOGIN", payload: err }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInComponent);