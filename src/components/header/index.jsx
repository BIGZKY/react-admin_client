import React, { Component } from "react"
import {Modal,Button } from 'antd'
import {withRouter, Redirect} from 'react-router-dom'

import store from '../../utils/storageUtils'
import {reqWeather} from '../../api/index'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memmoryUtils'
import menuList from '../../config/menuConfig'
import './index.less'

class Header extends Component {

    state = {
      currentTime: formateDate(new Date()),
      dayPictureUrl: '',
      weather: ''
    }
    componentWillMount() {
      this.getWeather()
    }
    getWeather = async () => {
      //调用接口请求异步获取
      const {dayPictureUrl, weather} = await reqWeather('郑州');
      this.setState({
        dayPictureUrl,
        weather
      })
    }
    getTime = () => {
      this.intervalId = setInterval(()=> {
        const currentTime = formateDate(new Date());
        this.setState({currentTime})
      },1000)
    }
    getTitle= () => {
      let path = this.props.location.pathname;
      let title = '';
      menuList.forEach((item) => {
        if(item.key === path) {
          title = item.title
        }else if(item.children){
          
          let currentPath = item.children.find((items)=>{
              return items.key === path;
          })
          if(currentPath) {
            title = currentPath.title;
          }
        }
      })
      return title
    }
    //退出登录
    logout = () => {
      //显示确认框
      Modal.confirm({
        title: '确定退出吗?',
        onOk: () => {
          store.removeUser();
          memoryUtils.user = {};
          this.props.history.replace('/login');
        }
      })
    }
    /**
     * 当前组件卸载之前调用
     */
    componentWillUnmount() {
      clearInterval(this.intervalId)
    }
    /**
     * 第一次render() 执行执行
     * 一般在此执行异步操作: 发ajax请求/启动定时器
     */
    componentDidMount() {
      this.getTime();
    }
    render() {
      const username = memoryUtils.user.username;
      const {currentTime, dayPictureUrl, weather} = this.state;
      const title = this.getTitle();
      return (
          <div className="header">
            <div className="header-top">
              <span>欢迎, {username}</span>
              <Button onClick={this.logout}>退出</Button>
            </div>
            <div className="header-bottom">
              <div className="header-bottom-left">{title}</div>
              <div className="header-bottom-right">
                <span>{currentTime}</span>
                <img src={dayPictureUrl} alt="weather"/>
                <span>{weather}</span>
              </div>
            </div>
          </div>
        )
    }
    
} 

export default withRouter(Header)