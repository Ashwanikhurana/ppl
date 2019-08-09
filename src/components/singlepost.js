import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class SinglePostComponent extends React.Component{
  constructor() {
    super();
    this.state = {
      myid  : "",
      response : [],
      filename : "",
      description : "",
      category : "",
      time : "",
      displaytime : "",
      displaydate : "",
      usernametodisplay : "",
      likecount : 0,
      likearray : [],
      currentuser : "",
      likeresponse : "",
      displaylikes : "like",
      commentcount : 0,
      commentarray : [],
      singlecomment : "",
      commentresponse : "",
      displaycommentarray : [],
      displayusers : [],
    }
  }

  setdata = (data) => {
      this.setState({response : data});
      this.setpost();
  }

  setpost = () => {
    this.setState({description : this.state.response[0].Description});
    this.setState({category : this.state.response[0].category});
    this.setState({filename : this.state.response[0].image.filename});
    this.setState({displaytime : this.state.response[0].time.slice(4 , 15)});
    this.setState({displaydate : this.state.response[0].time.slice(16 , 24)});
  }
  
  componentDidMount() {
    console.log("form is submitted" + this.props.match.params.id)
    Axios.post('http://localhost:3030/getsinglepostdata' , { "id" : this.props.match.params.id}).then((res) => {
      this.setdata(res.data);
      console.log(this.state.response);
       const temp = localStorage.getItem("username");
       this.setState({usernametodisplay : temp});
       const temp1 = localStorage.getItem("user");
       this.setState({currentuser : temp1});
    })
    Axios.post('http://localhost:3030/reterivelikes' , {id : this.props.match.params.id}).then((res) => {
      this.setState({likeresponse : res.data})
      this.setState({likecount : res.data[0].likecount});
      this.setState({likearray : res.data[0].likearray});
    })

    Axios.post('http://localhost:3030/reterivecomments' , {id : this.props.match.params.id}).then((res) => {
      this.setState({commentresponse : res.data});
      this.showcomments();
    })
  }

  getlikes = () => {
    var temp = 0;
    for(let i =0;i<this.state.likearray.length;i++){
      if(this.state.likearray[i] == this.state.currentuser){
        temp = 1;
        break;
      }
    }
    if(temp ==0){
    this.setState({likecount : this.state.likecount + 1});
    console.log("likecount is" , this.state.likecount);
    var temp = this.state.likearray;
    temp.push(this.state.currentuser);
    this.setState({likearray : temp});
    console.log("likearray is" , this.state.likearray);
    console.log("form submitted" , {likecount : this.state.likecount , likearray : this.state.likearray , id : this.props.match.params.id});
    Axios.post('http://localhost:3030/savelikes' , {likecount : this.state.likecount+1 , likearray : this.state.likearray , id : this.props.match.params.id}).then((res) => {
      console.log(res.data);
    })
   }
   else{
     this.setState({likecount : this.state.likecount - 1});
     console.log("likecount is" , this.state.likecount);
     var temp1 = this.state.likearray;
     for(let i=0;i<this.state.likearray.length;i++){
       if(this.state.likearray[i] == this.state.currentuser){
          temp1.splice(i , 1);
       }
     }
     this.setState({likearray : temp1});
     console.log("likearray is" , this.state.likearray);
     console.log("form submitted" , {likecount : this.state.likecount , likearray : this.state.likearray , id : this.props.match.params.id});
     Axios.post('http://localhost:3030/savelikes' , {likecount : this.state.likecount-1 , likearray : this.state.likearray , id : this.props.match.params.id}).then((res) => {
       console.log(res.data);
     })
   }
  }

  handlesinglecomment = (e) => {
    this.setState({singlecomment : e.target.value})
  }

  handlecomments = (e) => {
    e.preventDefault();
    console.log("form is submitted" ,{user : this.state.currentuser , comment : this.state.singlecomment , id : this.props.match.params.id})
    Axios.post('http://localhost:3030/savecomments' , {user : this.state.usernametodisplay , comment : this.state.singlecomment , id : this.props.match.params.id}).then((res) => {
      console.log("response is" , res.data);  
    this.setState({commentresponse : res.data});
    this.showcomments();
    })
  }

  showcomments = () => {
    let temp = this.state.commentresponse[0].commentarray;
    console.log(temp);
     var a = [] , b = [] , i;
    for(i=0;i<temp.length;i++){
      a[i] = temp[i].comment;
      b[i] = temp[i].commentedby;
    }
    this.setState({displaycommentarray : a});
    this.setState({displayusers : b});
  }
    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Singal Post</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                <a className="brand" href>PPL</a>
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="/images/pic_small.png" /></div>
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
                    <li className="active"> <Link to = "/">Home </Link> </li>
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
                  <li> <Link to = "/" className="active">Home</Link></li>
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
                <div className="info_div1">{this.state.usernametodisplay}</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <div className="rght_list">
                    <ul>
                      <li><a href="#"><span className="list_icon"><img src="/images/icon_01.png" alt="up" /></span> CATS</a></li>
                      <li><a href="#"><span className="list_icon"><img src="/images/icon_02.png" alt="up" /></span> Dogs</a></li>
                      <li><a href="#"><span className="list_icon"><img src="/images/icon_03.png" alt="up" /></span> Birds</a></li>
                      <li><a href="#"><span className="list_icon"><img src="/images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                      <li><a href="#"><span className="list_icon"><img src="/images/icon_05.png" alt="up" /></span> Others</a></li>
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content_lft">
                <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">{this.state.description}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{this.state.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft"><img src="/images/img_6.png" />{this.state.usernametodisplay}</div>
                      <div className="div_top_rgt"><span className="span_date">{this.state.displaydate}</span><span className="span_time">{this.state.displaytime}</span></div>
                    </div>
                    <div className="div_image"><img src={"http://localhost:3030/" + this.state.filename} alt="pet" /></div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                          <li><a href="#" onClick = {this.getlikes}><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{this.state.likearray.length} {this.state.displaylikes}</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.displaycommentarray.length} Comments</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contnt_3">
                  <ul>
                  {this.state.displaycommentarray.map( (k , s) =>
                    <li>
                      <div className="list_image">
                        <div className="image_sec"><img src="/images/post_img.png" /></div>
                        <div className="image_name">{this.state.displayusers[s]}</div>
                      </div>
                      <div className="list_info">
                       {this.state.displaycommentarray[s]}
                      </div>
                      {/* <input type="button" defaultValue="Reply" className="orng_btn" /> */}
                    </li>
                  )}
                    <li>
                      <div className="cmnt_div1">
                        <form onSubmit = {this.handlecomments}>
                        <input onChange = {this.handlesinglecomment} type="text"  className="cmnt_bx1" />
                        <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
                        </form>
                      </div>
                    </li>
                  </ul>
                  <div className="view_div"><a href="#">View more</a></div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
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

  export default SinglePostComponent;