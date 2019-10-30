import React, { Component } from "react"
import { Form, Input ,Select} from 'antd';

const { Item } = Form; 
class AddForm extends Component {
    componentDidMount() {
        this.props.setForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal" labelCol={{span:4}} wrapperCol={{span: 14}}>

                <Item label="角色名称">
                    {
                        getFieldDecorator('name',{
                            rules:[
                                {required: true, message: '角色名称必须输入'}
                            ]
                        })(
                            <Input placeholder="输入角色名称" />
                        )
                    }
                    
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)