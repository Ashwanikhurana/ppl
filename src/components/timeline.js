import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom';
import Header from './header';


class TimeLineComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booleanForDrop: false,
      myDiv: "",
      resArray: [],
      DescriptionArray: [],
      categoryArray: [],
      timeArray: [],
      fileNameArray: [],
      booleanForCategory: false,
      meNeWDiv: "",
      addCategory: "",
      addCategoryResponse: [],
      showTime: "",
      showDate: "",
      logData: "",
      recordedPost: 0,
      booleanForLogData: false,
      currentUser: "guest",
      idArray: [],
      categoryImage: null,
      invalidDetails: null,
      postedByArray: [],
      currentToken: "",
      logStatus: "",
      currentUserId: "",
      flagBoolean: false,
    }
  }


  componentDidMount() {
    axios.get('http://localhost:3030/reterivecategory').then((res) => {
      if (res.data === "details are not correct") {
        this.setState({ invalidDetails: "details are not correct" });
      } else {
        console.log("category reterived after first render is", res.data);
        this.setState({ addCategoryResponse: res.data })
      }
    });

    axios.post('http://localhost:3030/reterivepost', { skippedPost: this.state.recordedPost }).then((res) => {
      if (res.data === "details are not correct") {
        this.setState({ invalidDetails: "details are not correct" });
      } else {
        console.log("post after first render are", res.data);
        this.setState({ resArray: res.data });
        this.showPosts(this.state.resArray);
      }
    })



    const token = localStorage.getItem('token');
    this.setState({ currentToken: token });

    if (token) {
      this.setState({ logStatus: "LOG OUT" });
      axios.post('http://localhost:3030/verifytoken', { token: token }).then((res) => {
        console.log("token response is", res.data);
        this.setState({ currentUser: res.data[0].username });
        this.setState({ currentUserId: res.data[0]._id });
      })
    } else {
      this.setState({ logStatus: "LOG IN" });
    }


  }
  letsCheck = () => {
    if (this.state.booleanForDrop === true) {
      this.setState({ myDiv: "" ,  booleanForDrop: false })
    } else if (this.state.booleanForDrop === false) {
      this.setState({booleanForDrop: true ,  myDiv: <MyDrop send={this.getResponseFromMongo} nextPost={this.showPosts} nextArray={this.state.addCategoryResponse} postedBy={this.state.currentUserId} token={this.state.currentToken} /> })
    }
  }


  sendingFromAxiosforCategory = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("category", this.state.addCategory);
    formdata.append("image", this.state.categoryImage);
    formdata.append('token', this.state.currentToken);
    console.log("form is submitted", JSON.stringify(formdata));
    if (this.state.categoryImage != null) {
      axios.post('http://localhost:3030/addcategory', formdata).then((res) => {
        console.log("response after uploading a category is", res.data);
        if (res.data === "details are not correct") {
          this.setState({ invalidDetails: "details are not correct" });
        } else if (res.data === "invalid token") {
          this.setState({ invalidDetails: "please login first" });
        } else {
          this.setState({ addCategoryResponse: res.data })
        }
      })
    }
    else {
      alert("please chose an image");
    }
  }


  letChangeData = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onDrop = (acceptedFiles) => {
    this.setState({ categoryImage: acceptedFiles[0] });
  };


  customCategory = (
    <div>
      <form onSubmit={this.sendingFromAxiosforCategory}>
        <input type="text" placeholder="enter your category" name="addCategory" onChange={this.letChangeData} />
        <Dropzone name="image" onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className="container">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} name="image" style={this.styleForCategoryDropzone} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button type="submit">add</button>
      </form>
    </div>
  )

  letsCheckAgain = () => {
    if (this.state.booleanForCategory === false) {
      this.setState({ myNewDiv: this.customCategory })
      this.setState({ booleanForCategory: true })
    } else if (this.state.booleanForCategory === true) {
      this.setState({ myNewDiv: "" })
      this.setState({ booleanForCategory: false })
    }
  }


  getResponseFromMongo = (value) => {
    this.setState({ resArray: value })
  }

  showPosts = (myvar = this.state.resArray) => {
    console.log("data at the time of showing post is", myvar);

    let i;
    var a = [], b = [], c = [], d = [], f = [], g = [], h = [], j = [];
    for (i = 0; i < myvar.length; i++) {
      a[i] = myvar[i].image.filename;
      b[i] = myvar[i].Description;
      c[i] = myvar[i].category;
      f[i] = myvar[i].time.slice(4, 15);
      g[i] = myvar[i].time.slice(16, 24);
      h[i] = myvar[i]._id;
      j[i] = myvar[i].postedBy.username;
    }

    this.setState({ fileNameArray: a });
    this.setState({ DescriptionArray: b });
    this.setState({ categoryArray: c });
    this.setState({ timeArray: d });
    this.setState({ showTime: f });
    this.setState({ showDate: g });
    this.setState({ idArray: h });
    this.setState({ postedByArray: j });
  }



  mystyle = {
    height: 20,
    width: 20,
    float: "left",
  }
  mystyleforbutton = {
    height: 35,
    width: 323,
    fontSize: 20,
  }

  styleForCategoryDropzone = {
    height: 40,
    width: 200,
  }

  styleForText = {
    marginLeft: -120,
    color: "black",
  }

  changedataforcategory = (e) => {
    this.setState({ categoryValue: e.currentTarget.id });
    var anarr = this.state.resArray;
    var newarray = anarr.filter((find) => {
      return find.category == e.currentTarget.id;
    })
    this.showPosts(newarray);
  }

  styleForNextButton = {
    marginLeft: 500,
  }

  getNextPosts = (e) => {
    axios.post('http://localhost:3030/reterivepost', { skippedPost: this.state.recordedPost + 10 }).then((res) => {
      console.log("next 10 posts are", res.data);
      this.setState({ resArray: res.data });
      this.showPosts(this.state.resArray);
      window.scroll(0, 0);
    })
  }

  getPreviousPosts = (e) => {
    axios.post('http://localhost:3030/reterivepost', { skippedPost: this.state.recordedPost }).then((res) => {
      console.log("previous 10 posts are", res.data);
      this.setState({ resArray: res.data });
      this.showPosts(this.state.resArray);
      window.scroll(0, 0);
    })
  }

  handleToken = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("please login first");
      e.preventDefault();
      this.props.history.push('/posts');
    }
  }

  handleLogOut = () => {
    localStorage.clear();
  }

  changeFlagBoolean = (e) => {
    this.setState({ flagBoolean: e.target.checked });
    if (this.state.flagBoolean === false) {
      axios.post('http://localhost:3030/getFlaggedPost', { user: this.state.currentUserId }).then((res) => {
        console.log(res.data);
        this.setState({ resArray: res.data[0].flag })
        this.showPosts(res.data.flag);
        let temp = [];
        for (let i = 0; i < res.data[0].flag.length; i++) {
          temp[i] = res.data[0].username;
        }
        this.setState({ postedByArray: temp });
      })
    } else {
      axios.post('http://localhost:3030/reterivepost', { skippedPost: this.state.recordedPost }).then((res) => {
        if (res.data === "details are not correct") {
          this.setState({ invalidDetails: "details are not correct" });
        } else {
          console.log("post after first render are", res.data);
          this.setState({ resArray: res.data });
          this.showPosts(this.state.resArray);
        }
      })
    }
  }



  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" href="#">PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="images/pic_small.png" /></div>
                <div className="pro_txt">{this.state.currentUser}<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><a tabIndex={-1} href="#">My Profile</a></li>
                  <li><a tabIndex={-1} href="#">Message Box</a></li>
                  <div onClick={this.handleLogOut}><li><Link to='/login'>{this.state.logStatus}</Link></li></div>
                  <li className="divider" />
                  <li><a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a></li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active"> <Link to='/posts'>Home</Link> </li>
                  {/* <li className> <a href = "#">E-Coupons</a> </li>
                    <li className> <a href = "#">E-Brands</a> </li>
                    <li className> <a href = "#">Resuse Market</a> </li> */}
                  <div onClick={this.handleLogOut}><li > <Link to="/login" >{this.state.logStatus}</Link> </li></div>
                </ul>
              </div>
            </div>
          </div>
        </div>
       <Header />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <button className="rght_btn" onClick={this.letsCheck}><span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span > <a>Upload Post</a> </button>
              <div>{this.state.myDiv}</div>
              <button className="rght_btn" onClick={this.letsCheckAgain}> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a>Add category</a> </button>
              <div>{this.state.myNewDiv}</div>
              <h5>{this.state.invalidDetails}</h5>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    {this.state.addCategoryResponse.map((k, s) =>
                      <button style={this.mystyleforbutton} id={this.state.addCategoryResponse[s].category} onClick={this.changedataforcategory}><a style={this.styleForText}><span className="list_icon"><img style={this.mystyle} src={"http://localhost:3030/" + this.state.addCategoryResponse[s].image.filename} /></span>{this.state.addCategoryResponse[s].category}</a></button>
                    )}
                  </ul>
                </div>
              </div>
              {/* {/* <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                {/* <div className="list_1">
                  <ul>
                    <li>
                        <input type="checkbox" className="chk_bx" />
                        Friends</li> 
                    <li>
                      <input type="checkbox" className="chk_bx" checked={this.state.flagBoolean} onChange={this.changeFlagBoolean} onClick={this.getFlaggedPost} />
                      Flaged</li>
                    <h5>{this.state.flagBoolean.toString()}</h5>
                  </ul>
                </div> */}
                {/* <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/pic.png" />
                      <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">{this.state.currentUser}</div>
                          </li>
                          <li>
                              <div className="div_name1">Sex :</div>
                              <div className="div_name2">Female</div>
                            </li>
                          <li>
                              <div className="div_name1">Description :</div>
                              <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                                or sub comments as you like and manage all of your content inside Account.</div>
                            </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                      <ul>
                        <li><a href="#" className="active">Timeline    </a></li>
                        <li><a href="#">About  </a></li>
                        <li><a href="#">Album</a></li>
                        <li><a href="#"> Pets</a></li>
                        <li><a href="#">My Uploads </a></li>
                      </ul>
                    </div>
                </div> */}
              </div>
              {this.state.fileNameArray.map((k, s) =>
                <Link to={`/singlepost/${this.state.idArray[s]}`} onClick={this.handleToken} >
                  <div className="contnt_2">
                    <div className="div_a">
                      <div className="div_title">{this.state.DescriptionArray[s]}</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{this.state.categoryArray[s]}</div>
                      </div>
                      <div className="div_top">
                        <div className="div_top_lft"><img src="images/img_6.png" />{this.state.postedByArray[s]}</div>
                        <div className="div_top_rgt"><span className="span_date">{this.state.showDate[s]}</span><span className="span_time">{this.state.showTime[s]}</span></div>
                      </div>
                      <div className="div_image"><img src={"http://localhost:3030/" + this.state.fileNameArray[s]} alt="pet" /></div>
                      <div className="div_btm">
                        <div className="btm_list">
                          <ul>
                            <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                            <li><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</li>
                            <li><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</li>
                            <li><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>Comments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <button style={this.styleForNextButton} onClick={this.getNextPosts}>Next</button>
            <button style={this.styleForNextButton} onClick={this.getPreviousPosts}>Back</button>
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

class MyDrop extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      Description: "",
      category: "",
      time: new Date,
      err: [],
      reterivepost: null,
      invalidDetails: "",
      postedBy: "",
      skippedPost: 0,
      currentToken: "",
    };
  }

  componentDidMount() {
    this.setState({ currentToken: this.props.token });
  }

  changingData = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ image: acceptedFiles[0] });
  };


  sendingFromAxios = (e) => {
    e.preventDefault();
    this.handleSubmitButton();
    var formdata = new FormData();
    this.newMethod(formdata);
    // if(this.state.currentToken !== null){
    if (this.state.image != null) {
      console.log("form is submitted", formdata);
      axios.post('http://localhost:3030/upload', formdata).then((res) => {
        console.log("response afer uploading an image is ", res.data);
        if (res.data === "details are not correct") {
          this.setState({ invalidDetails: res.data });
        } else if (res.data === "invalid token") {
          this.setState({ invalidDetails: 'please login first' });
        } else {
          this.setState({ err: res.data });
          this.props.send(res.data);
          this.props.nextPost();
        }
      })
    } else {
      alert("please choose an image");
    }
  }


  handleSubmitButton = () => {
    this.setState({ time: new Date });
  }


  newMethod(formdata) {
    formdata.append("image", this.state.image);
    formdata.append("Description", this.state.Description);
    formdata.append("category", this.state.category);
    formdata.append("time", this.state.time);
    formdata.append('postedBy', this.props.postedBy);
    formdata.append('skippedPost', this.state.skippedPost);
    formdata.append('token', this.props.token)
  }
  styleForImageDropzone = {
    height: 40,
    width: 200,
  }

  render() {

    return (
      <form onSubmit={this.sendingFromAxios} encType="multipart/form-data">
        SELECT CATEGORY:
                <select name="category" onChange={this.changingData} required>
          <option hidden selected></option>
          {this.props.nextArray.map((x, s) =>
            <option>{this.props.nextArray[s].category}</option>
          )}
        </select><br />
        DESCRIPTION:<br />
        <input type="text" name="Description" onChange={this.changingData} required />
        <Dropzone name="image" onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className="container">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} name="image" style={this.styleForImageDropzone} />
                <p>Drag 'n' drop some files here, or click to select file</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button type="submit" >finish it</button>
        <h5>{this.state.invalidDetails}</h5>
      </form>
    );
  }
}

  // export default TimeLineComponent;