import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {myreducer} from './reducers/index';
import {BrowserRouter} from 'react-router-dom';

var  store = createStore(myreducer);

ReactDOM.render(<BrowserRouter> <Provider store = {store}><App /> </Provider> </BrowserRouter>, document.getElementById('root'));


serviceWorker.unregister();
