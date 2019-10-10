var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var Product = require('../config/product.js');

router.get('/',function (req, res, next) {
    Product.find(function(err, result){
        if(err) return console.error(err);
        res.send({data:result,status:1,msg:'查询成功'})
    })
})
router.get('/addProduct',function (req, res, next) {
    var product = new Product({
        status: 1,
        imgs: [
            'img-large.jpg',
            'img-small.jpg'
        ],
        name: '联想',
        desc: '年度重量级新品',
        price: 66000,
        pCategoryId: '0',
        categoryId: '0',
        detail: ''
    })
    product.save(function(err){
        if(err) return console.error(err);
        res.send({data:[],status:1,msg:'插入成功'})
    })
})

module.exports = router;

