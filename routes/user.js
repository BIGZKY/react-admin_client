const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const User = require('../config/user')
/* GET users listing. */
router.get('/', (req, res) => {
  // let where = {$ne: {name: 'admin'}}
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

router.post('/updateUser', (req, res) => {
  let param = req.body;
  if(!param._id) {
    res.send({status: 0, msg: '缺少参数'});
    return false;
  }
  let where = {_id: ObjectID(param._id)};
  let set = {$set:{'name':param.name, 'password':param.password, 'email':param.email, 'phone': param.phone, 'role_id': param.role_id}}
  User.updateOne(where,set)
    .then(() => {
      res.send({status: 1, msg: '修改成功'});
    }).catch((err) => {
      res.send({status: 0, msg: err});
    })
})

router.post('/delUser', (req, res) => {
  let param = req.body;
  if(!param._id) {
    res.send({status: 0, msg: '缺少参数'});
    return false;
  }
  let where = {_id: ObjectID(param._id)};
  User.deleteOne(where)
    .then(() => {
      res.send({status: 1, msg: '删除成功'});
    }).catch((err) => {
      res.send({status: 0, msg: err});
    })
})

router.post('/login', (req, res) => {
  let param = req.body;
  if(!param.name || !param.password ) {
    res.send({status: 0, msg: '缺少参数'});
    return false;
  }
  let where = {name: param.name, password: param.password}
  User.findOne(where)
    .then((result) => {
      if(!result){
        res.send({status: 0, msg: '用户名或密码错误'});
      }else{
        res.send({data: result,status: 1, msg: '用户名或密码错误'});
      }
    }).catch((err) => {
      res.send({status: 0, msg: err});
    })
})

module.exports = router;
