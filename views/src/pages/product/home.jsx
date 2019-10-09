import React, { Component } from "react"
import {Icon, Select, Input, Card, Table, Button} from 'antd'

const {Option} = Select
export default class ProductHome extends Component {
    render() {
        const title = (
            <span >
                <Select value="1" style={{width:150}}>
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按描述搜索</Option>
                </Select>
                <Input placeholder="按关键字搜索" style={{width:250, margin:'0 15px'}}></Input>
                <Button type="primary">搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加商品
            </Button> 
        )
        return (
            <Card title={title} extra={extra}>

            </Card>
        )
    }
}