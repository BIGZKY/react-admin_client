const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const path = require('path');

const Role = require('../config/role.js');

router.get('/', (req, res) => {
    Role.find()
        .then((roles) => {
            res.send({data:roles,status:1,msg:'查询成功'})
        }).catch(error => {
            res.send({status: 0,msg: '查询异常'})
        })
})

router.post('/addRole', (req, res, next) => {
    let param = req.body.values;
    param.create_time = new Date().getTime();
    Role.create(param)
        .then(role => {
            res.send({data:role,status:1,msg:'添加成功'})
        }).catch(error => {
            res.send({status: 0,msg: '添加角色异常'})
        })
})

router.post('/updateRole', (req, res) => {
    
    let where = {"_id": ObjectID(req.body._id)};
    let auth_time = new Date().getTime();
    console.log(req.body._id)
    let set = {$set:{'menus':req.body.menus, 'auth_name':req.body.auth_name, 'auth_time':auth_time}}
    Role.update(where, set)
        .then(role => {
            res.send({status:1,msg:'设置成功'})
        }).catch(error => {
            res.send({status: 0,msg: error})
        })
})

router.post('/delRole', (req, res) => {
    var where = {_id: ObjectID(req.body._id)}
    Role.deleteOne(where)
        .then(() => {
            res.send({status: 1,msg: '删除成功'});
        }).catch((err) => {
            res.send({status: 0, msg: err});
        })
})

module.exports = router;
