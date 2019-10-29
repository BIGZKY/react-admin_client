import React, { Component } from "react"
import {Icon, Select, Input, Card, Table, Button, message, Modal} from 'antd'

import LinkButton from "../../components/link-button/link-button"
import AddForm from "./add-update"
import {reqUsers, reqRoles, reqAddUser,reqDelUser, reqUpdateUser} from '../../api/index'
import { PAGE_SIZE } from '../../utils/constans'
import {formateDate} from '../../utils/dateUtils'
const { confirm } = Modal;

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
            this.initRoleNames();
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
                    dataIndex: 'role_id',
                    render: (role_id) => this.roleNames[role_id]
                },
                {
                    width: 150,
                    title: '操作',
                    render: (user) => {
                        return (
                            <span>
                                <LinkButton onClick={() => this.showUpdateUser(user)}>修改</LinkButton>
                                <LinkButton onClick={() => this.delUser(user)}>删除</LinkButton>
                            </span>
                        )
                    }
                }
            ]
        })
    }
    initRoleNames = () => {
        this.roleNames = this.roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {})
        
    }
    delUser = (user) => {
        confirm({
            title: `确认删除${user.name}吗?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk () {
                const res = await reqDelUser(user._id);
                if(res.status === 1){
                    message.success('删除成功');
                    this.reqUsers();
                }else{
                    message.err(res.msg);
                }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        
    } 
    showUpdateUser = (user) => {
        this.user = user;
        this.setState({
            showStatus: 1,
        })
    }
    updateUser = () => {
        const form = this.form;
        
        form.validateFields(async (err, values) => {
            if(!err){
                values = {...values,_id: this.user._id}
                const res = await reqUpdateUser(values)
                if(res.status === 1){
                    this.form.resetFields();
                    message.success('修改成功');
                    this.reqUsers();
                    this.setState({
                        showStatus: 0
                    })
                }
            }
        })
    }
    addUser = () => {
        const form = this.form;
        form.validateFields(async (err, values) => {
            if(!err){
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

        this.form.resetFields();
        this.setState({
            showStatus: 0
        })
    }
    showAdd = () => {
        this.user = {};
        this.setState({showStatus: 1})
    }
    render() {
        const title = (
            <span>用户列表</span>
        )
        const {users, columns, showStatus} = this.state;
        const user = this.user || {};
        const extra = (
            <Button type="primary" onClick={() => this.showAdd()}>
                <Icon type="plus" ></Icon>
                添加用户
            </Button> 
        )
        
        return (
            <Card title={title} extra={extra}>
                <Table bordered 
                    dataSource={users} 
                    columns={columns} 
                    rowKey="_id"
                ></Table>
                <Modal 
                    title={user._id ? '修改用户' : '添加用户'}
                    visible={showStatus === 1}
                    onOk = { user._id ? this.updateUser : this.addUser}
                    onCancel ={ this.handleCancel }
                >
                    <AddForm setForm={(form) => this.form = form} roles={this.roles} user={user}></AddForm>
                </Modal>
            </Card>
        )
    }
}