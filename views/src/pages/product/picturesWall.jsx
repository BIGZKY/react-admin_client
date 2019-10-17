import React, { Component } from "react"
import { Upload, Icon, Modal, message } from 'antd';

import { BASE_URL } from "../../utils/constans";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentWillMount() {
    let imgs = this.props.imgs;

    let fileList = imgs.map((img, index) => ({
      uid: 0 - (index+1) + '',
      name: 'image.png',
      status: 'done',
      url: BASE_URL+img
    }))
    this.setState({
      fileList
    })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  /**
   * file 当前操作的额图片对象
   * fileList  图片列表
   */
  handleChange = ({file, fileList }) => {
    if(file.status === 'done'){
      const result = file.response;
      console.log(file)
      if(result.status === 1){
        message.success('图片上传成功');
        file = fileList[fileList.length-1];
        file.url = result.url;
      }else{
        message.error('图片上传失败')
      }
    }
    this.setState({
      fileList
    })
  };

  //获取图片地址列表
  getImgsPath = () => {
    return this.state.fileList.map((file) => file.url)
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:3001/product/uploads"
          listType="picture-card"
          name="productImg"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          accept=".jpg, .jpeg, .png"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}