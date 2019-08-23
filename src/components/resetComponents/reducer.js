var initialState = {
    newPassword: "",
    confirmPassword : "",
    err: "",
}

 var resetReducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_PASSWORD_RESET') {
        state = { ...state, newPassword: action.payload }
    }  else if (action.type === 'CHANGE_CONFIRM_PASSWORD_RESET') {
        state = { ...state, confirmPassword: action.payload }
    } else if (action.type === 'GET_RESPONSE_RESET') {
        state = { ...state, err: action.payload }
    }
    return state;
}

export default resetReducer;