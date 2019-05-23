// pages/detail/detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        info: null,
        user: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(options.id)
        that.setData({
            id: options.id
        })
        var id = options.id
        this.setData({
            info: app.globalData.infos[id]
        })
        console.log("id :" + this.id)
        console.log("info :" + that.info)
        this.setData({
            user: app.globalData.user
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
    returnToInfo: function() {
        wx.reLaunch({
            url: '../Info/Info'
        })
    },
    removeInfo: function(e) {
        var infoId = e.currentTarget.dataset.id;
        console.log('remove:' + infoId);
        
        wx.request({
            url: 'https://gatesma.cn:3000/info/' + infoId + '/remove', // 仅为示例，并非真实的接口地址
            method: 'GET',
            data: {

            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                wx.showModal({
                    title: '提示',
                    content: '删除成功',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                wx.reLaunch({
                    url: '../Info/Info',
                })
            }
        })
    }
})