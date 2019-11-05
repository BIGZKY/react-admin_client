import React from 'react'
import ReactDOM from "react-dom"; 
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./app"
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memmoryUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))