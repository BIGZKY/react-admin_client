/**
 * 能发送异步ajax请求的杉树模块
 * 封装axios
 * 函数的额返回值是promise对象
 */

 import axios from "axios";
 import {message} from "antd";

 //统一进行错误处理  在外层创建一个promise 对象
 export default function ajax(url, data={}, type="GET") {
    
    return new Promise((resolve,reject) => {
        let promise
        // 1.执行异步ajax请求
        if(type === 'GET'){ //发GET请求
            promise = axios.get(url, {
                params: data 
            })
        } else {
            promise = axios.post(url,data);
        }
        
        //如果成功了, 调用resolve(value);
        promise.then(response => {
            resolve(response.data)

        }).catch (error => {
            message.error('请求出错了: '+ error.message)
        })
    })
 }