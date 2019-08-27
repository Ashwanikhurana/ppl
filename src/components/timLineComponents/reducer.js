var initialState = {
    tempBoolean: false,
    uploadComponent: null,
    category: "",
    description: "",
    image: null,
    posts: [],
    user: "",
    tempBoolean1: false,
    addCategoryComponent: null,
    categoryAdd: "",
    categoryImage: null,
    categories: [],
    page : 1,
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
        state = { ...state, posts: action.payload }
    } else if (action.type === "CHANGE_USER") {
        state = { ...state, user: action.payload }
    } else if (action.type === 'CHANGE_TEMP_BOOLEAN1') {
        state = { ...state, tempBoolean1: action.payload }
    } else if (action.type === 'CHANGE_CATEGORY_BUTTON') {
        state = { ...state, addCategoryComponent: action.payload }
    } else if (action.type === 'ADD_CATEGORY') {
        state = { ...state, categoryAdd: action.payload }
    } else if (action.type === 'CHANGE_CATEGORY_IMAGE') {
        state = { ...state, categoryImage: action.payload }
    } else if (action.type === 'GET_CATEGORIES') {
        state = { ...state, categories: action.payload }
    } else if (action.type === 'CHANGE_PAGE') {
        state = {...state , page : action.payload}
    } else if(action.type === 'CHANGE_POST_COUNT') {
        state = {...state , postCount : action.payload}
    } 
    return state;
}

export default timeLineReducer;