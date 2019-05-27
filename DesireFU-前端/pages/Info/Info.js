// pages/Info/Info.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infos: "123456",
        author: '',
        swiperList: [{
        id: 0,
        type: 'image',
          url: 'https://www.gatesma.cn/myfile/img/swiper1.png'
      }, {
        id: 1,
        type: 'image',
            url: 'https://www.gatesma.cn/myfile/img/swiper2.png',
      }, {
        id: 2,
        type: 'image',
            url: 'https://www.gatesma.cn/myfile/img/swiper3.png'
      }, {
        id: 3,
        type: 'image',
            url: 'https://www.gatesma.cn/myfile/img/swiper4.png'
      }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.towerSwiper('swiperList');
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
        var _id = this.data.infos[id]._id
        wx.navigateTo({
            url: '../detail/detail?_id=' + _id,
        })
    },
    returnToInfo: function() {
        app.globalData.author = ''
        wx.reLaunch({
            url: '../Info/Info',
        })
    },
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})