import React, { Component } from "react"
import { Redirect ,Link, Route, Switch} from "react-router-dom";
import { Layout } from 'antd';

import memoryUtils from "../../utils/memmoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Category from "../category/category";
import User from "../user/user";
import Pie from "../charts/pie";
import Line from "../charts/line";
import Role from "../role/role";
import Home from "../home/home";
import Bar from "../charts/bar";
import Product from "../product/product";

const { Footer, Sider, Content } = Layout;

/**
 * 后台管理的路由组件
 *  */
export default class Login extends Component {
    render() {
        const user = memoryUtils.user;
        //如果内存没有存储user ==> 当前没有登录
        if(!user || !user._id){
            //跳转到登录界面
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav /> 
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/product' component={Product} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home'/>   
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器,以获得最佳的浏览体验</Footer>
                </Layout>
            </Layout>
        )
    }
} 