import React from 'react'
import ReactDOM from "react-dom"; 

import App from "./app"
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memmoryUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(<App />, document.getElementById('root'))