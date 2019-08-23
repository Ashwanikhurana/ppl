import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SinglePostComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      fileName: "",
      displayTime: "",
      displayDate: "",
      singleComment: "",
      commentArray: [],
      displayCommentArray: [],
      addCategoryResponse: [],
      postAuthor: "",
      postAuthorId: "",
      flagArray: [],
      flagStatus: "",
      likeStatus: "",
      likeArray: [],
    }
  }

  
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.setState({ currentToken: token });
    
    axios.post('http://localhost:3030/getsinglepostdata', { "id": this.props.match.params.id }).then((res) => {
      console.log("response for the ful post is", res.data);
      this.setState({ response: res.data[0] })
      this.setState({ displayTime: this.state.response.time.slice(4, 16)  , displayDate: this.state.response.time.slice(16, 24) , fileName: this.state.response.image.filename ,  postAuthor: this.state.response.postedBy.username , postAuthorId: this.state.response.postedBy._id , commentArray: this.state.response.commentarray , likeArray: this.state.response.likearray});
      this.checkStatus();
    })
    
    axios.get('http://localhost:3030/reterivecategory').then((res) => {
      if (res.data === "details are not correct") {
      } else {
        console.log(res.data);
        this.setState({ addCategoryResponse: res.data })
      }
    });
  }

  getlikes = (e) => {
    if (this.state.likeStatus === "like") {
      // console.log("form submitted" , {user : this.state.postAuthorId , post : this.props.match.params.id });
      axios.post('http://localhost:3030/savelikes', { user: this.state.postAuthorId, post: this.props.match.params.id }).then((res) => {
        // console.log(res.data);
        this.setState({ likeArray: res.data[0].likearray });
        this.setState({ likeStatus: "unlike" })
      })
    } else if (this.state.likeStatus === "unlike") {
      // console.log("form submitted" , {user : this.state.postAuthorId , post : this.props.match.params.id });
      axios.post('http://localhost:3030/unSavelikes', { user: this.state.postAuthorId, post: this.props.match.params.id }).then((res) => {
        // console.log(res.data);
        this.setState({ likeArray: res.data[0].likearray });
        this.setState({ likeStatus: "like" })
      })
    }
  }

  handlesingleComment = (e) => {
    this.setState({singleComment : e.target.value})
  }

  handlecomments = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/savecomments', { user: this.state.postAuthorId, comment: this.state.singleComment, id: this.props.match.params.id }).then((res) => {
      // console.log("response is" , res.data);  
      this.setState({ commentArray: res.data });
    })
  }

  updateFlag = () => {
    if (this.state.flagStatus === "flag") {
      axios.post('http://localhost:3030/flagPost', { post: this.props.match.params.id, user: this.state.postAuthorId }).then((res) => {
        console.log(res.data);
        this.setState({ flagStatus: "flagged" });
      })
    } else if (this.state.flagStatus === "flagged") {
      axios.post('http://localhost:3030/unflagPost', { post: this.props.match.params.id, user: this.state.postAuthorId }).then((res) => {
        console.log(res.data);
        this.setState({ flagStatus: "flag" });
      })
    }
  }

  checkStatus = () => {
    let temp = this.state.likeArray.includes(this.state.postAuthorId);

    if (temp === true) {
      this.setState({ likeStatus: "unlike" });
    } else {
      this.setState({ likeStatus: "like" })
    }

    let temp1 = this.state.response.postedBy.flag.includes(this.props.match.params.id);

    if (temp1 === true) {
      this.setState({ flagStatus: "flagged" });
    } else {
      this.setState({ flagStatus: "flag" });
    }
  }
    

   mystyle = {
     height : 20,
     width: 20,
     float : "left",
   }
   mystyleforbutton = {
     height : 35,
     width : 323, 
     fontSize : 20,
   }

  styleForCategoryDropzone = {
    height : 40,
    width : 200,
  }

  styleForText = {
    marginLeft : -120,
    color : "black"
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
              <a className="brand" >PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                <div className="pro_txt">{this.state.postAuthor}<b className="caret" /></div>
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
                <ul className="singlepostnav">
                  <li className="active"> <Link to="/">Home </Link> </li>
                  <li className="active"> <a href="#">E-Coupons</a> </li>
                  <li className="active"> <a href="#">E-Brands</a> </li>
                  <li className="active"> <a href="#">Resuse Market</a> </li>
                  <li className="active"> <a href="#">Lost and Found</a> </li>
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
                <li> <Link to="/" className="active">Home</Link></li>
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
              <div className="info_div1">{this.state.postAuthor}</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <Link to="/posts">Upload Post</Link> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <Link to="/posts">Add Category</Link> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    {this.state.addCategoryResponse.map((i, s) =>
                      <button style={this.mystyleforbutton} id={this.state.addCategoryResponse[s].category} onClick={this.changedataforcategory}><Link to="/posts" style={this.styleForText}><span className="list_icon"><img style={this.mystyle} src={"http://localhost:3030/" + this.state.addCategoryResponse[s].image.filename} /></span>{this.state.addCategoryResponse[s].category}</Link></button>
                    )}
                  </ul>
                </div>
              </div>
              {/* <div className="rght_cate">
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
              </div> */}
            </div>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{this.state.response.Description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{this.state.response.category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="/images/img_6.png" />{this.state.postAuthor}</div>
                    <div className="div_top_rgt"><span className="span_date">{this.state.displayDate}</span><span className="span_time">{this.state.displayTime}</span></div>
                  </div>
                  <div className="div_image"><img src={"http://localhost:3030/" + this.state.fileName} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        {/* <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li> */}
                        <li><a href="javascript:void(0)" onClick={this.updateFlag}><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>{this.state.flagStatus}</a></li>
                        {/* <li><input type="checkbox"  name = "flag" checked={this.state.flag}  onChange = {this.changeFlag}/>flag</li> */}
                        <li><a href="javascript:void(0)" onClick={this.getlikes}><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{this.state.likeArray.length} {this.state.likeStatus}</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.commentArray.length} Comments</a></li>
                        {/* <h6>{this.state.flag.toString()}</h6> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  {this.state.commentArray.map((i) =>
                    <li>
                      <div className="list_image">
                        <div className="image_sec"><img src="/images/post_img.png" /></div>
                        <div className="image_name">{i.commentedby.username}</div>
                      </div>
                      <div className="list_info">
                        {i.comment}
                      </div>
                    </li>
                  )}
                  <li>
                    <div className="cmnt_div1">
                      <form onSubmit={this.handlecomments}>
                        <input onChange={this.handlesingleComment} type="text" className="cmnt_bx1" />
                        <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
                      </form>
                    </div>
                  </li>
                </ul>
                {/* <div className="view_div"><a href="#">View more</a></div> */}
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

  // export default SinglePostComponent;