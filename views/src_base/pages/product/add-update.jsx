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
    Cascader,
    message
  } from 'antd'

import "./add-update.less"
import LinkButton from "../../components/link-button/link-button"
import {reqCategorys, reqUpdateProduct, reqAddProduct} from '../../api'
import PicturesWall from './picturesWall'
import RichTextEditor from './rich-text-editor'
const { TextArea } = Input
const { Option } = Select

class AddUpdate extends Component {
    constructor(props) {
      super(props)
      this.picturesWall = React.createRef()
      this.richTextEditor = React.createRef()
    }
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
      const targetOption = selectedOptions[0]
      this.targetOption = targetOption
      //显示loading
      targetOption.loading = true
      //请求异步获取
      const result = await this.reqCategorys(targetOption.value)
      targetOption.loading = false
      //二级分类
      if(result && result.length>0){  
        let subOptions = result.map((c) => ({
          value: c._id,
          label: c.categoryName,
          isLeaf: true
        }))
        targetOption.children = subOptions
      }else{
        targetOption.isLeaf = true
      }
      this.setState({
        options: [...this.state.options]
      })
     
    }
    componentDidMount() {
      this.reqCategorys('0')
    }
    componentWillMount() {
      const product = this.props.location.state
      this.product = product || {}
      //判断是否是更新
      this.isUpdate = !!product
      this.categorys = []
      if(this.isUpdate){
        this.categorys.push(product.pCategoryId)
        this.categorys.push(product.categoryId)
      }
    }

    reqCategorys = async (parentId) => {
      const result = await reqCategorys(parentId) 
      if(parentId==='0'){ 
        this.initOPtions(result.data)
      }else{
        return result.data
      }
    }
    initOPtions =async (data) => {
      let options
      options = data.map((c) => ({
        value: c._id,
        label: c.categoryName,
        isLeaf: false
      }))
      const {isUpdate, product} = this
      const {pCategoryId, categoryId} = product
      if(isUpdate && pCategoryId!=0){
        
        const subCategorys = await this.reqCategorys(pCategoryId)
        
        let subOptions = subCategorys.map((c) => ({
          value: c._id,
          label: c.categoryName,
          isLeaf: true
        }))
        let targetOption = options.find((option) => option.value === pCategoryId)
        targetOption.children = subOptions
      }
      this.setState({
        options: options
      })
    }
    onChange = (value, selectedOptions) => {
      this.categorys = value
    }
    /**
     * 对价格自定义验证
     */
    validatorPrice = (rule, value, callback) => {
      if(value*1 > 0){
        callback() //验证通过
      }else{
        callback('价格必须大于0')
      }
    }

    handleSubmit = e => {
      e.preventDefault()
      
      this.props.form.validateFields(async (err, values) => {
        if (!err) { 
          let imgs = this.picturesWall.current.getImgsPath()
          let detail = this.richTextEditor.current.getDetail()
          values.imgs = imgs
          values.detail = detail
          let result
          if(this.isUpdate){
            values.status = this.product.status
            result = await reqUpdateProduct(this.product._id, values)
            if(result.status === 1){
              message.success('更新成功')
            }
          }else{
            values.status = 0
            values.pCategoryId = this.categorys[0]
            values.categoryId = this.categorys[1]
            result = await reqAddProduct(values)
            if(result.status === 1){
              message.success('添加成功')
            }
          }
          
        }
      })
    }
    changeValue = (value) => {
      console.log(value)
    }
    render() {
      const { getFieldDecorator } = this.props.form
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
      }
      const {isUpdate, product, categorys} = this
      const title = (
          <span>
              <Icon 
                  type='arrow-left' 
                  style={{color: 'green', marginRight: 15, fontSize:16, cursor: 'pointer'}}
                  onClick={() => this.props.history.goBack()}
                  >  
              </Icon>
              <span>{isUpdate ? '商品更新' : '添加商品'}</span>
          </span>
      )
      const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        )
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
                          initialValue: product.name
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
                          initialValue: product.desc
                      })(<TextArea placeholder="请输入商品描述" autosize />)}
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
                          placeholder: '请输入商品价格',
                          initialValue: product.price,
                      })(<Input type='number' onChange={this.changeValue} addonAfter="元"/>)}
                  </Form.Item>

                  <Form.Item label="商品分类">
                      {getFieldDecorator('category', {
                          rules: [{ required: true, message: '请选择商品分类!' }],
                          initialValue: categorys
                      })(
                        <Cascader
                          options={this.state.options} 
                          loadData={this.loadData}
                          placeholder="请选择分类"
                          onChange={this.onChange}
                        >
                        </Cascader>
                      )}
                  </Form.Item>
                  <Form.Item label="商品图片" extra="" wrapperCol={{ span: 20}}>
                    <PicturesWall ref={this.picturesWall} imgs={isUpdate ? product.imgs : []}></PicturesWall>
                  </Form.Item>
                  <Form.Item label="商品详情" extra="" wrapperCol={{ span: 20}}>
                      <RichTextEditor ref={this.richTextEditor} detail={product.detail}></RichTextEditor>
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 6, offset: 2 }}>
                    <Button type="primary" htmlType="submit" >
                        提交
                    </Button>
                  </Form.Item>
              </Form>
          </Card>
        
      )
    }
}

export default Form.create()(AddUpdate)