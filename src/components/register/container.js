import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Container extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="register_sec">
                                <h1>Create An Account</h1>
                                <form onSubmit={this.props.handleSignUp}>
                                    <ul>
                                        <li><span>Username</span><input type="text" placeholder="Enter your username" name="username" onChange={e => this.props.updateUserName(e.target.value)}  required/></li>
                                        <li><span>Password</span><input type="text" placeholder="Enter your password" name="password" onChange={e => this.props.updatePassword(e.target.value)} required /></li>
                                        <li><span>Email</span><input type="text" placeholder="Enter your email" name="email" onChange={e => this.props.updateEmail(e.target.value)} required /></li>
                                        <li><span>First Name</span><input type="text" placeholder="Enter your first name" name="firstname" onChange={e => this.props.updateFirstName(e.target.value)} required /></li>
                                        <li><span>Last Name</span><input type="text" placeholder="Enter your last name" name="lastname" onChange={e => this.props.updateLastName(e.target.value)} required /></li>
                                        <li><input type="submit" defaultValue="Register" /></li>
                                        <li><h4>{this.props.err}</h4></li>
                                    </ul>
                                </form>
                                <div className="addtnal_acnt">I already have an account.<Link to="/login">Login My Account !</Link></div>
                            </div>
                        </div>
                        <div className="content_lft">
                            <h1>Welcome from PPL!</h1>
                            <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                            <img src="images/img_9.png" alt="" /> </div>
                    </div>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        err: state.signUpReducer.err,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        updateUserName: username => { dispatch({ type: "CHANGE_USERNAME_SIGNUP", payload: username }) },
        updateFirstName: firstname => { dispatch({ type: "CHANGE_FIRSTNAME_SIGNUP", payload: firstname }) },
        updateLastName: lastName => { dispatch({ type: "CHANGE_LASTNAME_SIGNUP", payload: lastName }) },
        updateEmail: email => { dispatch({ type: "CHANGE_EMAIL_SIGNUP", payload: email }) },
        updatePassword: password => { dispatch({ type: "CHANGE_PASSWORD_SIGNUP", payload: password }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);