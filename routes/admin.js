var express = require('express');
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
    var whereStr = { "_id": req.body.category_id };
    console.log(whereStr)
    db.collection("category").update(whereStr,{$set:{name:req.body.categoryName}}).toArray(function(err, result) {
      if (err) throw err;
      res.send({data:[], status:1, msg: '更新成功'})
      db.close;
      
    });
  }).catch((err)=>{
    console.log(err)
  })
});
  
module.exports = router;
