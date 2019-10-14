import React, { Component } from "react"
import {
    Form,
    Select,
    Button,
    Icon,
    Input,
    Card,
    Upload,
    Modal,
    Cascader
  } from 'antd';

import "./add-update.less";
import LinkButton from "../../components/link-button/link-button";
import {reqCategorys} from '../../api'
const { TextArea } = Input;
const { Option } = Select;

class AddUpdate extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        options: []
    }
    loadData = async selectedOptions => {
      //得到选择的option 对象
      const targetOption = selectedOptions[0];
      //显示loading
      targetOption.loading = true;

      console.log(targetOption)
      //请求异步获取
      const result = await this.reqCategorys(targetOption.value);
      targetOption.loading = false;
      if(result && result.length>0){
        let subOptions = result.map((c) => ({
          value: c._id,
          label: c.categoryName,
          isLeaf: true
        }))
        targetOption.children = subOptions
      }else{
        targetOption.isLeaf = true;
        
      }
      this.setState({
        options: [...this.state.options]
      })
     
    }
    componentDidMount() {
      this.reqCategorys('0')
    }
    reqCategorys = async (parentId) => {
      const result = await reqCategorys(parentId); 
      let options;
      if(parentId==='0'){
        options = result.data.map((c) => ({
          value: c._id,
          label: c.categoryName,
          isLeaf: false
        }))
        this.setState({
          options
        })
      }else{
        return result.data;
      }
    }
    /**
     * 对价格自定义验证
     */
    validatorPrice = (rule, value, callback) => {
      if(value*1 > 0){
        callback() //验证通过
      }else{
        callback('价格必须大于0');
      }
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = async file => {
    //   if (!file.url && !file.preview) {
    //     file.preview = await getBase64(file.originFileObj);
    //   }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    }
    
    handleChange = ({ fileList }) => this.setState({ fileList })
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
      changeValue = (value) => {
        console.log(value);
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 2 },
          wrapperCol: { span: 8 },
        };
        const title = (
            <span>
                <Icon 
                    type='arrow-left' 
                    style={{color: 'green', marginRight: 15, fontSize:16, cursor: 'pointer'}}
                    onClick={() => this.props.history.goBack()}
                    >  
                </Icon>
                <span>商品详情</span>
            </span>
        )
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          )
          const { previewVisible, previewImage, fileList } = this.state;
        return (
            
            <Card title={title}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="商品名称">
                        {getFieldDecorator('name', {
                            rules: [
                            {
                                required: true,
                                message: '请输入商品名称',
                            },
                            ],
                        })(<Input placeholder="请输入商品名称" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品描述">
                        {getFieldDecorator('desc', {
                            rules: [
                            {
                                required: true,
                                message: '请输入商品描述',
                            },
                            ],
                        })(<TextArea placeholder="Autosize height based on content lines" autosize />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="商品价格">
                        {getFieldDecorator('price', {
                            rules: [
                            {
                                required: true,
                                message: '请输入商品价格',
                            },
                            {validator: this.validatorPrice}
                            ],
                            initialValue: 1,
                        })(<Input type='number' min={1} max={10} onChange={this.changeValue} addonAfter="元"/>)}
                    </Form.Item>

                    <Form.Item label="商品分类">
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: '请选择商品分类!' }],
                        })(
                          <Cascader
                            options={this.state.options} 
                            loadData={this.loadData}
                          >
                          </Cascader>
                        )}
                    </Form.Item>
                    <Form.Item label="商品图片" extra="">
                    {getFieldDecorator('upload', {
        
                        getValueFromEvent: this.normFile,
                    })(
                        <div className="clearfix">
                        <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                    )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 6, offset: 2 }}>
                      <Button type="primary" htmlType="submit" >
                          提交
                      </Button>
                    </Form.Item>
                </Form>
            </Card>
          
        );
    }
}

export default Form.create()(AddUpdate)