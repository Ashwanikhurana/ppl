import React from "react";
import SignUpComponent from "./components/register/register";
import "./App.css";
import LogInComponent from "./components/login/login";
import TimeLineComponent from "./components/timLineComponents/content";
import SinglePostComponent from "./components/singlePostComponents/content";
import ForgotComponent from "./components/forgotComponents/forgot";
import ResetComponent from "./components/resetComponents/reset";
import { Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Route exact path="/" component={SignUpComponent} />
      <Route path="/login" component={LogInComponent} />
      <Route path="/posts" component={TimeLineComponent} />
      <Route path="/forgot" component={ForgotComponent} />
      <Route path="/reset/:email" component={ResetComponent} />
      <Route path="/singlepost/:id" component={SinglePostComponent} />
      <Footer />
    </div>
  );
}

export default App;
