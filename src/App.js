import React from 'react';
import SignUpComponent from './components/register/register';
import './App.css';
import LogInComponent from './components/login/login';
import TimeLineComponent from './components/timLineComponents/content';
import SinglePostComponent from './components/singlePostComponents.js/post';
import ForgotComponent from './components/forgotComponents/forgot';
import ResetComponent from './components/resetComponents/reset';
import { Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <switch> */}
        <Route exact path="/" component={SignUpComponent} />
        <Route exact path="/" component={TimeLineComponent} />
        <Route path="/login" component={LogInComponent} />
        <Route path="/posts" component={TimeLineComponent} />
        <Route path="/forgot" component={ForgotComponent} />
        <Route path="/reset/:email" component={ResetComponent} />
        <Route path= '/post/singlepost:id' component={SinglePostComponent} />
      {/* </switch> */}
    </div>
  );
}

export default App;
