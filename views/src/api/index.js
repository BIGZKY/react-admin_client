import ajax from "./ajax"
import jsonp from 'jsonp'
import {message} from 'antd'
const BASE = 'http://localhost:3001';

export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST');

//json 请求的接口请求函数
/**
 * jsonp 是解决get类型的ajax跨域请求问题
 * jsonp 请求不是ajax请求, 而是一般的get请求
 * 基本原理
 *     浏览器端:
 *         动态生成<script> 来请求后台接口(src就是接口的url)
 *         定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callbak=fn)
 *     服务器端:
 *          接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果作为实参传入函数调用
 *     浏览器端:
 *          收到响应后自动执行函数调用的js代码, 也就是执行了提前定义好的回调函数,并得到了需要的结果数据
 */
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve, reject)=>{
        jsonp(url, {}, (err, data)=>{

            if(!err && data.status === 'success'){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                message.error('获取天气信息失败!')
            }
        })
     })
 }

 //异步请求一级分类
export const reqCategorys = (parentId) => ajax(BASE+'/admin/getCategory',{parentId});
