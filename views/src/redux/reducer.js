import { combineReducers } from "redux"
import storageUtils from "../utils/storageUtils"
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG} from "./action-type";

/**
 * 用来管理里头部标题的reducer函数
 */
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle, action) {
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data

        default:
            return false
    }
}

//用来管理当前登录用户的reducer函数
const initUser = storageUtils.getUser();
function user(state=initUser, action) {
    switch(action.type) {
        case SHOW_ERROR_MSG:
            return {...state, errorMsg: action.data}
        case RECEIVE_USER:
            return action.data
        default:
            return state
    }
}

/**
 * 向外默认暴露的是合并产生的总的reducer函数
 *  管理总的state的结构
 * {
 *     headTitle: '首页',
 *     user: {}
 * }
 */
export default combineReducers({
    headTitle,
    user
})