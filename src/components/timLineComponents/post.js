import React from 'react';
import { connect } from 'react-redux';

class PostComponent extends React.Component {

    render() {
        console.log("post is rendered")
        console.log("from post component", this.props.posts);

        return (
            <div>
                {this.props.posts.map(post => (
                    <div className="contnt_2">
                        <div className="div_a">
                            <div className="div_title">{post.description}</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">{post.category}</div>
                            </div>
                            <div className="div_top">
                                <div className="div_top_lft"><img src="images/img_6.png" />postedby</div>
                                <div className="div_top_rgt"><span className="span_date">date</span><span className="span_time">time</span></div>
                            </div>
                            <div className="div_image"><img src={"http://localhost:3030/" + post.image.filename} alt="pet" /></div>
                            <div className="div_btm">
                                <div className="btm_list">
                                    <ul>
                                        {/* <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li> */}
                                        <li><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</li>
                                        <li><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</li>
                                        <li><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>Comments</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
var mapStateToProps = (state) => {
    return {
        tempBoolean: state.timeLineReducer.tempBoolean,
        uploadComponent: state.timeLineReducer.uploadComponent,
        posts: state.timeLineReducer.posts
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        updateUploadButton: data => { dispatch({ type: "CHANGE_UPLOAD_BUTTON", payload: data }) },
        updateTempBoolean: data => { dispatch({ type: "CHANGE_TEMP_BOOLEAN", payload: data }) },
        changePosts: data => { dispatch({ type: "CHANGE_POST", payload: data }) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);

