const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec()
    },
    // 通过用户名获取用户信息
    getUserByName: function getUserByName (username) {
        return User
        .findOne( { username: username } )
        .addCreatedAt()
        .exec()
    },
    //通过id获取用户信息
    getUserById: function getUserById(id) {
        return User
            .findOne({_id: id})
            .exec()
    },
    //通过用户类型获取用户
    getUsersByRequireType: function getUsersByRequireType(requireType) {
        const query = {isRequired: 'yes'}
        console.log('getUser:' + requireType)
        if(requireType) {
            query.requireType = Number(requireType)
        }
        return User
            .find(query)
            .exec()
    },
    //修改信息
    //通过文章id更新一篇文章
    updatUserById: function updatUserById(postId, data) {
        return User.updateOne({_id: postId}, {$set: data}).exec()
    },
}