import { combineReducers } from "redux"
import storageUtils from "../utils/storageUtils"

/**
 * 用来管理里头部标题的reducer函数
 */
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle, action) {
    switch(action.type){
        default:
            return false
    }
}

//用来管理当前登录用户的reducer函数
const initUser = storageUtils.getUser();
function user(state=initUser, action) {
    switch(action.type) {
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