import React from 'react';
import PostUploadComponent from '../postUpload';
import NavBar from '../navbar';
import Footer from '../footer';
import Header from '../header';
import AddCategoryComponent from '../addCategory';
import Categories from '../categories';
import OnlyPostUploadComponent from '../onlyPostUpload';

class SinglePostComponent extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <NavBar />
                
                <OnlyPostUploadComponent/>
                <Footer />
            </div>
        )
    }
}

export default SinglePostComponent;