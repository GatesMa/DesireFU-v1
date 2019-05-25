const Collection = require('../lib/mongo').Collection

module.exports = {
    // 创建一个收藏
    create: function create(userId, infoId, info, user) {
        pv = user.pv
        let tem = {
            userId: userId,
            infoId: infoId,
            info: info,
            user: user,
            pv: pv
        }
        return Collection.create(tem).exec()
    },
    // 通过用户ID获取所有收藏信息
    getCollectionsByUserId: function getCollectionsByUserId (userId) {
        return Collection
            .find( { userId: userId } )
            .sort({pv: -1})
            .exec()
    },
     // 通过用户id和招募id查找数据
     getIsCollectted: function getIsCollectted(userId, infoId) {
        const query = {userId: userId,infoId: infoId}

        return Collection
            .findOne(query)
            .exec()
    },
    dropCollectById: function dropCollectById(userId, infoId) {
        return Collection.deleteOne({ userId: userId, infoId: infoId}).exec()
    },
    // 获取收藏数
    getCollectionCountByuserId: function getCollectionCountByuserId(userId) {
        return Collection.count({userId: userId}).exec()
    },
    // 获取一个招募的关注数
    getFollowsContById: function getFollowsContById(infoId) {
        return Collection.count({infoId: infoId}).exec()
    },
    //通过文章 id 给 pv 加 1
    incPv: function incPv(infoId) {
        return Collection
            .update({infoId: infoId}, {$inc: {pv : 1}})
            .exec()
    },
    //通过文章 id 给 pv 减一
    delPv: function delPv(infoId) {
        return Collection
            .update({infoId: infoId}, {$inc: {pv : -1}})
            .exec()
    },
}