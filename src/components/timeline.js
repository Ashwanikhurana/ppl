import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom';


class TimeLineComponent extends React.Component{
    constructor(){
        super() 
            this.state = {
                booleanForDrop : false,
                myDiv : "",
                resarray : [],
                Descriptionarray : [],
                categoryarray : [],
                timearray : [],
                filenamearray : [],
                booleanForCategory : false,
                meNeWDiv : "",
                addCategory : "",
                addCategoryResponse : [],
                showtime : "",
                showdate : "",
                logdata : "",
                booleanforlogdata : false,
                liveuser : "Guest",
                idarray : [],
                categoryimage : null,
                categoryvalue : "",
                tempstate : [],
            }
        }
        
        
        componentDidMount() {
          axios.get('http://localhost:3030/reterivecategory').then((res) => {
            console.log(res.data);
             this.setState({addCategoryResponse : res.data})
          });

          axios.get('http://localhost:3030/reterivepost').then((res) => {
            this.setState({resarray : res.data});
            this.showPosts(this.state.resarray);
          })
          
          const user = localStorage.getItem('username');
          this.setState({liveuser : user});
        }
    
    
        letsCheck = () => {
            if(this.state.booleanForDrop === true){
                this.setState({myDiv : ""})
                this.setState({booleanForDrop : false})
            }else if(this.state.booleanForDrop === false){
            this.setState({myDiv : <MyDrop send = {this.getResponseFromMongo} nextPost = {this.showPosts} nextArray = {this.state.addCategoryResponse}/>})
                this.setState({booleanForDrop : true})
            }
        }

        
        sendingFromAxiosforCategory = (e) => {
          e.preventDefault();
          console.log("i am calles", this.state.categoryimage);
          var formdata = new FormData();
          formdata.append("category" , this.state.addCategory);
          formdata.append("image" , this.state.categoryimage);
          console.log("form is submitted" , JSON.stringify(formdata));
          axios.post('http://localhost:3030/addcategory' , formdata).then((res) => {
            console.log(res.data);
             this.setState({addCategoryResponse : res.data})
          })
        }


        onDrop = (acceptedFiles) => {
          console.log("on drop f")
          this.setState({categoryimage : acceptedFiles[0]});
        };

        customCategory = (
          <div>
            <form onSubmit = {this.sendingFromAxiosforCategory}>
            <input type = "text" placeholder = "enter your category" name = "addCategory" onChange = {this.letChangeData} required/>
            <Dropzone name = "image" onDrop={this.onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} name = "image" />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone>
                <button type = "submit">add</button>
            </form>
          </div>
        )

        letsCheckAgain = () => {
          if(this.state.booleanForCategory === false){
            this.setState({myNewDiv : this.customCategory})
            this.setState({booleanForCategory : true})
          }else if(this.state.booleanForCategory === true){
            this.setState({myNewDiv : ""})
            this.setState({booleanForCategory : false})
          }
        }

 
        showPosts = (myvar = this.state.resarray) => {
          let i;
          var a = [] , b = [] , c = [] , d = [] ,f = [] , g = [] , h = [];
          for(i=0;i<myvar.length;i++){
             a[i] = myvar[i].image.filename;
             b[i] = myvar[i].Description;
             c[i] = myvar[i].category;
             f[i] = myvar[i].time.slice(4 , 15);
             g[i] = myvar[i].time.slice(16 , 24);
             h[i] = myvar[i]._id;
          }
          this.setState({filenamearray : a.reverse()});
          this.setState({Descriptionarray : b.reverse()});
          this.setState({categoryarray : c.reverse()});
          this.setState({timearray : d.reverse()});
          this.setState({showtime : f.reverse()});
          this.setState({showdate : g.reverse()});
          this.setState({idarray : h.reverse()});
          console.log("filenemrarray is" ,this.state.filenamearray);
        }

        mystyle = {
          height : 20,
          width: 20,
        }

        changedataforcategory = (e) => {
          this.setState({categoryvalue : e.currentTarget.id});
          var anarr = this.state.resarray;
          var newarray = anarr.filter((find) => {
            return find.category == e.currentTarget.id; 
          })
          console.log(newarray);
          this.showPosts(newarray);
        }
        
        letChangeData = (e) => {
          this.setState({[e.target.name] : e.target.value})
        }

