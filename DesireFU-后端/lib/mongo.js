
const objectIdToTimestamp = require('objectid-to-timestamp')
const moment = require('moment')
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect('mongodb://admin:passwd@47.102.121.0:27017/DesireFU?authSource=admin')


//用户
exports.User = mongolass.model('User', {
    username: {type: 'string', required: true},//账户
    pass: {type: 'string', required: true},//密码
    realname: {type: 'string', required: true},//真名
    stuid: {type: 'string', required: true},//学号
    acade: {type: 'string', required: true},//学院
    avatar: {type: 'string', default: ''},//头像
    phone: {type: 'string', required:true},//电话
    email: {type: 'string', required: true},//邮箱
    requireType: {type: 'number', required: true}, //用户类型
    isRequired: {type: 'string', required: true}
})

exports.User.index({ username: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

//招募
exports.Info = mongolass.model('Info', {
  	author: {type: Mongolass.Types.ObjectId, required: true},//用户作者
    title: {type: 'string', required: true},//标题
    type: {type: 'string', required: true},//类型（互联网➕/大创）
    content: {type: 'string', required: true},//项目内容简介
    membernum: {type: 'number', required: true},//项目人员个数
    requirement: {type: 'string', required: true}//项目招聘要求
})

exports.Info.index({ author: 1, _id: -1}).exec()// 按创建时间降序查看用户的文章列表



// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
		results.forEach(function (item) {
			item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
		})
		return results
    },
    afterFindOne: function (result) {
		if (result) {
			result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
		}
		return result
    }
})