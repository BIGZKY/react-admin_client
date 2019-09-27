import React, { Component } from "react"
import {Card, Table, Button, Icon, message, Modal} from 'antd'

import LinkButton from '../../components/link-button/link-button'
import { reqCategorys } from "../../api"
export default class Category extends Component {
    state = {
        loading: true,
        categorys: [],
        parentId: '0',
        parentName: '',
        subCategorys: [],
        showStatus: 0,
    }
    initColumns= ()=>{
        
        this.setState({
            columns: [
                {
                  title: '分类名称',
                  dataIndex: 'name',
                  key: 'name',
                },
    
                {
                  title: '操作',
                  width: 300,
                  dataIndex: '',
                  key: 'x',
                  render: (category) => (
                      <span>
                          <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>    
                          {this.state.parentId === '0' ? <LinkButton onClick={ ()=> this.showSubCategory(category)}>查看子分类</LinkButton> : null }   
                      </span>
                  ),
                },
            ]
        }) 
    }
    /**
     * 为第一次render做准备
     */
    componentWillMount() {
        this.initColumns(); 
    }
    /**
     * 异步获取一级分类列表显示
     */
    getCategorys = async () => {
        const {parentId} = this.state;
        const result = await reqCategorys(parentId);
        if(result.status===1){
            if(parentId === '0'){
                this.setState({
                    categorys:result.data,
                    loading: false
                }) 
            }else{
                this.setState({
                    subCategorys:result.data,
                    loading: false
                })  
            }
            
        }else{
            message.error('请求失败');
        }
    }
    componentDidMount() {
        this.getCategorys();
    }
    showSubCategory = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {  // 在状态更新且重新render()后执行
            this.getCategorys();
        })
        
    }
    showCategory = () => {
        this.setState({
            parentId: '0',
            subCategorys: []
        })
    }
    
    handleOk = e => {
        console.log(e);

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showStatus: 0
        });
    };
    showAdd = () => {
        this.setState({
            showStatus: 1
        });
    }
    showUpdate = () => {
        this.setState({
            showStatus: 2
        });
    }
    render() {
        
        const {parentId, categorys, parentName, subCategorys} = this.state;
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>  
                <Icon type="arrow-right" style={{marginRight: '10px'}}></Icon>
                <span>{parentName}</span>
            </span>
        );
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table bordered dataSource={parentId === '0' ? categorys : subCategorys} columns={this.state.columns} rowKey='key' loading={this.state.loading}/>;
            
                </Card>
                <Modal
                    title="添加"
                    visible={this.state.showStatus === 1 ? true : false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal
                    title="更新"
                    visible={this.state.showStatus === 2 ? true : false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}