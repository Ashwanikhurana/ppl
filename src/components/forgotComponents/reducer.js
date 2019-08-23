var initialState = {
    email: "",
    err: "",
}


 const forgotReducer = (state = initialState, action) => {
     if (action.type === 'CHANGE_EMAIL_FORGOT') {
        state = { ...state, email: action.payload }
    }  else if (action.type === 'GET_RESPONSE_FORGOT') {
        state = { ...state, err: action.payload }
    } 
    return state;
}

export default forgotReducer;