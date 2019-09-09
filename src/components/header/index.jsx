import React, { Component } from "react"
import {modal,Button } from 'antd'

import './index.less'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
              <div className="header-top">
                <span>欢迎, admin</span>
                <Button onClick={this.logout}>退出</Button>
              </div>
              <div className="header-bottom">
                <div className="header-bottom-left">首页</div>
                <div className="header-bottom-right">
                  {/* <span>{currentTime}</span>
                  <img src={dayPictureUrl} alt="weather"/>
                  <span>{weather}</span> */}
                </div>
              </div>
            </div>
          )
    }
    
} 