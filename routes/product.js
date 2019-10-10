var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var Product = require('../config/product.js');

router.get('/',function (req, res, next) {
    var pageSize = parseInt(req.query.pageSize);
    var page = req.query.page;
    console.log()
    Product.paginate({},{page: page, limit: pageSize}, function(err, result){
        if(err) return console.error(err);
        console.log(result)
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
        name: '华为',
        desc: '华为加油',
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

