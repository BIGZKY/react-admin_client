import React, { Component } from "react"
import {Card, Table, Button, Icon, message, Modal, Popconfirm} from 'antd'

import LinkButton from '../../components/link-button/link-button'
import { reqCategorys, reqUpdateCategory, reqInsertCategory, reqDelCategory} from "../../api"
import AddForm from "./add-form"
import UpdateForm from "./update-form"
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
                  dataIndex: 'categoryName',
                  key: 'categoryName',
                },
    
                {
                  title: '操作',
                  width: 300,
                  dataIndex: '',
                  key: 'x',
                  render: (category) => (
                      <span>
                          <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>    
                          <Popconfirm placement="topLeft" title="是否删除分类" onConfirm={() => this.delCategory(category)} okText="Yes" cancelText="No">
                            <LinkButton>删除分类</LinkButton>  
                          </Popconfirm>
                          
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
     * 删除分类
     */
    delCategory = async (category) => {
        const result = await reqDelCategory(category._id)
        if(result.status ===1 ){
            //重置列表
            this.getCategorys();
        }
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
            parentName: category.categoryName
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
        this.setState({
            showStatus: 0
        });
    };
    showAdd = () => {
        this.setState({
            showStatus: 1
        });
    }
    showUpdate = (category) => {
        this.category = category;
        this.setState({
            showStatus: 2
        });
        
        
    }
    updateCategory = async () => {
        const category_id = this.category._id;
        const categoryName = this.form.getFieldValue('categoryName');
        //清除缓存数据
        this.form.resetFields()

        //发送更新请求
        const result = await reqUpdateCategory(category_id,categoryName)
        if(result.status ===1 ){
            //重置列表
            this.getCategorys();
            this.handleCancel()
        }
    }
    addCategory = async () => {
        const category_id = this.form.getFieldValue('category_id');
        const categoryName = this.form.getFieldValue('categoryName');

        //清除缓存数据
        this.form.resetFields();
        
        //发送插入数据请求
        const result = await reqInsertCategory(category_id, categoryName)

        if(result.status ===1 ){
            //重置列表
            this.getCategorys();
            this.handleCancel()
        }
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
        const category = this.category || {};
        return (
            <div>
                <Card title={title} extra={extra} >
                    <Table bordered dataSource={parentId === '0' ? categorys : subCategorys} columns={this.state.columns} rowKey='_id' loading={this.state.loading}/>;
            
                </Card>
                <Modal
                    title="添加"
                    visible={this.state.showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    
                    >
                    <AddForm categoryList={this.state.categorys} setForm={(form)=> {this.form = form}}/>
                </Modal>
                <Modal
                    title="更新"
                    visible={this.state.showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    >
                    <UpdateForm categoryName={category.categoryName} setForm={(form)=> {this.form = form}}/>
                </Modal>
            </div>
        )
    }
}