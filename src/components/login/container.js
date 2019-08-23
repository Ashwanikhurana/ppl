import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Container extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="content">
                    <div className="content_rgt">
                        <div className="login_sec">
                            <h1>Log In</h1>
                            <form onSubmit={this.props.handleLogIn}>
                                <ul>
                                    <li><span>Email-ID</span><input type="text" placeholder="Enter your email" name="email" onChange={e => this.props.updateEmail(e.target.value)} value={this.props.email} required /></li>
                                    <li><span>Password</span><input type="text" placeholder="Enter your password" name="password" onChange={e => this.props.updatePassword(e.target.value)} required /></li>
                                    <li><input type="submit" defaultValue="Log In" /><Link to="/forgot">Forgot Password</Link></li>
                                    <h4>{this.props.err}</h4>
                                </ul>
                            </form>
                            <div className="addtnal_acnt">I do not have any account yet.<Link to="/">Create My Account Now !</Link></div>
                        </div>
                    </div>
                    <div className="content_lft">
                        <h1>Welcome from PPL!</h1>
                        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                        <img src="images/img_9.png" alt="" /> </div>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        email: state.loginReducer.email,
        password: state.loginReducer.password,
        err: state.loginReducer.err,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        updateEmail: email => { dispatch({ type: "CHANGE_EMAIL_LOGIN", payload: email }) },
        updatePassword: password => { dispatch({ type: "CHANGE_PASSWORD_LOGIN", payload: password }) },
        // getResponse: err => { dispatch({ type: "GET_RESPONSE_LOGIN", payload: err }) },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Container);