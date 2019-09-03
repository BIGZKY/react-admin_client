import React, { Component } from "react"
import {
    Form,Icon,Input,Button
} from 'antd'

import logo from './images/logo.png'

import './login.less'

/**
 * 登录组件
 *  */
export default class Login extends Component {
    handleSubmit = (e) => {

    }
    render() {
        return (
            <div className="loginWrap">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h2>后台管理系统</h2>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}></Icon>}
                                placeholder="userName"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}></Icon>}
                                placeholder="password" type="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
} 