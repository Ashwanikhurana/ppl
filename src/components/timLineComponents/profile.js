import React from 'react';
import PostComponent from './post';
import {connect} from 'react-redux';

class ProfileComponent extends React.Component {
    render() {
        return (
            <div className="content_lft">
                <div className="contnt_1">
                    <div className="list_1">
                        <ul>
                            {/* <li>
                                <input type="checkbox" className="chk_bx" />
                                Friends</li> */}
                            <li>
                                <input type="checkbox" className="chk_bx"   />
                                Flaged</li>
                            {/* <h5>{this.state.flagBoolean.toString()}</h5> */}
                            <div className="timeline_div">
                                <div className="timeline_div1">
                                    <div className="profile_pic">
                                        <img src="images/pic.png" />
                                        {/* <div className="profile_text"><a href="#">Change Profile Pic</a></div> */}
                                    </div>
                                    <div className="profile_info">
                                        <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                                        <div className="profile_form">
                                            <ul>
                                                <li>
                                                    <div className="div_name1">Name :</div>
                                                    <div className="div_name2">kuch bhi</div>
                                                </li>
                                                {/* <li>
                                                    <div className="div_name1">Sex :</div>
                                                    <div className="div_name2">Female</div>
                                                </li> */}
                                                {/* <li>
                                                    <div className="div_name1">Description :</div>
                                                    <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                                or sub comments as you like and manage all of your content inside Account.</div>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="timeline_div2">
                                    <ul>
                                        <li><a href="#" className="active">Timeline    </a></li>
                                        <li><a href="#">About  </a></li>
                                        <li><a href="#">Album</a></li>
                                        <li><a href="#"> Pets</a></li>
                                        <li><a href="#">My Uploads </a></li>
                                    </ul>
                                </div> */}
                            </div>
                        </ul>
                    </div>
                </div>
                <PostComponent/>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        description : state.timeLineReducer.description,
        category : state.timeLineReducer.category,
        image : state.timeLineReducer.image,
        posts : state.timeLineReducer.posts
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        changeDescription : data => {dispatch({type : "CHANGE_DESCRIPTION" , payload : data})},
        changeCategory : data => {dispatch({type : "CHANGE_CATEGORY" , payload : data})},
        changeImage : data => {dispatch({type : "CHANGE_IMAGE" , payload : data})},
        changePosts : data => {dispatch({type : "CHANGE_POST" , payload : data})},
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProfileComponent);

