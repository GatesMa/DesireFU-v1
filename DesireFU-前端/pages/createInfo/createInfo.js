// pages/createInfo/createInfo.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        picker: ['互联网➕', '大创', '其他'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    pickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
    formSubmit: function(e) {
        e.detail.value.type = this.data.picker[Number(e.detail.value.type)]
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        if (e.detail.value.title.length <= 3) {
            //名字限制在3-10字符
            wx.showModal({
                title: '提示',
                content: '标题应大于3字符',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.content.length < 50) {
            //密码至少6字符
            wx.showModal({
                title: '提示',
                content: '项目内容至少50字符',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.membernum > 15 || e.detail.value.membernum <= 0) {
            //两次输入密码不同
            wx.showModal({
                title: '提示',
                content: '项目目前人数有误',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.requirement < 10) {
            //学号有误
            wx.showModal({
                title: '提示',
                content: '招募要求大于10字符',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            //数据正确，发起网络请求
            console.log('发起注册网络请求')
            wx.request({
                url: 'https://gatesma.cn:3000/Info/create', // 仅为示例，并非真实的接口地址
                method: 'POST',
                data: {
                    title: e.detail.value.title,
                    type: e.detail.value.type,
                    content: e.detail.value.content,
                    membernum: e.detail.value.membernum,
                    requirement: e.detail.value.requirement,
                    author: app.globalData.user._id

                },
                header: {
                    'content-type': 'application/json' // 默认值x-www-form-urlencoded
                },
                success(res) {
                    console.log('请求发布招募成功...')
                    //注册成功
                    wx.showToast({
                        title: '注册成功',
                        icon: 'success',
                        duration: 1000
                    })
                    console.log(res.data)
                    wx.reLaunch({
                        url: '../Info/Info'
                    })

                }
            })
        }
    },
    pageBack: function() {
     wx.switchTab({
       url: '../usercenter/usercenter',
     })
    }
})