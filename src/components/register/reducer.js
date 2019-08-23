var initialState = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    err: "",
}

 var signUpReducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_FIRSTNAME_SIGUP') {
        state = { ...state, firstname: action.payload }
    } else if (action.type === 'CHANGE_LASTNAME_SIGNUP') {
        state = { ...state, lastname: action.payload }
    } else if (action.type === 'CHANGE_EMAIL_SIGNUP') {
        state = { ...state, email: action.payload }
    } else if (action.type === 'CHANGE_PASSWORD_SIGNUP') {
        state = { ...state, password: action.payload }
    } else if (action.type === 'GET_RESPONSE_SIGNUP') {
        state = { ...state, err: action.payload }
    } else if (action.type === 'CHANGE_USERNAME_SIGNUP') {
        state = { ...state, username: action.payload }
    } 
    return state;
}

export default signUpReducer;