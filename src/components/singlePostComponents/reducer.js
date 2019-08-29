const initialState = {
  post: {},
  imageName: "",
  likeStatus: "",
  loggedUser : {},
  comment : "",
  temp : "",
  flagStatus : "",
};

const singlePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POST":
      state = { ...state, post: action.payload };
      break;
    case "SET_IMAGE_NAME":
      state = { ...state, imageName: action.payload };
      break;
    case 'SET_LIKE_STATUS':
        state = {...state , likeStatus : action.payload};
        break;
    case 'SET_LOGGED_USER':
        state = {...state , loggedUser : action.payload};
        break;
    case 'SET_COMMENT' :
        state = {...state , comment : action.payload};
        break;
    case 'SET_FLAG' :
      state = {...state , flagStatus : action.payload};
      break;
    default:
      return state;
  }
  return state;
};

export default singlePostReducer;
