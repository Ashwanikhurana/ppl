import React from 'react'; 
import {connect} from 'react-redux'
import axios from 'axios';
import {Link} from 'react-router-dom';

class LogInComponent extends React.Component{
  constructor() {
    super();
    this.state = {
      rememberme : false,
      usernametodisplay : "", 
    }
  }
    sendingFromAxios = (e) => {
        e.preventDefault();   
        this.newMethod();
        const rememberme = this.state.rememberme;
        localStorage.setItem('rememberme' , rememberme);
        const pass = this.props.password;
        localStorage.setItem('pass' , pass);
        const user = this.props.email;
        localStorage.setItem('user' , user);
        axios.post("http://localhost:3030/login" , { email : this.props.email , password : this.props.password}).then((res) => {
            this.letsdo(res);
            const username = res.data.slice(28);
            localStorage.setItem('username' , username);
            const tocheck = res.data.slice(0 , 27);
            console.log(tocheck);
            if(tocheck === "thanks for logging in again"){
              this.props.history.push("/");
            }
        })
    }

    changingdata = (e) => {
      this.setState({rememberme : e.target.checked});
    }
    
      letsdo = (a) => {
          this.props.getResponse(a.data);
      }
    
      newMethod() {
          console.log("form is submitted", { email: this.props.email, password: this.props.password });
      }

      componentDidMount() {
        const rememberme = localStorage.getItem('rememberme') === 'true';
        const user = rememberme ? localStorage.getItem('user') : '';
        // const pass = rememberme ? localStorage.getItem('pass') : '';
        const username = rememberme ? localStorage.getItem('username') : '';
        this.setState({ rememberme : rememberme });
        this.setState({usernametodisplay : username});
        this.props.updateEmail(user);
        // this.props.updatePassword(pass);
      }

      manazestorage = () => {
        localStorage.setItem('user' , '');
        localStorage.setItem('username' , '');
      }
     
    render() {
      // console.log("is data", this.state.rememberme);
      console.log(this.props);
      return (
        <div>
         <Link to= "/signup"> <button onClick = {this.manazestorage}>logout</button> </Link>
          <meta charSet="utf-8" />
          <title>Login Account</title>
          <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                <a className="brand" href>PPL</a>
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="images/pic_small.png" /></div>
                  <div className="pro_txt">{this.state.usernametodisplay}<b className="caret" /></div>
                  <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                    <li><a tabIndex={-1} href="#">My Profile</a></li>
                    <li><a tabIndex={-1} href="#">Message Box</a></li>
                    <li><a tabIndex={-1} href="#">Change Language</a></li>
                    <li className="divider" />
                    <li><a tabIndex={-1} href="#">
                        <input type="text" placeholder="search" />
                      </a></li>
                  </ul>
                </div>
                <div className="nav-collapse collapse">
                  <ul className="nav">
                    <li className="active"> <a href>Home</a> </li>
                    <li className> <a href>E-Coupons</a> </li>
                    <li className> <a href>E-Brands</a> </li>
                    <li className> <a href>Resuse Market</a> </li>
                    <li className> <a href>Lost and Found</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header">
            <div className="header_lft">
              <div className="logo"><a href="#"><img src="images/logo.png" /></a></div>
              <div className="navigatn">
                <ul>
                  <li><a href="#" className="active">Home</a></li>
                  <li><a href="#"> E-Coupons </a></li>
                  <li><a href="#">E-Brands </a></li>
                  <li><a href="#"> Resuse Market </a></li>
                  <li><a href="#"> Lost and Found</a></li>
                </ul>
              </div>
            </div>
            <div className="header_rgt">
              <div className="flag_div"><img src="images/flag.png" /></div>
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
              <div className="info_div">
                <div className="image_div"> <img src="images/pic.png" /> </div>
                <div className="info_div1">{this.state.usernametodisplay}</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="login_sec">
                  <h1>Log In</h1>
                  <form onSubmit = {this.sendingFromAxios}>
                  <ul>
                    <li><span>Email-ID</span><input type="text" placeholder="Enter your email" name = "email" onChange = {e => this.props.updateEmail(e.target.value)} value = {this.props.email} required/></li>
                    <li><span>Password</span><input type="text" placeholder="Enter your password" name = "password" onChange = {e => this.props.updatePassword(e.target.value)} required/></li>
                    <li><input type="checkbox"  name = "rememberme" checked={this.state.rememberme}  onChange = {this.changingdata}/>Remember Me</li>
                    <p>{this.state.rememberme.toString()}</p>
                    <li><input type="submit" defaultValue="Log In" /><Link to = "/forgot">Forgot Password</Link></li>
                    <h4>{this.props.err}</h4>
                  </ul>
                  </form>
                  <div className="addtnal_acnt">I do not have any account yet.<Link to = "/signup">Create My Account Now !</Link></div>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                <img src="images/img_9.png" alt="" /> </div>
            </div>
          </div>
          <div className="clear" />
          <div className="footr">
            <div className="footr_lft">
              <div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
              <div className="footer_div2"><a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a></div>
            </div>
            <div className="footr_rgt">
              <ul>
                <li><a href="#"><img src="images/social_1.png" /></a></li>
                <li><a href="#"><img src="images/social_2.png" /></a></li>
                <li><a href="#"><img src="images/social_3.png" /></a></li>
                <li><a href="#"><img src="images/social_4.png" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  var mapStateToProps = (state) => {
    return {
      email : state.email,
      password : state.password,
      err : state.err,
    }
  }

  var mapDispatchToProps = (dispatch) => {
      return {
         updateEmail : email => { dispatch({ type: "CHANGE_EMAIL", payload: email })},
         updatePassword : password => { dispatch({ type: "CHANGE_PASSWORD", payload: password })},
         getResponse : err => { dispatch({ type: "GET_RESPONSE", payload: err })},
      }
    
  }
  
export default connect(mapStateToProps ,mapDispatchToProps)(LogInComponent);