import React, { Component } from "react"
import {Icon, Select, Input, Card, Table, Button, message} from 'antd'

import LinkButton from "../../components/link-button/link-button";
import {reqProducts, reqAddProduct} from '../../api/index'
import { PAGE_SIZE } from '../../utils/constans'
const {Option} = Select
export default class ProductHome extends Component {
    state = {
        total: 0,
        products: [],
        loading:true,
        searchType: '0',
        searchStr: ''
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
        // this.addProduct()
    }
    addProduct = async() => {
        let res = await reqAddProduct();
    }
    getProducts = async (page) => {
        let res ;
        if(this.state.searchStr){
            res = await reqProducts(page, PAGE_SIZE, this.state.searchStr, this.state.searchType);
        }else{
            res = await reqProducts(page, PAGE_SIZE);
        }
        
        if(res.status==1){
            this.setState({
                products: res.data.docs,
                total: res.data.total,
                loading: false
            })
        }
    }
    clickSerch = () => {
        if(this.state.searchStr){
            this.getProducts();
        }else{
            message.error('请输入搜索关键词')
        }

        
    }
    initColumns() {
        this.setState({
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'name',
                },
                {
                    title: '商品描述',
                    dataIndex: 'desc',
                },
                {
                    width: 100,
                    title: '价格',
                    dataIndex: 'price',
                    render: (price) => '￥' + price  //当前指定了对应的属性, 传入的是对应的属性值
                },
                {
                    width: 100,
                    title: '状态',
                    dataIndex: 'status',
                    render: (status) => {
                        return (
                            <span>
                                <Button type='primary'>{status ? '在售' : '下架'}</Button>
                            </span>
                        )
                    }
                },
                {
                    width: 150,
                    title: '操作',
                    render: (product) => {
                        return (
                            <span>
                                <LinkButton>修改</LinkButton>
                                <LinkButton onClick={() => {this.props.history.push('/product/detail',product)}}>详情</LinkButton>
                            </span>
                        )
                    }
                }
            ]
        })
    }
    render() {
        const {products, columns, loading, total, searchType, searchStr} = this.state;
        const title = (
            <span >
                <Select value={searchType} style={{width:150}} onChange={(value) => this.setState({searchType: value})}>
                    <Option value="0">按名称搜索</Option>
                    <Option value="1">按描述搜索</Option>
                </Select>
                <Input placeholder="按关键字搜索" style={{width:250, margin:'0 15px'}} value={searchStr} onChange={(e) =>  this.setState({searchStr: e.target.value})}></Input>
                <Button type="primary" onClick={() => this.clickSerch()}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={() => this.props.history.push('/product/addUpdate')}>
                <Icon type="plus"></Icon>
                添加商品
            </Button> 
        )
        return (
            <Card title={title} extra={extra}>
                <Table bordered 
                    dataSource={products} 
                    columns={columns} 
                    loading={loading} 
                    rowKey="_id"
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                ></Table>
            </Card>
        )
    }
}