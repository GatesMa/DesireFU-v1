// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        requireInput: '',
        userList: '',
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
            url: 'https://gatesma.cn:3000/info/user', // 仅为示例，并非真实的接口地址
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
            }

        })


    }
})