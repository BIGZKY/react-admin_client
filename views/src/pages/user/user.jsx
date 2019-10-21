import React, { Component } from "react"
import {Icon, Select, Input, Card, Table, Button, message, Modal} from 'antd'

import LinkButton from "../../components/link-button/link-button"
import AddForm from "./add-update"
import {reqUsers, reqRoles, reqAddUser,} from '../../api/index'
import { PAGE_SIZE } from '../../utils/constans'
import {formateDate} from '../../utils/dateUtils'
export default class User extends Component {
    state = {
        users: [],
        showStatus: 0
    }
    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        this.reqRoles();
        this.reqUsers();

    }
    reqRoles = async () => {
        const res = await reqRoles();
        if(res.status){
            this.roles = res.data;
        }
    }
    reqUsers = async () => {
        const res = await reqUsers();
        if(res.status){
            this.setState({
                users: res.data
            })
        }
    }
    initColumns = () => {
        this.setState({
            columns: [
                {
                    title: '用户名称',
                    dataIndex: 'name',
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                },
                
                {
                    title: '注册时间',
                    dataIndex: 'create_time',
                    render: formateDate
                },
                {
                    title: '所属角色',
                    dataIndex: 'role_name',
                },
                {
                    width: 150,
                    title: '操作',
                    render: (user) => {
                        return (
                            <span>
                                <LinkButton onClick={() => this.updateUser(user)}>修改</LinkButton>
                                <LinkButton onClick={() => this.delUser(user)}>删除</LinkButton>
                            </span>
                        )
                    }
                }
            ]
        })
    }
    delUser = (user) => {

    } 
    updateUser = (user) => {
        this.user = user;
        this.setState({
            showStatus: 1,
        })
    }
    addUser = () => {
        const form = this.form;
        form.validateFields(async (err, values) => {
            console.log(values)
            if(!err){
                let role = this.roles.find((item) => {
                    return item._id === values.role_id
                }) 
                values.role_name = role.name;
                const res = await reqAddUser(values)
                if(res.status){
                    this.form.resetFields();
                    message.success('添加成功');
                    this.reqUsers();
                    this.setState({
                        showStatus: 0
                    })
                }
            }
        })
    }
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    render() {
        const title = (
            <span>用户列表</span>
        )
        const extra = (
            <Button type="primary" onClick={() => this.setState({showStatus: 1})}>
                <Icon type="plus" ></Icon>
                添加用户
            </Button> 
        )
        const {users, columns, showStatus} = this.state;
        return (
            <Card title={title} extra={extra}>
                <Table bordered 
                    dataSource={users} 
                    columns={columns} 
                    rowKey="_id"
                ></Table>
                <Modal 
                    title="添加用户"
                    visible={showStatus === 1}
                    onOk = { this.addUser }
                    onCancel ={ this.handleCancel }
                >
                    <AddForm setForm={(form) => this.form = form} roles={this.roles} user={this.user}></AddForm>
                </Modal>
            </Card>
        )
    }
}