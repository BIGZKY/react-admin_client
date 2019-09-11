import React, { Component } from "react"
import {Card, Table, Button, Icon} from 'antd'

import LinkButton from '../../components/link-button/link-button'
export default class Category extends Component {
    
    render() {
        const dataSource = [
            // {
            //   key: '1',
            //   name: '家用电器',
            //   parentId: 0,
            //   _id: '123456'
            // },
            // {
            //   key: '2',
            //   name: '电脑',
            //   parentId: 0,
            //   _id: '1234567'
            // },
          ];
          
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
            },

            {
              title: '住址',
              width: 300,
              dataIndex: '',
              key: 'x',
              render: () => (
                  <span>
                      <LinkButton>修改分类</LinkButton>    
                      <LinkButton>查看子分类</LinkButton>    
                  </span>
              ),
            },
          ];
        const title = '一级菜单'
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table bordered dataSource={dataSource} columns={columns} rowKey='_id' />;
            </Card>
        )
    }
}