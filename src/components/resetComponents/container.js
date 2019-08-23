import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Container extends React.Component {
    render() {
        console.log(this.props.newPassword);
        return (
            <div className="container">
                <div className="content">
                    <div className="content_rgt">
                        <div className="register_sec">
                            <h1>Reset Password</h1>
                            <form onSubmit={this.props.handleReset}>
                                <ul>
                                    <li><span>Enter New Password</span><input type="text" placeholder="Enter your new password" name="newpassword" onChange={e => this.props.updatePassword(e.target.value)} required /></li>
                                    <li><span>Confirm Password</span><input type="text" placeholder="Enter your password again" name="confirmnewpassword" onChange={e => this.props.confirmUpdatePassword(e.target.value)} required /></li>
                                    <button type="submit">click me</button>
                                    {/* <h1>{this.props.err}</h1> */}
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div className="content_lft">
                        <h1>Welcome from PPL!</h1>
                        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                        <img src="/images/img_9.png" alt="" /> </div>
                </div>
            </div>
        )
    }
}


var mapStateToProps = (state) => {
    return {
       newPassword : state.resetReducer.newPassword,
       confirmPassword : state.resetReducer.confirmPassword,
       err : state.resetReducer.err,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: password => { dispatch({ type: "CHANGE_PASSWORD_RESET", payload: password }) },
        confirmUpdatePassword: confirmPassword => { dispatch({ type: "CHANGE_CONFIRM_PASSWORD_RESET", payload: confirmPassword }) },
        getResponse: err => { dispatch({ type: "GET_RESPONSE_RESET", payload: err }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
