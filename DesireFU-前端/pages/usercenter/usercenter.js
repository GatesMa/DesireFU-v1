//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        user: '',
        skin: 'https://static.sesine.com/wechat-weapp-movie/images/user_bg_1.jpg'
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        var that = this

        that.setData({
            user: app.globalData.user
        })
    },
    onShow: function() {
        var that = this
        wx.getStorage({
            key: 'skin',
            success: function(res) {
                if (res.data == "") {
                    that.setData({
                        skin: config.skinList[0].imgUrl
                    })
                } else {
                    that.setData({
                        skin: res.data
                    })
                }
            }
        })
    },
    onShareAppMessage: function() {

    },
    myInfos: function() {
        console.log('redirectTo Info...')
        app.globalData.author = app.globalData.user._id
        console.log('redirectTo Info...' + app.globalData.author)
        wx.reLaunch({
            url: '../Info/Info',
        })
        console.log('redirectTo Info...')
    },
    createInfo: function() {
        wx.reLaunch({
            url: '../createInfo/createInfo',
        })
    },
    edit: function() {
        wx.reLaunch({
            url: '../edit/edit',
        })
    },
    myCollection: function() {
        wx.reLaunch({
            url: '../mycollect/mycollect',
        })
    },
    signout: function() {
        app.globalData.author = ''
        app.globalData.user = ''
        wx.reLaunch({
            url: '../login/login',
        })
    },
    aboutUs: function() {
        wx.navigateTo({
            url: '../about/about',
        })
    },
    log: function() {
        wx.navigateTo({
            url: '../logs/logs',
        })
    },
    viewSkin: function() {
        wx.navigateTo({
            url: "../skin/skin"
        })
    }
})