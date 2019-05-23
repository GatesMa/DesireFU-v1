const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const sha1 = require('sha1') //加密

const UserModel = require('../models/t_user')

// GET /signup 注册页
router.get('/', function (req, res) {
    res.send('注册用户页面，提交数据请使用post')
})

// POST /signup 用户注册
router.post('/', function (req, res) {
    
    console.log(req.body)
    const username = req.body.username //账户名
    pass = req.body.pass //密码
    const repass = req.body.repass // 重复密码
    const realname = req.body.realname //真名
    const stuid = req.body.stuid //学号
    const acade = req.body.acade //学院
    const phone = req.body.phone //电话
    const email = req.body.email //邮箱

    const avatar = req.body.avatar //头像

    const requireType = req.body.requireType // 用户类型
    const isRequired = req.body.isRequired //是否愿意被招募

    

    //明文密码加密
    pass = sha1(pass)

    //待写入数据库的用户信息
    let user = {
        username: username,
        pass: pass,
        realname: realname,
        stuid: stuid,
        acade: acade,
        avatar: avatar,
        phone: phone,
        email: email,
        requireType: requireType,
        isRequired: isRequired
    }

    resUser = {}

    console.log('-----------------1---------------')

    //用户信息写入数据库
    UserModel.create(user)
        .then(function(result) {
            console.log('-----------------2---------------')
            //-----插入数据库成功
            //此user是插入 mongodb 后的值， 包含_id

            resUser = result.ops[0]
            resUser.type = 0
            res.end(JSON.stringify(resUser));
            
            console.log('-----------------3---------------')
            
        })
        .catch(function(e) {
            console.log('-----------------4---------------')
            console.log(e)
            //注册失败
            resUser.type = 1
            res.end(JSON.stringify(resUser));
        })
    console.log('-----------------6---------------')

})

module.exports = router