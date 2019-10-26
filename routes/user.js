const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const User = require('../config/user')

//登录
router.post('/login', (req, res) => {
  let where = {}
  User.findOne(where)
})

/* GET users listing. */
router.get('/', (req, res) => {
  User.find()
    .then((data) => {
      res.send({data:data, status: 1, msg: '查询成功'});
    }).catch((err) => {
      res.send({status: 0,msg: err});
    })
})

router.post('/addUser', (req, res) => {
  let param = req.body;
  console.log(param)
  if(!param.name || !param.password) {
    res.send({status: 0, msg: '缺少参数'});
    return false;
  }
  param.create_time = new Date().getTime();
  
  User.create(param)
    .then(() => {
      res.send({status: 1,msg: '添加成功'});
    }).catch((err) => {
      res.send({status: 0, msg: err});
    })
})

router.post('/delUser', (req, res) => {
  let param = req.body;
  if(param._id) {
    res.send({status: 0, msg: '缺少参数'});
    return false;
  }
  let where = {_id: ObjectID(param._id)};
  User.deleteOne(where)
    .then(() => {
      res.send({status: 1, msg: '注册成功'});
    }).catch((err) => {
      res.send({status: 0, msg: err});
    })
})

module.exports = router;
