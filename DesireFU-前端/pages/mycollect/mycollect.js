// pages/mycollect/mycollect.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collections: '',
        user: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        that.setData({
            user: app.globalData.user
        })

        wx.request({
            url: 'https://gatesma.cn:3000/info/mycollect', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                userId: this.data.user._id
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                that.setData({
                    collections: res.data
                })
                console.log(res.data)
            }
        })
        

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    returnToUserCenter: function() {
        wx.reLaunch({
            url: '../usercenter/usercenter',
        })
    },
    detail: function (e) {
        var id = e.currentTarget.dataset.id;

        // console.log(id);
        var _id = this.data.collections[id].infoId
        wx.navigateTo({
            url: '../detail/detail?_id=' + _id,
        })
    },
})