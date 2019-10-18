var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var Role = require('../config/role.js');

router.post('/addRole', (req, res, next) => {
    Role.create(req.body.values)
        .then(role => {
            res.send({data:role,status:1,msg:'添加成功'})
        })
        .catch(error => {
            res.send({status: 0,msg: '添加角色异常'})
        })
})

module.exports = router;
