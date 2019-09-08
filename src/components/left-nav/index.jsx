import React, { Component } from "react"
import { Menu, Icon } from 'antd'
import {Link} from 'react-router-dom'

import './index.less'
import logo from '../../assets/images/logo.png'
const { SubMenu } = Menu;
export default class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>REACt</h1>

                </header>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                        
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to='/user'>
                            <Icon type="pie-chart" />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to='/role'>
                            <Icon type="pie-chart" />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>图形图表</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/charts/bar">
                            <Link to='/charts/bar'>
                                <span>柱形图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/line">
                            <Link to='/charts/line'>
                                <span>折线图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/pie">
                            <Link to='/chartss/pie'>
                                <span>饼图</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            </div>
        )
    }
} 