import React from 'react';
import SignUpComponent from './components/register';
import './App.css';
import LogInComponent from './components/login';
import TimeLineComponent from './components/timeline';
import SinglePostComponent from './components/singlepost';
import ForgotComponent from './components/forgot';
import ResetComponent from './components/reset';
import { Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <switch>
        <Route exact path="/" component={TimeLineComponent} />
        <Route path="/login" component={LogInComponent} />
        <Route path="/signup" component={SignUpComponent} />
        <Route path="/forgot" component={ForgotComponent} />
        <Route path="/reset/:email" component={ResetComponent} />
        <Route path= '/singlepost/:id' component={SinglePostComponent} />
       </switch>
    </div>
  );
}

export default App;
