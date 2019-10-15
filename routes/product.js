var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var Product = require('../config/product.js');

router.get('/',function (req, res, next) {
    var pageSize = parseInt(req.query.pageSize);
    var page = req.query.page;
    var searchStr = req.query.searchStr;
    var searchType = req.query.searchType;
    searchType == 0 ? searchType='name' : searchType='desc';
    if(searchStr){
        Product.paginate({[searchType]: {$regex:searchStr}},{page: page, limit: pageSize}, function(err, result){
            if(err) return console.error(err);
            res.send({data:result,status:1,msg:'查询成功'})
        })
    }else{
        Product.paginate({},{page: page, limit: pageSize}, function(err, result){
            if(err) return console.error(err);
            res.send({data:result,status:1,msg:'查询成功'})
        })
    }
    
    
})
router.get('/addProduct',function (req, res, next) { 
    var product = new Product({
        status: 1,
        imgs: [
            'https://img12.360buyimg.com/n7/jfs/t29746/50/1467859892/218888/2958801/5ce27140Nc3918155.jpg',
            'https://img10.360buyimg.com/n7/jfs/t1/42427/10/9665/66537/5d3574b1E668ef503/3cb3111920876237.jpg'
        ],
        name: '华为',
        desc: '华为加油',
        price: 66000,
        pCategoryId: '5da4320f4a85fb1f88c64e49',
        categoryId: '5da432334a85fb1f88c64e4e',
        detail: ''
    })
    product.save(function(err){
        if(err) return console.error(err);
        res.send({data:[],status:1,msg:'插入成功'})
    })
})

module.exports = router;

