//more.js
//获取应用实例
var app = getApp();
Page({
	data: {
		user: {}
	},
	onShow: function(){
		this.getData();
	},
	getData: function(){
		var that = this;
		var days = ['一','二','三','四','五','六','日'];
		that.setData({
			'user': app._user,
			'time': {
				'term': app._time.term,
				'week': app._time.week,
				'day': days[app._time.day - 1]
			},
			'bind': app._user.bind
		});
	}
});