        getResponseFromMongo = (value) => {
          this.setState({resarray : value})
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
                <a className="brand" href>PPL</a>
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="images/pic_small.png" /></div>
                  <div className="pro_txt">{this.state.liveuser}<b className="caret" /></div>
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
                    <li className="active"> <Link>Home</Link> </li>
                    <li className> <a href = "#">E-Coupons</a> </li>
                    <li className> <a href = "#">E-Brands</a> </li>
                    <li className> <a href = "#">Resuse Market</a> </li>
                    <li className> <a href= "#">Lost and Found</a> </li>
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
              <div className="flag_div"><img src="images/flag.png" /></div>
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
              <div className="info_div">
                <div className="image_div"> <img src="images/pic.png" /> </div>
                <div className="info_div1">{this.state.liveuser}</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="rght_btn" > <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span  className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span > <a  onClick = {this.letsCheck}>Upload Post</a> </div>
                <div>{this.state.myDiv}</div>
                <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a onClick = {this.letsCheckAgain}>Add category</a> </div>
                <div>{this.state.myNewDiv}</div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <div className="rght_list">
                    <ul>
                      {this.state.addCategoryResponse.map( (k ,s) => 
                        <li id = {this.state.addCategoryResponse[s].category} onClick = {this.changedataforcategory}><a><span className="list_icon"><img style = {this.mystyle} src = {"http://localhost:3030/" + this.state.addCategoryResponse[s].image.filename}/></span>{this.state.addCategoryResponse[s].category}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
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
                </div>
              </div>
              <div className="content_lft">
                <div className="contnt_1">
                  <div className="list_1">
                    <ul>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Friends</li>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Flaged</li>
                    </ul>
                  </div>
                  <div className="timeline_div">
                    <div className="timeline_div1">
                      <div className="profile_pic">
                        <img src="images/timeline_img1.png" />
                        <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                      </div>
                      <div className="profile_info">
                        <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                        <div className="profile_form">
                          <ul>
                            <li>
                              <div className="div_name1">Name :</div>
                              <div className="div_name2">Stefiney Gibbs</div>
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
                  </div>
                </div>
                <div id = "show">
                  {this.state.filenamearray.map((k , s) =>
                <Link  to = {`/singlepost/${this.state.idarray[s]}`} >
                <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">{this.state.Descriptionarray[s]}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{this.state.categoryarray[s]}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft"><img src="images/img_6.png" />{this.state.liveuser}</div>
                      <div className="div_top_rgt"><span className="span_date">{this.state.showdate[s]}</span><span className="span_time">{this.state.showtime[s]}</span></div>
                    </div>
                    <div className="div_image"><img src ={"http://localhost:3030/" + this.state.filenamearray[s]}  alt="pet" /></div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                          <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
                  )}
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
        Description : "",
        category : "",
        time :  new Date,
        err : [],
        reterivepost : null,
      };
    }

    
    changingData = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }


    onDrop = (acceptedFiles , rejectedFiles) => {
        this.setState({image : acceptedFiles[0]});
    };

    
    sendingFromAxios = (e) => {
        e.preventDefault();
        this.handleSubmitButton();
        var formdata = new FormData();
        this.newMethod(formdata);
        axios.post('http://localhost:3030/upload' , formdata ).then((res) => {
            this.setState({err : res.data});
            this.props.send(res.data);
            if(this.state.image != null){
            this.props.nextPost();
            }else{
              alert("please choose an image");
            }
        })
    }
 

    handleSubmitButton = () => {
        this.setState({time : new Date});
    }
  

    newMethod(formdata) {
        formdata.append("image" , this.state.image);
        formdata.append("Description", this.state.Description);
        formdata.append("category", this.state.category);
        formdata.append("time", this.state.time);
    }

    render() {
      return (
          <form onSubmit = {this.sendingFromAxios} encType="multipart/form-data"> 
                SELECT CATEGORY:
                <select name = "category" onChange = {this.changingData} required>
                  <option></option>
                  {this.props.nextArray.map( (x , s) =>
                    <option>{this.props.nextArray[s].category}</option>
                  )}
                </select><br />
            DESCRIPTION:<br />
            <input type ="text" name = "Description" onChange = {this.changingData} required/>
                <Dropzone name = "image" onDrop={this.onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} name = "image" />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone>
                <button type = "submit" >finish it</button>
        </form>
      );
    }
  }
  
  export default TimeLineComponent;
