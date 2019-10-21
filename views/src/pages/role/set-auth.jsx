import React, { Component } from "react"
import { Form, Input ,Tree} from 'antd';
import ProoTypes from "prop-types";

import menuList from "../../config/menuConfig";
const {TreeNode} = Tree
export default class SetAuth extends Component {
    static propTypes = {
        role: ProoTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            checkedKeys: this.props.role.menus || []
        }
    }
    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
    }
    /**
     * 当组件接收到新的属性时自动调用  
     *  1.在render() 之前调用
     *  2.初始显示的时候不会调用
     */
    componentWillReceiveProps(nextProps) {
        let menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        })
    }
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre 
        },[])
    }
    onCheck = (checkedKeys, info) => {
        this.setState({
            checkedKeys
        })
    }
    getMenus = () => {
        return this.state.checkedKeys;
    }
    render() {
        const {role} = this.props || {}
        const {checkedKeys} = this.state;
        return (
            <div>
                <Form >
                    <Form.Item label="角色名称" labelCol={{span: 4}} wrapperCol={{span:14}}>
                        <Input value={role.name}></Input>
                    </Form.Item>
                </Form>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}