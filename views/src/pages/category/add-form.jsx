import React, { Component } from "react"
import { Form, Input ,Select} from 'antd';

const { Option } = Select;
const { Item } = Form; 
class AddForm extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <Item label="选择分类">
                    {
                        getFieldDecorator('parentId',{
                            initialValue: '0'
                        })(
                            <Select defaultValue="0" >
                                <Option value="0">一级分类</Option>
                                <Option value="1">家电</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item label="分类名称">
                    {
                        getFieldDecorator('name',{
                            
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