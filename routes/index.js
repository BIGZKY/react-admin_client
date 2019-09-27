var express = require('express');
var router = express.Router();

var {mongo} = require('../config/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  mongo.then((db)=>{
    var myobj =  [
        { name: '菜鸟工dsgffg具', url: 'https://c.runoob.com', type: 'cn'},
      ];
    var whereStr = {"name":'家电'};
    db.collection("category").find(whereStr).toArray(function(err, result) {
      if (err) throw err;
      res.send({data:result, status:1, msg: '查询成功'})
      db.close;
      
    });
  }).catch((err)=>{
    console.log(err)
  })
});
  
module.exports = router;
