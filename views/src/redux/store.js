import { createStore } from "redux";

import reducer from "../redux/reducer";
/**
 * createStore 需要传的参数是reduceer 
 * 
 * 创建store对象内部会第一次调用reducer()  得到初始状态值
 */
export default createStore(reducer)