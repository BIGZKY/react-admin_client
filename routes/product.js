var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var formidable = require('formidable');
const fs = require('fs');
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
router.post('/updateProduct', function (req, res, next) { 
    var where = {_id: ObjectID(req.body._id)}
    var set = {
        $set: {...req.body.values}
    }
    Product.update(where, set, function(err){
        if(err) return console.error(err);
        res.send({data:[],status:1,msg:'更新成功'})
    })
})
router.post('/addproduct',function (req, res, next) { 
    var product = new Product(req.body.values)
    product.save(function(err){
        if(err) return console.error(err);
        res.send({data:[],status:1,msg:'插入成功'})
    })
})
router.post('/delProduct', function(req, res, next){
    var where = {_id: ObjectID(req.body._id)}
    Product.deleteOne(where, function(err){
        if(err) return console.error(err)
        res.send({data:[],status:1,msg:'删除成功'})
    })
})

router.post('/uploads', function(req, res, next){
    
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/uploads/');
    // 解析 formData 数据
    form.parse(req, (err, fields ,files) => {
        if(err) return next(err);
        var file = files.productImg.name;
        var filePath = files.productImg.path;
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));  
        var fileName = 'img_' + new Date().getTime()+fileExt; 
        
        // var path = '/public/uploads' + files.productImg.name;
        var targetFile = path.join(form.uploadDir, fileName); 
        if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {  
            var err = new Error('此文件类型不允许上传');  
            res.json({code:-1, message:'此文件类型不允许上传'});  
        }else{
            fs.rename(filePath, targetFile, function (err) {  
                if (err) {  
                    console.info(err);  
                    res.json({status:0, message:'操作失败'});  
                } else {  
                    //上传成功，返回文件的相对路径  
                    var fileUrl = 'http://localhost:3001/public/uploads/' + fileName;  
                    res.json({status:1, url:fileUrl, message: '图片上传成功'});  
                }  
            }); 
        } 
         
    })
});
  

module.exports = router;

