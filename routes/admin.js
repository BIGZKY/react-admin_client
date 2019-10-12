var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

var {mongo} = require('../config/index');
/* GET home page. */
router.get('/getCategory', function(req, res, next) {
  mongo.then((db)=>{
    var whereStr = {"parentId": req.query.parentId || 0};
    db.collection("category").find(whereStr).toArray(function(err, result) {
      if (err) throw err;
      res.send({data:result, status:1, msg: '查询成功'})
      db.close;
      
    });
  }).catch((err)=>{
    console.log(err)
  })
});

router.post('/updateCategory', function(req, res, next) {
  mongo.then((db)=>{
    var whereStr = { "_id": ObjectID(req.body.category_id) };
    var updateStr = {$set: { "categoryName" : req.body.categoryName }};
    db.collection("category").updateOne(whereStr, updateStr, function(err, result) {
      if (err) throw err;
      res.send({data:[], status:1, msg: '更改成功'})
      db.close;
    });
  }).catch((err)=>{
    console.log(err)
  })
});
 
router.get('/category', function(req, res, next) {
  mongo.then((db)=>{
    var whereStr = { "_id": ObjectID(req.query.category_id) };

    db.collection("category").find(whereStr).toArray(function(err, result) {
      if (err) throw err;
      res.send({data:result, status:1, msg: '查询成功'})
      db.close;
      
    });
  }).catch((err)=>{
    console.log(err)
  })
});
  
router.post('/insertCategory', function(req, res, next) {
  mongo.then((db)=>{
    var insertStr = { 
      categoryName: req.body.categoryName,
      parentId: req.body.category_id,
    };
    
    db.collection("category").insert(insertStr, function(err, result) {
      if (err) throw err;
      res.send({data:[], status:1, msg: '插入成功'})
      db.close;
    });
  }).catch((err)=>{
    console.log(err)
  })
});

router.post('/delCategory', function(req, res, next) {
  mongo.then((db)=>{
    var whereStr = { "_id": ObjectID(req.body.category_id) };
    
    db.collection("category").deleteOne(whereStr, function(err, result) {
      if (err) throw err;
      res.send({data:[], status:1, msg: '删除成功'})
      db.close;
    });
  }).catch((err)=>{
    console.log(err)
  })
});

module.exports = router;
