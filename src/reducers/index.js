var initialState = {
    username : "",
    firstname : "",
    lastname : "",
    email : "",
    password : "",
    err : "",
}


export const myreducer = (state = initialState , action) => {
    if(action.type === 'CHANGE_FIRSTNAME'){
     state = {...state, firstname:action.payload }
    }else if(action.type === 'CHANGE_LASTNAME'){
     state = {...state, lastname:action.payload }
    }else if(action.type === 'CHANGE_EMAIL'){
     state = {...state, email:action.payload }
    }else if(action.type === 'CHANGE_PASSWORD'){
     state = {...state, password:action.payload }
    }else if(action.type === 'GET_RESPONSE'){
        state = {...state , err : action.payload}
    }else if(action.type === 'CHANGE_USERNAME'){
        state = {...state , username : action.payload}
    }
    return state;
 }