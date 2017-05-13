//index.js
//获取应用实例
var app = getApp();
Page({
	onShow: function(){
		var that = this
		that.setData({
			bind: app._user.bind,
			remind: ""
		});
	},
	disabled_item: function(){
		wx.showToast({
			title: '请先绑定',
		});
	},	
	//页面返回时重新加载user.bind，判断状态
	data: {
		offline: false,
		remind: '加载中',
		bind: false,
		core: [
			{ id: 'kb', name: '课表查询'},
			{ id: 'cj', name: '成绩查询'},
			{ id: 'ks', name: '考试安排'},
			{ id: 'kjs', name: '空教室'},
			{ id: 'xs', name: '学生查询'},
			{ id: 'jy', name: '借阅信息'},
			{ id: 'kd', name: '快递信息'},
			{ id: 'tq', name: '天气预报'}
		],
		card: {
			user: {
				
			},
			'kb': {
				show: false,
				time_list: [
					{ begin: '8:00', end: '8:45' },
					{ begin: '8:55', end: '9:40' },
					{ begin: '10:05', end: '10:50' },
					{ begin: '11:00', end: '11:45' },
					{ begin: '14:00', end: '14:45' },
					{ begin: '14:55', end: '15:40' },
					{ begin: '16:05', end: '16:50' },
					{ begin: '17:00', end: '17:45' },
					{ begin: '19:00', end: '19:45' },
					{ begin: '19:55', end: '20:40' },
					{ begin: '20:50', end: '21:35' },
					{ begin: '21:45', end: '22:30' }
				],
				data: {}
			},
		},
	}
	//分享
});