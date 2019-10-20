import React, { Component } from "react"
import {Icon, Select, Input, Card, Table, Button, message, Modal} from 'antd'

import LinkButton from "../../components/link-button/link-button"
import AddForm from "./add-update"
import {reqProducts, reqAddProduct, reqDelProduct} from '../../api/index'
import { PAGE_SIZE } from '../../utils/constans'
export default class User extends Component {
    state = {
        users: [],
        showStatus: 0
    }
    componentWillMount() {
        this.initColumns()
    }
    initColumns = () => {
        this.setState({
            columns: [
                {
                    title: '用户名称',
                    dataIndex: 'name',
                },
                {
                    title: '权限',
                    dataIndex: 'auth_name',
                },
                {
                    width: 150,
                    title: '操作',
                    render: (user) => {
                        return (
                            <span>
                                <LinkButton >修改</LinkButton>
                                <LinkButton onClick={() => {this.delUser()}}>删除</LinkButton>
                            </span>
                        )
                    }
                }
            ]
        })
    }
    addUser = () => {

    }
    handleCancel = () => {

    }
    render() {
        const title = (
            <span>用户列表</span>
        )
        const extra = (
            <Button type="primary" >
                <Icon type="plus" onClick={() => this.setState({showStatus: 1})}></Icon>
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
                    <AddForm setForm={(form) => this.form = form}></AddForm>
                </Modal>
            </Card>
        )
    }
}