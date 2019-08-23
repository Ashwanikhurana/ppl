import React from 'react';

class Categories extends React.Component {
    render() {
        return (
            <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                    <ul>
                        {/* {this.state.addCategoryResponse.map((k, s) =>
                                        <button style={this.mystyleforbutton} id={this.state.addCategoryResponse[s].category} onClick={this.changedataforcategory}><a style={this.styleForText}><span className="list_icon"><img style={this.mystyle} src={"http://localhost:3030/" + this.state.addCategoryResponse[s].image.filename} /></span>{this.state.addCategoryResponse[s].category}</a></button>
                                    )} */}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Categories;