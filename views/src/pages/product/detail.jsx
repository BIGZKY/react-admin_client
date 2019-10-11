import React, { Component } from "react"
import {Card, List, Button, Icon} from "antd"
import Item from "antd/lib/list/Item"

export default class Detail extends Component {
    render() {
        const title = (
            <span>
                <Icon type='arrow-left'></Icon>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称: </span>
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述: </span>
                        <span>年度重量级新品, X390、T490全新登场 更加轻薄机身设计</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类: </span>
                        <span>电脑 --> 笔记本</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片: </span>
                        <span>
                            <img className="product-img" src="https://img11.360buyimg.com/n7/jfs/t1/74274/16/2371/233375/5d099429E25d545c3/162fbb8724aa6590.jpg" alt="img"/>
                            <img className="product-img" src="https://img13.360buyimg.com/n7/jfs/t1/26724/31/14294/123936/5ca56c4aE4f21b041/d438f7b5b7214056.jpg" alt="img"/>
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情: </span>
                        <span dangerouslySetInnerHTML={{__html: '<h1 style="color: red">商品详情的展示</h1>'}}></span>
                    </Item>
                </List>
            </Card>    
        )
    }
}