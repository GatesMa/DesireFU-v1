// pages/edit/edit.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: '',
        picker: ['计算机学院', '材料科学与工程学院', '电气信息学院', '电子信息学院', '法学院', '高分子科学与工程学院',
        '公共管理学院', '华西公共卫生学院', '华西口腔医学院', '华西临床医学院', '华西药学院', '化学学院',
        '化学工程学院', '建筑与环境学院', '经济学院', '匹兹堡学院', '历史文化学院　（旅游学院）', '轻纺与食品学院',
        '软件学院', '商学院', '生命科学学院', '数学学院', '水利水电学院', '外国语学院', '文学与新闻学院', '物理科学与技术学院',
        '艺术学院', '制造科学与工程学院'
      ],
        picker2: ['美工', '文案', '编程', '答辩', '调研'],
        items: [{
                name: 'yes',
                value: '是',
                checked: 'true'
            },
            {
                name: 'no',
                value: '否'
            },
        ],
        isRequired: 'yes'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this

        that.setData({
            user: app.globalData.user
        })
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
    pageBack: function () {
    wx.switchTab({
      url: '../usercenter/usercenter',
    })
    },
    pickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
  pickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
  },
    formSubmit: function(e) {
        var that = this
        e.detail.value.acade = this.data.picker[Number(e.detail.value.acade)]
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        var isRequired = this.data.isRequired

        if (e.detail.value.username.length >= 10 || e.detail.value.username.length <= 3) {
            //名字限制在3-10字符
            wx.showModal({
                title: '提示',
                content: '名字限制在3-10字符',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.pass.length < 6) {
            //密码至少6字符
            wx.showModal({
                title: '提示',
                content: '密码至少6字符',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.pass != e.detail.value.repass) {
            //两次输入密码不同
            wx.showModal({
                title: '提示',
                content: '两次输入密码不同',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.stuid.length != 13) {
            //学号有误
            wx.showModal({
                title: '提示',
                content: '学号有误',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (e.detail.value.profile.length <= 20) {
          //电话有误
          wx.showModal({
            title: '提示',
            content: '个人介绍太短',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }  else if (e.detail.value.phone.length != 11) {
            //电话有误
            wx.showModal({
                title: '提示',
                content: '电话有误',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            e.detail.value.requireType = Number(e.detail.value.requireType)
            //数据正确，发起网络请求

            console.log('发起注册网络请求')

            wx.request({
                url: 'https://gatesma.cn:3000/user/' + this.data.user._id +'/edit', // 仅为示例，并非真实的接口地址
                method: 'POST',
                data: {
                    
                    username: e.detail.value.username,
                    pass: e.detail.value.pass,
                    realname: e.detail.value.realname,
                    stuid: e.detail.value.stuid,
                    acade: e.detail.value.acade,
                    phone: e.detail.value.phone,
                    email: e.detail.value.email,
                    profile: e.detail.value.profile,
                    requireType: e.detail.value.requireType + 1,
                    isRequired: isRequired
                },
                header: {
                    'content-type': 'application/json' // 默认值x-www-form-urlencoded
                },
                success(res) {
                    console.log('请求成功...')

                    if (res.data.type == 0) {
                        //修改成功
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 1000
                        })
                        console.log('修改成功--' + res.data)
                        app.globalData.user = res.data;
                        that.setData({
                            user: res.data
                        })
                        console.log('修改成功' + app.globalData.user._id)
                        wx.reLaunch({
                            url: '../usercenter/usercenter'
                        })
                    } else if(res.data.type == 1) {
                        wx.showToast({
                            title: '修改失败',
                            icon: 'fail',
                            duration: 1000
                        })
                    } 
                }
            })
        }
    },
    radioChange(e) {
        var that = this
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        that.setData({
            isRequired: e.detail.value
        })
    }
})