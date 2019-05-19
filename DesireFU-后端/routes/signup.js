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
    const acade = req.body.academy //学院
    const phone = req.body.phone //电话
    const email = req.body.email //邮箱

    const avatar = '' //头像
    //校验参数
    try {
        if(!(username.length >= 1 && username.length <= 10)) {
            throw new Error('名字限制在1-10个字符')
        }
        if(pass.length < 6) {
            throw new Error('密码至少 6 个字符')
        }
        if(pass !== repass) {
            throw new Error('两次输入的密码不一致')
        }
        if(!(realname.length >= 1 && realname.length <= 30)) {
            throw new Error('真名限制在1-30个字符')
        }
        if(stuid.length != 13) {
            throw new Error('输入正确的学号')
        }
        if(!(acade.length >= 1 && acade.length <= 30)) {
            throw new Error('学院在1-30个字符')
        }
        if( phone.length != 11 ) {
            throw new Error('电话不对')
        }
        
    } catch (e) {
        // 注册失败，异步删除上传的头像
        //do something here
    }

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
        email: email
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
            res.end(JSON.stringify(resUser));
            
            console.log('-----------------3---------------')
            
        })
        .catch(function(e) {
            console.log('-----------------4---------------')
            console.log(e)
            //注册失败
        })
    console.log('-----------------6---------------')

})

module.exports = router