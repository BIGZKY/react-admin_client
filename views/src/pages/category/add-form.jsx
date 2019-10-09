import React, { Component } from "react"
import { Form, Input ,Select} from 'antd';

const { Option } = Select;
const { Item } = Form; 
class AddForm extends Component {
    componentDidMount() {
        this.props.setForm(this.props.form);
        console.log(this.props.parentId)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryList, parentId } = this.props;
        return (
            <Form layout="horizontal">
                <Item label="选择分类">
                    {
                        getFieldDecorator('parentId',{
                            initialValue: parentId || '0',
                            
                        })(
                            <Select >
                                <Option value="0" >一级分类</Option>
                                {
                                    categoryList.map((item)=>{
                                        return <Option value={item._id} key={item._id}>{item.categoryName}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item label="分类名称">
                    {
                        getFieldDecorator('categoryName',{
                            rules:[
                                {required: true, message: '分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder="输入分类名称" />
                        )
                    }
                    
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)