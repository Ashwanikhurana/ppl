var initialState = {
    email: "",
    password: "",
    err: "",
}


 const loginReducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_EMAIL_LOGIN') {
        state = { ...state, email: action.payload }
    } else if (action.type === 'CHANGE_PASSWORD_LOGIN') {
        state = { ...state, password: action.payload }
    } else if (action.type === 'GET_RESPONSE_LOGIN') {
        state = { ...state, err: action.payload }
    }  
    return state;
}

export default loginReducer;