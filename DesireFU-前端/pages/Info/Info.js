// pages/Info/Info.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infos: "123456",
        author: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoad')
        console.log('尝试进入招募大厅')
        console.log(this.infos)
        if (app.globalData.user._id == '') {
            wx.reLaunch({
                url: '../login/login'
            })
        }
        var that = this;
        console.log('Info:' + 'author' + app.globalData.author)
        //如果是请求全部招募信息数据
        if (!app.globalData.author) { 
            console.log('author为空')
            wx.request({
                url: 'https://gatesma.cn:3000/info', // 仅为示例，并非真实的接口地址
                method: 'GET',
                data: {

                },
                header: {
                    'content-type': 'application/json' // 默认值x-www-form-urlencoded
                },
                success(res) {
                    app.globalData.infos = res.data
                    that.setData({
                        infos: app.globalData.infos
                    })
                    console.log(app.globalData.infos)
                }
            }) 
        } else {
            that.setData({
                author: app.globalData.author
            })
            console.log('个人招募：' + app.globalData.author)
            wx.request({
                url: 'https://gatesma.cn:3000/info?author=' + app.globalData.author, // 仅为示例，并非真实的接口地址
                method: 'GET',
                data: {

                },
                header: {
                    'content-type': 'application/json' // 默认值x-www-form-urlencoded
                },
                success(res) {
                    app.globalData.infos = res.data
                    that.setData({
                        infos: app.globalData.infos
                    })
                    console.log(app.globalData.infos)
                }
            }) 
        }
        
        
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
        // console.log('onShow')
        // app.globalData.author = ''
        // var that = this;
        // wx.request({
        //     url: 'https://gatesma.cn:3000/info', // 仅为示例，并非真实的接口地址
        //     method: 'GET',
        //     data: {

        //     },
        //     header: {
        //         'content-type': 'application/json' // 默认值x-www-form-urlencoded
        //     },
        //     success(res) {
        //         app.globalData.infos = res.data
        //         that.setData({
        //             infos: app.globalData.infos
        //         })
        //         console.log(app.globalData.infos)
        //     }
        // }) 
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
    detail: function(e) {
        var id = e.currentTarget.dataset.id;
        console.log(id);
        wx.navigateTo({
            url: '../detail/detail?id=' + id,
        })
    },
    returnToInfo: function() {
        app.globalData.author = ''
        wx.reLaunch({
            url: '../Info/Info',
        })
    }
})