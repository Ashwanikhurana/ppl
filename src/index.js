import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers , applyMiddleware} from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import signUpReducer from "./components/register/reducer";
import loginReducer from "./components/login/reducer";
import forgotReducer from "./components/forgotComponents/reducer";
import resetReducer from "./components/resetComponents/reducer";
import timeLineReducer from "./components/timLineComponents/reducer";
import singlePostReducer from "./components/singlePostComponents/reducer";
import thunk from "redux-thunk";

var myreducer = combineReducers({
  signUpReducer: signUpReducer,
  loginReducer: loginReducer,
  forgotReducer: forgotReducer,
  resetReducer: resetReducer,
  timeLineReducer: timeLineReducer,
  singlePostReducer: singlePostReducer,
});

var store = createStore(myreducer , applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
