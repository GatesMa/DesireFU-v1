// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        pass: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    /**
     * 用户名
     */
    nameChange: function(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let { username, pass} = e.detail.value;
        
        if (!username || !pass) {
            //弹出提示，用户名或密码为空
            return;
        }
        this.setData({
            username,
            pass,
        })
        wx.request({
            url: 'https://gatesma.cn:3000/signin', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                username: e.detail.value.username,
                pass: e.detail.value.pass
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                if(res.data.type == 0) {
                    //密码正确
                    wx.showToast({
                        title: '登陆成功',
                        icon: 'success',
                        duration: 1000
                    })
                    console.log(res.data)
                    app.globalData.user = res.data;
                    app.globalData.user.avatar = app.globalData.userInfo.avatarUrl
                    console.log(app.globalData.user._id)

                    wx.reLaunch({
                        url: '../Info/Info'
                    })

                } else if(res.data.type == 1) {
                    //用户不存在
                    wx.showModal({
                        title: '提示',
                        content: '用户不存在',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                } else if(res.data.type == 2) {
                    //用户名或密码错误
                    wx.showModal({
                        title: '提示',
                        content: '用户名或密码错误',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            }
        })

    },
    navToRegister: function() {
        wx.navigateTo({
            url: '../register/register',
        })
    }
})