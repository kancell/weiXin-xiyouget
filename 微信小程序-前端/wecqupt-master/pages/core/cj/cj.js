//cj.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '',
		cjInfo : [

		],
		userInfo: ''
	},
	onLoad: function(){
		var that = this;
		wx.showNavigationBarLoading();
		wx.request({
			url: app._server + "api-all",
			method: 'post',
			data: {

			},
			success: function(res) {
				that.setData({
					cjInfo: res.data,
					userInfo: app._user.info
				})
			},
			fail: function(res) {
				if(that.data.remind == '加载中'){
					that.setData({
						remind: '网络错误'
					});
				}
				console.warn('网络错误');
			},
			complete: function() {
				wx.hideNavigationBarLoading();
			}
		});
	}
});