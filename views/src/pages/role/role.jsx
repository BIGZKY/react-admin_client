import React, { Component } from "react"
import { Card, Table, Button, message, Modal} from "antd"

import LinkButton from "../../components/link-button/link-button"
import memoryUtils from "../../utils/memmoryUtils";
import {PAGE_SIZE} from '../../utils/constans'
import AddForm from "./add-form"
import SetAuth from "./set-auth"
import { reqAddRole, reqUpdateRole ,reqRoles, reqDelRole} from "../../api";

export default class Role extends Component {
    state = {
        role: {},
        showStatus: 0,
        roles:[
            // {
            //     menus: [
            //         '/home',
            //         'products',
            //         '/category',
            //         'product',
            //         '/role'
            //     ],
            //     _id: '541311sdgfdfghh4g',
            //     name:'角色1',
            //     create_time: 1554639552758,
            //     __v: 0,
            //     auth_time: 1557630307021,
            //     auth_name: 'admin'
            // },
            
        ]
    }
    constructor(props) {
        super(props)
        this.setAuthRef = React.createRef();
    }
    initClumns = () => {
        this.setState({
            columns:[
                {
                    title: '角色名称',
                    dataIndex: 'name',
                },
                {
                    title: '创建时间',
                    dataIndex: 'create_time',
                },
                {
                    title: '授权时间',
                    dataIndex: 'auth_time',
                },
                {
                    title: '授权人',
                    dataIndex: 'auth_name',
                },
                {
                    title: '操作',
                    dataIndex: '_id',
                    render: (_id) => {
                        return (
                            <span>
                                <LinkButton onClick={() => this.delRole(_id)}>删除</LinkButton>
                            </span>
                        )
                    }
                }
                
            ]
        })
    }
    componentWillMount() {
        this.initClumns();
    }
    componentDidMount() {
        this.getRoles();
    }
    getRoles = async () => {
        const res = await reqRoles();
        if(res.status){
            this.setState({
                roles: res.data
            })
        }else{
            message.error('查询失败')
        }
    }
    delRole = async (_id) => {
        const res = await reqDelRole(_id);
        if(res.status){
            message.success('删除成功');
            this.getRoles();
        }else{
            message.error('查询失败');
        }
    }
    onRow = (role) => {
        return {
            onClick: event => {
                console.log(role)
                this.setState({
                    role
                })

            }
        }
        
    }
    addRole = () => {
        const form = this.form;
        form.validateFields(async (err, values) => {
            if(!err){
                //清除缓存数据
                this.form.resetFields()
                values.create_time = new Date().getTime()+'';
                //发送更新请求
                const result = await reqAddRole(values)
                if(result.status ===1 ){
                    //重置列表
                    this.getRoles();
                }
            }
        })
        this.setState({
            showStatus: 0
        })
    }
    setAuth = async () => {
        const menus = this.setAuthRef.current.getMenus();
        this.state.role.menus = menus;
        const user = memoryUtils.user;
        const res = await reqUpdateRole(this.state.role._id, menus, user.username);

        if(res.status ===1){
            message.success('保存成功');
            this.getRoles();
        }else{
            message.error('保存失败');
        }
        this.setState({
            showStatus: 0,
            role: {...this.state.role}
        })
    }
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    // onSelect =(record, selected, selectedRows, nativeEvent) => {

    // }
    render() {
        const {roles, columns, role, showStatus} = this.state;
        const title = (
            <span>
                <Button type="primary" onClick={() => this.setState({showStatus:1})}>创建角色</Button>
                <Button type="primary" disabled={role._id ? false : true } style={{marginLeft:15}} onClick={() => this.setState({showStatus:2})}>设置权限</Button>
            </span>
        ) 
        
        return (
            <Card title={title}>
                <Table 
                    bordered 
                    dataSource={roles} 
                    columns={columns} 
                    rowKey="_id"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                    }}
                    rowSelection= {{type: 'radio',selectedRowKeys:[role._id]}}
                    onRow = {this.onRow}
                ></Table>
                <Modal
                    title="添加角色"
                    visible={showStatus === 1}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <AddForm setForm={(form) => this.form = form}></AddForm>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={showStatus === 2}
                    onOk={this.setAuth}
                    onCancel={this.handleCancel}
                >
                    <SetAuth role={role} ref={this.setAuthRef}></SetAuth>
                </Modal>
            </Card>
        )
    }
}