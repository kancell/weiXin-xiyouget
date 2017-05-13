//jy.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
		jyData: {
			book_list: [],  //当前借阅列表
			books_num: 0,   //当前借阅量
			history: 0,     //历史借阅量
			dbet: 0,        //欠费
			nothing: true   //当前是否有借阅
		},
		jyHistoryTap: false //点击历史借阅
	},
	onLoad: function() {
		
	},
	onPullDownRefresh: function(){
		
	},
});