import React ,{ PureComponent } from "react"
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Button,
    Icon,
    Input,
    Card,
    Cascader,
    message
  } from 'antd'

const { Item } = Form;
const { Option } = Select;
class AddUpdate extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object
      }
    componentWillMount() {
        this.props.setForm(this.props.form);
    }
    render() {
        const {roles, user} = this.props
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        return (
            <Form {...formItemLayout}>
                <Item label="用户名">
                    {
                        getFieldDecorator('name',{
                            rules:[
                                {required: true, message: '用户名称必须输入'}
                            ],
                            initialValue: user.name
                        })(
                            <Input placeholder='请输入用户名称'/>
                        )

                    }
                </Item>
                <Item label="密码">
                    {
                        getFieldDecorator('password',{
                            rules:[
                                {required: true, message: '密码必须输入'}
                            ],
                            initialValue: user.password
                        })(
                            <Input placeholder='请输入密码' type='password'/>
                        )

                    }
                </Item>
                <Item label="邮箱">
                    {
                        getFieldDecorator('email',{
                            rules:[
                                {required: true, message: 'email必须输入'}
                            ],
                            initialValue: user.email
                        })(
                            <Input placeholder='请输入email' type='email'/>
                        )

                    }
                </Item>
                <Item label="手机号">
                    {
                        getFieldDecorator('phone',{
                            rules:[
                                {required: true, message: '手机号必须输入'}
                            ],
                            initialValue: user.phone
                        })(
                            <Input placeholder='请输入手机号'/>
                        )

                    }
                </Item>
                <Item label="角色">
                    {
                        getFieldDecorator('role_id',{
                            rules:[
                                {required: true, message: '手机号必须输入'}
                            ],
                            initialValue: user.role_id
                        })(
                            <Select placeholder='请选择所属角色'>
                                {
                                    roles.map(role => {
                                       return <Option value={role._id} key={role._id}>{role.name}</Option>
                                    })
                                }
                            </Select>
                        )

                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddUpdate);