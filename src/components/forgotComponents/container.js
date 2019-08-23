import React from 'react';
import { connect } from 'react-redux'


class ForgotComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="content">
                    <div className="content_rgt">
                        <div className="register_sec">
                            <h1>Forgot Password</h1>
                            <form onSubmit={this.props.handleForgot}>
                                <ul>
                                    <li><span>Enter E-mail ID</span><input type="email" placeholder="User@gmail.com" name="input" onChange={e => this.props.updateEmail(e.target.value)} required /></li>
                                    <li><input type="submit" defaultValue="Submit" /></li>
                                    <h6>{this.props.err}</h6>
                                </ul>
                            </form>
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
     err : state.forgotReducer.err,
    }
  }
  
  var mapDispatchToProps = (dispatch) => {
    return {
        updateEmail: email => { dispatch({ type: "CHANGE_EMAIL_FORGOT", payload: email }) },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ForgotComponent);