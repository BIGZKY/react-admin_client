import React, { Component } from "react"
import { Menu, Icon } from 'antd'
import {Link, withRouter} from 'react-router-dom'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from "../../config/menuConfig"

const { SubMenu } = Menu;
class LeftNav extends Component {
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(item.children){
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }

                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }
    getMenuNodes = (menuList) => {
        const pathname = this.props.location.pathname;
        return menuList.reduce((pre,item)=>{
            if(item.children){
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key==pathname);
                if(cItem) {
                    this.openKey = item.key;
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }

                    </SubMenu>
                ))
            }else{
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }
            return pre;
        },[])
    } 
    //render() 渲染之前 执行一次 可用于获取第一次渲染的数据(同步)
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }
    render() {
        const pathname = this.props.location.pathname;
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>REACt</h1>

                </header>
                
                <Menu
                    selectedKeys={[pathname]}  //匹配路由路径 选中效果
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={[this.openKey]}  //打开匹配路由的子列表
                    >
                    { this.menuNodes }
                </Menu>
            </div>
        )
        
    }
} 

export default withRouter(LeftNav)