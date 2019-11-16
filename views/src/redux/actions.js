import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG} from "./action-type";
import { reqLogin } from "../api/index";
import storageUtils from "../utils/storageUtils";
import memmoryUtils from "../utils/memmoryUtils";

export const set_headTitle = (headTitle) => ({type:SET_HEAD_TITLE, data: headTitle})

//登陆的同步action
export const receive_user = (user) => ({type: RECEIVE_USER, data: user})
//登陆失败同步action
export const show_errorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, data: errorMsg})

//登陆的异步action
export const login = (username, password) => {
    return async dispatch => {
        //执行异步ajax请求
        const res = reqLogin(username, password)
        //成功，分发同步action
        if(res.status == 1){

            const user = res.data;
            storageUtils.saveUser(user);
            dispatch(receive_user(user));
        }else{//失败，分发失败的action
            const msg = res.msg;
            dispatch(show_errorMsg(msg))
        }
        
    }
}