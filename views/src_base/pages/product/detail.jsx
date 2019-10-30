import React, { Component } from "react"
import {Card, List, Button, Icon} from "antd"
import Item from "antd/lib/list/Item"

import {reqCategory} from '../../api/index'
export default class Detail extends Component {
    state = {
        pName: '',
        cName: '' 
    }
    async componentDidMount() {
        const product = this.props.location.state;
        let res ;
        if(product.pCategoryId==0){
            res = await reqCategory(product.categoryId);
            
        }else{
            // res = await reqCategory(product.categoryId);
            res = await Promise.all([reqCategory(product.categoryId), reqCategory(product.pCategoryId)])
            console.log(res)
            this.setState({
                cName: res[0].data[0].categoryName,
                pName: res[1].data[0].categoryName
            })
        }
    }
    render() {
        const product = this.props.location.state;
        const {pName, cName} = this.state;
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
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称: </span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述: </span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类: </span>
                        <span>{pName }{pName ? '-->' + cName : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片: </span>
                        <span>
                            {
                                product.imgs.map((img) => (

                                    <img className="producName" src={img} key={img} alt="" style={{width:'150px' ,height: '150px', marginRight:'15px',border: '1px solid #ccc'}}/>
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情: </span>
                        <span dangerouslySetInnerHTML={{__html: product.detail}}></span>
                    </Item>
                </List>
            </Card>    
        )
    }
}
