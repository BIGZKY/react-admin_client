import React, { Component } from "react"
import { Form, Input ,Select} from 'antd';

const { Option } = Select;
const { Item } = Form; 
class AddForm extends Component {
    componentDidMount() {
        this.props.setForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryList } = this.props;
        return (
            <Form layout="horizontal">
                <Item label="选择分类">
                    {
                        getFieldDecorator('category_id',{
                            initialValue: '0'
                        })(
                            <Select>
                                <Option value="0">一级分类</Option>
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