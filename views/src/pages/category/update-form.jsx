import React, { Component } from "react"
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
const { Item } = Form; 
class UpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }
    componentDidMount() {
        console.log(this.props.form)
        this.props.setForm(this.props.form);
    }
    render() {
       
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                
                <Item label="分类名称">
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: this.props.categoryName
                        })(
                            <Input placeholder="输入分类名称" />
                        )
                    }
                    
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)