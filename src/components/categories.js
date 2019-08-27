import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Categories extends React.Component {
    categoryPost = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        axios.post('http://localhost:3030/post/sortcategory', { category: e.target.id }).then(res => {
            console.log(res.data);
            this.props.changePosts(res.data);
        })
    }
    render() {
        return (
            <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                    <ul>
                        {this.props.categories.map((category) =>
                            <button style={{ width: 323 }} onClick={this.categoryPost}><a id={category.category} style={{ color: "black", fontSize: 25, paddingRight: 100 }}><span className="list_icon"><img style={{ height: 25, width: 25, float: "left" }} src={"http://localhost:3030/" + category.image.filename} /></span>{category.category}</a></button>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        categories: state.timeLineReducer.categories,
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        changePosts: data => { dispatch({ type: "CHANGE_POSTS", payload: data }) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Categories);

