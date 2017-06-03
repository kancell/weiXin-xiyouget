//kb.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
		list: [
			{
				date: '星期一', 
				data:[
					{index:'现代控制理论',time: '08:00-10:00',room: 'A541'},
					{index:'数字控制系统设计',time: '16:30-18:30',room: 'A112'}
				]
			},
			{
				date: '星期二', 
				data:[
					{index:'现代控制理论',time: '08:00-10:00',room: 'A541'}
				]
			}
		],
	},
	onLoad: function(){
		var that = this
		wx.getStorage({
			key:'studentinfo',
			success: function(res){
				console.log(res)
				that.setData({
					'userInfo': res.data
				})
			}
		})
	}	
})