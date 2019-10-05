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
    var whereStr = { "id": req.body.category_id };
    var updateStr = {$set: { "categoryName" : req.body.categoryName }};
    db.collection("category").updateOne(whereStr, updateStr, function(err, result) {
      if (err) throw err;
      res.sendStatus(200)
      db.close;
    });
  }).catch((err)=>{
    console.log(err)
  })
});
  
module.exports = router;
