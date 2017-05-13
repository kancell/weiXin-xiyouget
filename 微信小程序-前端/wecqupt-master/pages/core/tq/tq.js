//tq.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
	},
  search: function (){
    wx.request({
      url: app._server + "api-all",
      method: 'post',
      data: 's',
      success: function(data){
        console.log('data')
      }
    })
  }
})