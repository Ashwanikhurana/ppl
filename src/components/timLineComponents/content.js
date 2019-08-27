import React from 'react';
import PostUploadComponent from '../postUpload';
import NavBar from '../navbar';
import Footer from '../footer';
import Header from '../header';
import axios from 'axios';
import { connect } from 'react-redux';


class TimeLineComponent extends React.Component {

    componentDidMount() {

        const token = localStorage.getItem('token');


        axios.post('http://localhost:3030/post/reterivepost' , {page : this.props.page}).then((res) => {
            console.log("post after render are " , res.data);
            if (res.status !== 200) {
                alert(res.data)
            } else {
                this.props.changePosts(res.data);
            }
        })

        axios.get('http://localhost:3030/category/reterivecategory').then((res) => {
             console.log("category after render are " , res.data);
            if (res.status !== 200) {
                alert(res.data)
            } else {
                this.props.changeCategories(res.data);
            }
        })

        if (token) {
            axios.post('http://localhost:3030/verifytoken', { token: token }).then((res) => {
                console.log("token response is", res.data);
                this.props.changeUser(res.data[0]);
            })
        } else {
            alert("please login to view this page");
            this.props.history.push('/login');
        }

    }

    handlePost = (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('description', this.props.description)
        formdata.append('category', this.props.category)
        formdata.append('image', this.props.image)
        formdata.append('postedBy', this.props.user._id)
        if (this.props.image != null) {
            axios.post('http://localhost:3030/post/upload', formdata).then((res) => {
                console.log("response afer uploading an image is ", res.data);
                if (res.status !== 200) {
                    alert(res.data);
                } else {
                    this.props.changePosts(res.data);
                    alert("post uploaded successfully");
                }
            })
        } else {
            alert("please choose an image");
        }
    }

    handleCategory = (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('category', this.props.categoryAdd)
        formdata.append('image', this.props.categoryImage)
        console.log("handle category is called");
        if (this.props.categoryImage != null) {
            axios.post('http://localhost:3030/category/addcategory', formdata).then((res) => {
                console.log("response after uploading a category is", res.data);
                if (res.status !== 200) {
                    alert(res.data);
                } else {
                    this.props.changeCategories(res.data);
                    alert("category uploaded successfully")
                }
            })
        }
        else {
            alert("please chose an image");
        }
    }

    handlePagination = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3030/post/reterivepost', { page: this.props.page + 1 }).then((res) => {
            this.props.changePage(this.props.page + 1);
            console.log(res.data);
            this.props.changePosts(res.data);
            window.scrollTo(0, 0);
        })
    }

    handleLogOut = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <Header />
                <NavBar />
                <PostUploadComponent handlePost={this.handlePost} handleCategory={this.handleCategory} handlePagination={this.handlePagination} handleLogOut={this.handleLogOut} />
                <Footer />
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        description: state.timeLineReducer.description,
        category: state.timeLineReducer.category,
        image: state.timeLineReducer.image,
        posts: state.timeLineReducer.posts,
        user: state.timeLineReducer.user,
        categoryAdd: state.timeLineReducer.categoryAdd,
        categoryImage: state.timeLineReducer.categoryImage,
        categories: state.timeLineReducer.categories,
        page: state.timeLineReducer.page,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        changeDescription: data => { dispatch({ type: "CHANGE_DESCRIPTION", payload: data }) },
        changeCategory: data => { dispatch({ type: "CHANGE_CATEGORY", payload: data }) },
        changeImage: data => { dispatch({ type: "CHANGE_IMAGE", payload: data }) },
        changePosts: data => { dispatch({ type: "CHANGE_POSTS", payload: data }) },
        changeUser: data => { dispatch({ type: "CHANGE_USER", payload: data }) },
        changeCategories: data => { dispatch({ type: "GET_CATEGORIES", payload: data }) },
        changePage: data => { dispatch({ type: "CHANGE_PAGE", payload: data }) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeLineComponent);