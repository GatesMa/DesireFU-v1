// pages/Info/Info.js
const app = getApp()
var ip=app.ip
Page({

    /**
     * 页面的初始数据
     */
    data: {
        len: 1,
        infos: [],
        limit: 6, //当前页的数据条数
        pageIndex: 0, //页码
        showinfos:[],
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
                url: ip+'/info', 
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
                  var teminfos = []

                  for (let i = 0; i < that.data.limit; i++) {
                    teminfos[i] = that.data.infos[i]
                  }
                  if (that.data.infos.length > that.data.limit) {
                    that.setData({
                      showinfos: teminfos,
                      len: Math.floor((that.data.infos.length - 1) / that.data.limit)+1
                    })
                  }
                  else {
                    that.setData({
                      showinfos: that.data.infos,
                       len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
                    })
                  }
                  console.log(that.data.infos)
                  console.log(that.data.showinfos)
                }
            }) 
        } else {
            that.setData({
                author: app.globalData.author
            })
            console.log('个人招募：' + app.globalData.author)
            wx.request({
                url: ip+'/info?author=' + app.globalData.author, // 仅为示例，并非真实的接口地址
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
                  var teminfos = []
                  
                  for (let i = 0; i < that.data.limit; i++) {
                    teminfos[i] = that.data.infos[i]
                  }
                  if (that.data.infos.length>that.data.limit){
                    that.setData({
                      showinfos: teminfos,
                      len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
                    })
                  }
                  else {
                    that.setData({
                      showinfos:that.data.infos,
                      len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
                    })
                  }
                  console.log(that.data.infos)
                  console.log(that.data.showinfos)
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
      wx.showLoading({
        title: '加载中'
      })
      var that=this
      that.setData({
        pageIndex:0
      })
      if (!app.globalData.author) {
        console.log('author为空')
        wx.request({
          url: ip + '/info',
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
            var teminfos = []

            for (let i = 0; i < that.data.limit; i++) {
              teminfos[i] = that.data.infos[i]
            }
            if (that.data.infos.length > that.data.limit) {
              that.setData({
                showinfos: teminfos,
                len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
              })
            }
            else {
              that.setData({
                showinfos: that.data.infos,
                len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
              })
            }
            console.log(that.data.infos)
            console.log(that.data.showinfos)
          }
        })
      } else {
        that.setData({
          author: app.globalData.author
        })
        console.log('个人招募：' + app.globalData.author)
        wx.request({
          url: ip + '/info?author=' + app.globalData.author, // 仅为示例，并非真实的接口地址
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
            var teminfos = []

            for (let i = 0; i < that.data.limit; i++) {
              teminfos[i] = that.data.infos[i]
            }
            if (that.data.infos.length > that.data.limit) {
              that.setData({
                showinfos: teminfos,
                len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
              })
            }
            else {
              that.setData({
                showinfos: that.data.infos,
                len: Math.floor((that.data.infos.length - 1) / that.data.limit) + 1
              })
            }
            console.log(that.data.infos)
            console.log(that.data.showinfos)
          }
        })
      }
      console.log('onPullDownRefresh')
    // 3秒模拟数据加载
    setTimeout(function () {
      // 不加这个方法真机下拉会一直处于刷新状态，无法复位
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }, 1000)
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
  },
  next: function (e) {
    var that = this
    if (that.data.infos.length<=that.data.limit) {
      wx.showModal({
        title: '提示',
        content: '亲，最后一页了~',
        showCancel: false
      })
      return false
    }
    if (that.data.pageIndex == Math.floor((that.data.infos.length-1) / that.data.limit)) {
      wx.showModal({
        title: '提示',
        content: '亲，最后一页了~',
        showCancel: false
      })
      return false
    }
    var idx = that.data.pageIndex + 1
    that.setData({
        pageIndex: idx
    })
    if (that.data.pageIndex == Math.floor((that.data.infos.length-1) / that.data.limit)) {
      //显示剩余的条数
      var teminfos = []
      for (let i = 0; i < Math.floor((that.data.infos.length-1) % that.data.limit)+1; i++) {
        teminfos[i] = that.data.infos[i + that.data.pageIndex * that.data.limit]
      }
      that.setData({
        showinfos:teminfos
      })
    }
    else {
      //显示
      var teminfos = []
      for (let i = 0; i < that.data.limit; i++) {
        teminfos[i] = that.data.infos[i + that.data.pageIndex * that.data.limit]
      }
      that.setData({
        showinfos: teminfos
      })
    }
    console.log(that.data.infos)
    console.log(that.data.showinfos)
  },
  //上一页
  last: function (e) {
    var that = this
    if (that.data.pageIndex == 0) {
      wx.showModal({
        title: '提示',
        content: '亲, 没有上一页了~',
        showCancel: false
      })
      return false
    }
    else {
      var lastpageIndex = that.data.pageIndex - 1
      that.setData({
        pageIndex: lastpageIndex
      })
      var teminfos = []
      for (let i = 0; i < that.data.limit; i++) {
        teminfos[i] = that.data.infos[i + that.data.pageIndex * that.data.limit]
      }
      that.setData({
        showinfos: teminfos
      })
    }
    console.log(that.data.infos)
    console.log(that.data.showinfos)
  }
})