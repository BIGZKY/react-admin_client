import React, { Component } from "react"
import { Redirect } from "react-router-dom";
import { Layout } from 'antd';

import memoryUtils from "../../utils/memmoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
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
                    <Content style={{backgroundColor: '#fff'}}>content</Content>
                    <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器,以获得最佳的浏览体验</Footer>
                </Layout>
            </Layout>
        )
    }
} 