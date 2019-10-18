var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var Role = require('../config/role.js');

router.get('/', (req, res) => {
    Role.find()
        .then((roles) => {
            res.send({data:roles,status:1,msg:'查询成功'})
        })
        .catch(error => {
            res.send({status: 0,msg: '查询异常'})
        })
})

router.post('/addRole', (req, res, next) => {
    Role.create(req.body.values)
        .then(role => {
            res.send({data:role,status:1,msg:'添加成功'})
        })
        .catch(error => {
            res.send({status: 0,msg: '添加角色异常'})
        })
})

router.post('/updateRole', (req, res, next) => {
    
    var where = {"_id": ObjectID(req.body._id)};
    var set = {$set:{'menus':req.body.menus}}
    Role.update(where, set)
        .then(role => {
            res.send({data:role,status:1,msg:'设置成功'})
        })
        .catch(error => {
            res.send({status: 0,msg: '设置权限异常'})
        })
})

module.exports = router;
