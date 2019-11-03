import React from "react"
import { render } from "react-dom"

import App from "./app";
import store from "./redux/store";

render(
    <App store = {store}/>,
    document.getElementById('root')
)
/**
 * 对store内数据 监听数据变化  subscripe
 */

 store.subscribe(()=>{
    render(
        <App store = {store}/>,
        document.getElementById('root')
    )
 })