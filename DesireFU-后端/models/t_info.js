const Info = require('../lib/mongo').Info
const User = require('../lib/mongo').User

module.exports = {
    //创建一篇文章
    create: function create(info) {
        return Info.create(info).exec()
    },
    //通过id获取一篇招聘
    getInfoById: function getInfoById(infoId) {
        return Info
            .findOne({_id: infoId})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .exec()
    }, 
    //按创建时间降序获取所有用户招聘或者某个用户的所有招聘
    getInfos: function getInfos(author) {
        const query = {}
        if(author) {
            query.author = author
        }
        return Info
            .find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            
            .addCreatedAt()
            
            .exec()
    },

    //通过id更新一篇招募
    updateInfoById: function updateInfoById(infoId, data) {
        return Info.update({_id: infoId}, {$set: data}).exec()
    },

    // 通过 id 删除一篇招募
    delInfoById: function delInfoById (infoId) {
        return Info.deleteOne({ _id: infoId }).exec()
    },
    
    //获取所有招募数目 / 用户招募数
    getInfosCount: function getInfosCount(author) {
        const query = {}
        if(author) {
            query.author = author
        }
        return Info
            .count(query)
            .exec()
    },
}

