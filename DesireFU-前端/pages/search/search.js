// pages/search/search.js
const app=getApp()
const ip=app.ip
Page({

    /**
     * 页面的初始数据
     */
    data: {
        len: 1,
        limit: 10, //当前页的数据条数
        pageIndex: 0, //页码
        showinfos: [],
        requireInput: '',
        userList: [],
        isSearched: false,
        length: 0
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
        this.setData({
            isSearched: false,
            userList: '',
            length: 0
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    check: function(e){
        var id = e.currentTarget.dataset.index;
        let tempUser = JSON.stringify(this.data.userList[id]);
        wx.navigateTo({
            url: '../person/person?detail=' + tempUser
            
        })
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
    requireInput: function (e) {
        this.setData({
            requireInput: e.detail.value
        })
    },
    search: function () {
        var that = this
        var id
        if (this.data.requireInput == '美工') {
            id = 1
        } else if (this.data.requireInput == '文案') {
            id = 2
        } else if (this.data.requireInput == '编程') {
            id = 3
        } else if (this.data.requireInput == '答辩') {
            id = 4
        } else if (this.data.requireInput == '调研') {
            id = 5
        } else if (this.data.requireInput == '') {
            id = 0
        } else {
            this.setData({
                userList: '',
                length: 0,
                isSearched: true
            })
            console.log('userList为空')

            return
        }

        wx.request({
            url: ip+'/info/user', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                requireType: id
            },
            header: {
                'content-type': 'application/json' // 默认值x-www-form-urlencoded
            },
            success(res) {
                console.log('请求成功...')
                that.setData({
                    isSearched: true,
                    userList: res.data,
                    length: res.data.length
                })
                console.log('userList:' + res.data)
                console.log('length:' + res.data.length)
              var teminfos = []

              for (let i = 0; i < that.data.limit; i++) {
                teminfos[i] = that.data.userList[i]
              }
              if (that.data.userList.length > that.data.limit) {
                that.setData({
                  showinfos: teminfos,
                  len: Math.floor((that.data.userList.length - 1) / that.data.limit) + 1
                })
              }
              else {
                that.setData({
                  showinfos: that.data.userList,
                  len: Math.floor((that.data.userList.length - 1) / that.data.limit) + 1
                })
              }
              console.log(that.data.userList)
              console.log(that.data.showinfos)

            }

        })
    },
  next: function (e) {
    var that = this
    if (that.data.userList.length <= that.data.limit) {
      wx.showModal({
        title: '提示',
        content: '亲，最后一页了~',
        showCancel: false
      })
      return false
    }
    if (that.data.pageIndex == Math.floor((that.data.userList.length-1) / that.data.limit)) {
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
    if (that.data.pageIndex == Math.floor((that.data.userList.length-1) / that.data.limit) ) {
      //显示剩余的条数
      var teminfos = []
      for (let i = 0; i < Math.floor((that.data.userList.length - 1) % that.data.limit) + 1; i++) {
        teminfos[i] = that.data.userList[i + that.data.pageIndex * that.data.limit]
      }
      that.setData({
        showinfos: teminfos
      })
    }
    else {
      //显示
      var teminfos = []
      for (let i = 0; i < that.data.limit; i++) {
        teminfos[i] = that.data.userList[i + that.data.pageIndex * that.data.limit]
      }
      that.setData({
        showinfos: teminfos
      })
    }
    console.log(that.data.userList)
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
        teminfos[i] = that.data.userList[i + that.data.pageIndex * that.data.limit]
      }
      that.setData({
        showinfos: teminfos
      })
    }
    console.log(that.data.userList)
    console.log(that.data.showinfos)
  }
})