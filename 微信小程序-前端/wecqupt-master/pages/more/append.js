//append.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
	},
	onLoad: function(){
		var that = this;
	},
	onReady: function(){
		var that = this;
		setTimeout(function(){
			that.setData({
				remind: 1
			});
		}, 1000);
	}
});