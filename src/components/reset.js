import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ResetComponent extends  React.Component{
    constructor() {
        super();
        this.state = {
            newpassword : "",
            confirmnewpassword : "",
            response : "",
        }
    }

    componentDidMount() {
      console.log(this.props.match.params);

    }

    changeData = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    sendingFromAxios = (e) => {
        e.preventDefault();
        if(this.state.newpassword === this.state.confirmnewpassword){
        axios.post('http://localhost:3030/reset' , {newpassword : this.state.newpassword , email : this.props.match.params.email}).then((res) => {
            console.log(res.data);
        })
      }else{
          alert("pagal h k");
      }
    }

    render () {
        console.log(this.state.newpassword);
        console.log(this.state.confirmnewpassword);
        console.log(this.props.match);
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Reset Password</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                <a className="brand" href>PPL</a>
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                  <div className="pro_txt">Me<b className="caret" /></div>
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
              <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
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
              <div className="flag_div"><img src="/images/flag.png" /></div>
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
              <div className="info_div">
                <div className="image_div"> <img src="/images/pic.png" /> </div>
                <div className="info_div1">Me</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="register_sec">
                  <h1>Reset Password</h1>
                  <form onSubmit = {this.sendingFromAxios}>
                  <ul>
                    <li><span>Enter New Password</span><input type="text" placeholder="Enter your new password" name="newpassword" onChange={this.changeData} required/></li>
                    <li><span>Confirm Password</span><input type="text" placeholder="Enter your password again" name="confirmnewpassword" onChange={this.changeData} required/></li>
                    <Link to = "/login"> <li><input type="submit" defaultValue="Submit" /></li></Link>
                    {/* <h6>{this.state.response}</h6> */}
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
          <div className="clear" />
          <div className="footr">
            <div className="footr_lft">
              <div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
              <div className="footer_div2"><a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a></div>
            </div>
            <div className="footr_rgt">
              <ul>
                <li><a href="#"><img src="/images/social_1.png" /></a></li>
                <li><a href="#"><img src="/images/social_2.png" /></a></li>
                <li><a href="#"><img src="/images/social_3.png" /></a></li>
                <li><a href="#"><img src="/images/social_4.png" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  export default ResetComponent;