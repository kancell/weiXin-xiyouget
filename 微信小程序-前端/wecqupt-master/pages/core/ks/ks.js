//ks.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
		list: [{type:'数字控制系统设计',date: '16:30-18:30',time:'2017年05月05日',room: 'A112',number: '4'},{type:'现代控制理论',date: '08:00-10:00',time:'2017年05月09日',room: 'A541',number: '17'}],
		userInfo: ''
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
});
