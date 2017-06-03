//cj.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '',
		re: true,
		userInfo: '',
		check: '',
		cjInfo : [],
		loginInfo: ''
	},
	onLoad: function(){
		var that = this;
		wx.showNavigationBarLoading();
		wx.request({
			url: app._server + "api-all",
			method: 'post',
			success: function(res) {
				if(res.statusCode === 400){
					that.setData({
						re: true
					});
					wx.getStorage({
						key: 'oYIvq0D8WaU_1Ox7lx4Z15FjcSMw',
						success: function(res) {
							that.setData({
								'loginInfo': res.data
							})
						} 
					})		
				}
				else{
					wx.getStorage({
						key:'studentinfo',
						success: function(res){
							that.setData({
								'userInfo': res.data
							})
						}
					})
					that.setData({
						cjInfo: res.data,				
						re: false
					})
				}
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
	},
	reSearch: function(){
		var that = this
		app.showLoadToast('绑定中');
		wx.request({
			method: 'POST',
			url: app._server + 'api-login',
			data: {
				__VIEWSTATE: 'dDwtNTE2MjI4MTQ7Oz5O9kSeYykjfN0r53Yqhqckbvd83A==',
				txtUserName: that.data.loginInfo.txtUserName,
				TextBox2: that.data.loginInfo.TextBox2,
				txtSecretCode: that.data.check,
				RadioButtonList1: '学生',
				Button1: ''
			},
			success: function(res) {
				setTimeout(function(){
					that.onLoad()
				},0)	
			},
			fail: function(res){
				wx.hideToast();
				app.showErrorModal(res.errMsg, '绑定失败');
			}
		});
	},
	checkInput: function(e) {
		this.setData({
			check: e.detail.value
		});
	} 
});