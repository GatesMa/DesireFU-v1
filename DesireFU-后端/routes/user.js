const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const sha1 = require('sha1') //加密

const UserModel = require('../models/t_user')

// GET /user 注册页
router.get('/', function (req, res) {
    res.send('/user')
})
router.post('/:userId/edit', function(req, res, next) {
    console.log('----------------edit-----------------')
    console.log('edit'+req.body)

    const userId = req.params.userId
    const username = req.body.username //账户名
    pass = req.body.pass //密码
    
    const realname = req.body.realname //真名
    const stuid = req.body.stuid //学号
    const acade = req.body.acade //学院
    const phone = req.body.phone //电话
    const email = req.body.email //邮箱

    const requireType = req.body.requireType // 用户类型
    const isRequired = req.body.isRequired //是否愿意被招募
    //明文密码加密
    pass = sha1(pass)

    //待写入数据库的用户信息
    let userEdit = {
        pass: pass,
        realname: realname,
        stuid: stuid,
        acade: acade,
        
        phone: phone,
        email: email,
        requireType: requireType,
        isRequired: isRequired
    }
    UserModel.updatUserById(userId, userEdit)
        .then(function () {
            console.log('修改用户信息成功')
            UserModel.getUserByName(username)
                .then(function(resultUser){
                    resultUser.type=0
                    res.send(resultUser)
                })
        })
        .catch(function(e) {
            console.log('修改失败')
            resultUser = {}
            resultUser.type = 1
            res.send(resultUser)
        })
})

module.exports = router