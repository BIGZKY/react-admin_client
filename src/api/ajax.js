/**
 * 能发送异步ajax请求的杉树模块
 * 封装axios
 * 函数的额返回值是promise对象
 */

 import axios from "axios";

 export default function ajax(url, data={}, type="GET") {
    if(type==='GET') {
        return axios.get(url, {  //params get请求的配置对象 固定名称
            params: data 
        })
    } else { //发post 请求
        return axios.post(url, data);
    }
 }