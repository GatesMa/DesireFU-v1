// pages/detail/detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _id: '', //文章ID
        info: null,
        user: null,
        phoneNumber: null,
        isCollected: 'false'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(options._id)
        that.setData({
            _id: options._id
        })
        
        
        console.log("_id :" + this.data._id)
        
        this.setData({
            user: app.globalData.user
        })


        var infoId = this.data._id
        var userId = this.data.user._id
        wx.request({
            url: 'https://gatesma.cn:3000/info/' + infoId, // 仅为示例，并非真实的接口地址
            method: 'GET',
            data: {
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                that.setData({
                    info: res.data
                })
            }
        })

        //获取是否收藏这篇文章
        wx.request({
            url: 'https://gatesma.cn:3000/info/' + infoId + '/isCollected', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                userId: userId
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                that.setData({
                    isCollected: res.data.isCollect
                })
                console.log('type:'+typeof(res.data.isCollect))
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
    call: function(){
      wx.makePhoneCall({
        phoneNumber: this.data.info.author.phone,
      })
    },
    pageBack: function() {
      wx.switchTab({
        url: '../Info/Info',
      })
    },
    removeInfo: function(e) {
        var infoId = this.data.info._id
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
    },
    collect: function() {
        var that = this
        var infoId = this.data.info._id
        var userId = this.data.user._id
        console.log('collect:' + infoId + '+' + userId);

        wx.request({
            url: 'https://gatesma.cn:3000/info/' + infoId + '/collect', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                userId: userId
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                wx.showModal({
                    title: '提示',
                    content: '收藏成功',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                console.log('collect successfully')
                wx.reLaunch({
                    url: '../detail/detail?_id=' + that.data._id
                })
            }
        })
    },
    dropcollect: function() {
        var that = this
        var infoId = this.data.info._id
        var userId = this.data.user._id
        console.log('dropcollect:' + infoId + '+' + userId);

        wx.request({
            url: 'https://gatesma.cn:3000/info/' + infoId + '/dropcollect', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                userId: userId
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                wx.showModal({
                    title: '提示',
                    content: '取消收藏成功',
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                console.log('dropcollect successfully')
                wx.reLaunch({
                    url: '../detail/detail?_id=' + that.data._id
                })
            }
        })
    }
})