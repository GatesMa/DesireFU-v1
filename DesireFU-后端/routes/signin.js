const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const UserModel = require('../models/t_user')

// GET /signin 登录页
router.get('/', function (req, res, next) {
  res.send('登录页')
})

// POST /signin 用户登录
router.post('/', function (req, res, next) {
    console.log(req.body)
    const username = req.body.username //账户名
    const pass = req.body.pass //密码

    //检验参数
    // try {
    //     if (!name.length) {
    //         throw new Error('请填写用户名')
    //     }
    //     if (!password.length) {
    //         throw new Error('请填写密码')
    //     }
    // } catch(e) {
    //     console.log('出错了')
    // }

    type = 0

    UserModel.getUserByName(username) 
        .then(function(user) {
            if(!user) {
                type = 1 //用户名不存在
            }
            //检查密码是否匹配
            if(sha1(pass) !== user.pass) {
                type = 2 //用户名或密码错误
            }
            
            user.type = type
            res.send(JSON.stringify(user));
        })
        .catch(next)

})

module.exports = router