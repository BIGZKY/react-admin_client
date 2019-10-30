import React, { Component } from "react"
import { Redirect } from "react-router-dom";
import {
    Form,Icon,Input,Button,message
} from 'antd'


import logo from '../../assets/images/logo.png'

import './login.less'
import { reqLogin, reqOneRole } from "../../api";
import storageUtils from "../../utils/storageUtils";
import memmoryUtils from "../../utils/memmoryUtils";

/**
 * 登录组件
 *  */
class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        //对所有表单进行验证
        this.props.form.validateFields(async (err, values) =>{
            if(!err){
                const {name,password} = values
                //简化promise.then()操作 使用async
                
                const response = await reqLogin(name, password);
                if(response.status === 1){ 
                    //保存user
                    const user = response.data;
                    this.reqOneRole(user);
                    
                }else{
                    message.error(response.msg)
                }
            }
        })
    }
    reqOneRole = async (user) => {
        const res = await reqOneRole(user.role_id);
        if(res.status === 1){
            //提示登录成功
            message.success('登陆成功');
            user.menus = res.data.menus;
            // 保存到内存
            memmoryUtils.user = user;
            // 保存到本地
            storageUtils.saveUser(user);
            //跳转到管理界面
            this.props.history.replace('/');
        }    
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const user = memmoryUtils.user;
        //如果内存没有存储user ==> 当前没有登录
        if(user && user._id){
            //跳转到登录界面
            return <Redirect to="/admin" />
        }
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
                            {getFieldDecorator('name', {
                                rules: [
                                        {required: true, message: '请输入用户名!'},
                                        {max: 12, message: '用户名最多12位!'},
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}></Icon>}
                                    placeholder="请输入用户名"
                                />
                            )}
                            
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                        {required: true, message: '请输入密码!'},
                                        {max: 12, message: '密码最多12位!'},
                                        {min: 4, message: '密码最少4位!'},
                                        {pattern: /^[0-9a-zA-Z_]+$/, message: '密码必须有数字, 字母组成!'},
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}></Icon>}
                                    placeholder="请输入密码" type="password"
                                />
                            )}
                            
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

/**
 * 高阶组件
 *  1, 本质上是一个函数
 *  2, 接收一个组件(被包装组件) , 返回一个新的组件(包装组件), 包装组件会向被包装组件传递特定的属性
 *  3, 作用: 扩展组件的功能
 */

export default Login = Form.create()(Login);