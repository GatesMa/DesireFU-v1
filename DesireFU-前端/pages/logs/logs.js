const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  onLoad: function () { },
  returnToHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onShareAppMessage: function () {
  },
  pageBack: function() {
    wx.switchTab({
      url: '../usercenter/usercenter',
    })
  }
});
