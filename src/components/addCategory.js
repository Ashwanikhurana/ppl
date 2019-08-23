import React from 'react';

class AddCategoryComponent extends React.Component {
    render() {
        return (
            <div>
                <button className="rght_btn" > <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a>Add category</a> </button>
            </div>
        )
    }
}

export default AddCategoryComponent;