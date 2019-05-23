//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        user: ''
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        var that = this
        
        that.setData({
            user: app.globalData.user
        })
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
    signout: function() {
        app.globalData.author = ''
        app.globalData.user = ''
        wx.reLaunch({
            url: '../login/login',
        })
    }
})
