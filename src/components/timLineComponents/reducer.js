var initialState = {
    tempBoolean: false,
    uploadComponent: null,
    category: "",
    description: "",
    image: null,
    posts: [],
}

var timeLineReducer = (state = initialState, action) => {
    if (action.type === "CHANGE_UPLOAD_BUTTON") {
        state = { ...state, uploadComponent: action.payload }
    } else if (action.type === "CHANGE_TEMP_BOOLEAN") {
        state = { ...state, tempBoolean: action.payload }
    } else if (action.type === "CHANGE_CATEGORY") {
        state = { ...state, category: action.payload }
    } else if (action.type === "CHANGE_DESCRIPTION") {
        state = { ...state, description: action.payload }
    } else if (action.type === "CHANGE_IMAGE") {
        state = { ...state, image: action.payload }
    } else if (action.type === "CHANGE_POSTS") {
        let post = [...state.posts, action.payload]
        state = { ...state, posts: post[0] }
    }
    return state;
}

export default timeLineReducer;