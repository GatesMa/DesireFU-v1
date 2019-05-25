//// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        pass: '',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        remind: '加载中'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        console.log('login:userInfo' + this.userInfo)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      var that = this;
      setTimeout(function () {
        that.setData({
          remind: ''
        });
      }, 1000);
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
            url: 'https://gatesma.cn:3000/signin',
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
                    if (app.globalData.userInfo) {
                        // console.log('userInfo:' + userInfo)
                        app.globalData.user.avatar = app.globalData.userInfo.avatarUrl
                    } else {
                        console.log('userInfo为空')
                    }
                        
                    console.log(app.globalData.user._id)

                    wx.switchTab({
                        url: '../Info/Info',
                        fail: function () { 
                            console.log("跳转失败") 
                        }
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
              } else if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(e.detail.value.email))) {
                wx.showModal({
                  title: '提示',
                  content: '邮箱有误',
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
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })

    }
})