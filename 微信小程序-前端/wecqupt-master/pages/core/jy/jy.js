//jy.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
	},
	onLoad: function() {
		this.search()
	},
	onPullDownRefresh: function(){
		
	},
	search:function(){
		wx.request({
			url: app._server + "api-booksearch",
			method: 'get',
			data: {
				keyword: "撒旦"
			},
			success: function(res) {
				that.setData({
					
				})
				console.log(res)
			},
			fail: function(res) {
				if(that.data.remind == '加载中'){
					that.setData({
						remind: '网络错误'
					});
				}
				console.warn('网络错误');
			},
		})
	}
});
/*
$.ajax({
	url: "https://api.xiyoumobile.com/xiyoulibv2/book/search",
	data: data,
	success: function(res) {
		console.log(res)
	}
})
*/