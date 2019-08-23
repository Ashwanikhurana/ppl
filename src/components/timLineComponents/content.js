import React from 'react';
import PostUploadComponent from '../postUpload';
import NavBar from '../navbar';
import Footer from '../footer';
import Header from '../header';
import axios from 'axios';
import { connect } from 'react-redux';


class TimeLineComponent extends React.Component {

    componentDidMount() {
        axios.post('http://localhost:3030/reterivepost').then((res) => {
            console.log(res.data);
            this.props.changePosts([...res.data]);
        })
    }

    handlePost = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append('description', this.props.description)
        formdata.append('category', this.props.category)
        formdata.append('image', this.props.image)
        if (this.props.image != null) {
            axios.post('http://localhost:3030/upload', formdata).then((res) => {
                console.log("response afer uploading an image is ", res.data);
                this.props.changePosts(res.data);
                // console.log("posts in redux is", this.props.posts);
            })
        } else {
            alert("please choose an image");
        }
    }
    render() {
        console.log("content js was rendered");
        return (
            <div>
                <Header />
                <NavBar />
                <PostUploadComponent handlePost={this.handlePost} />
                <Footer />
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    // console.log("state in map state to props", state);
    return {
        description: state.timeLineReducer.description,
        category: state.timeLineReducer.category,
        image: state.timeLineReducer.image,
        post: state.timeLineReducer.post,
        posts: state.timeLineReducer.posts,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        changeDescription: data => { dispatch({ type: "CHANGE_DESCRIPTION", payload: data }) },
        changeCategory: data => { dispatch({ type: "CHANGE_CATEGORY", payload: data }) },
        changeImage: data => { dispatch({ type: "CHANGE_IMAGE", payload: data }) },
        changePost: data => { dispatch({ type: "CHANGE_POST", payload: data }) },
        changePosts: data => { dispatch({ type: "CHANGE_POSTS", payload: data }) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeLineComponent);