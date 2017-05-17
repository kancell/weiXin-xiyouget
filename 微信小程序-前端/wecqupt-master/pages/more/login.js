//login.js
//获取应用实例
var app = getApp();
Page({
	data: {
		remind: '加载中',
		userid: '',
		passwd: '',
		check: '',
		angle: 0
	},
	onReady: function(){
		var that = this;
			that.setData({
				remind: ''
			});
	},
	bind: function() {
		/*if(app.g_status){
			app.showErrorModal(app.g_status, '绑定失败');
			return;
		}*/
		var that = this
		if(!this.data.userid || !this.data.passwd){
			app.showErrorModal('账号及密码不能为空', '提醒');
			return false;
		}
		/*if(!app._user.openid){
			app.showErrorModal('未能成功登录', '错误');
			return false;
		}*/
		app.showLoadToast('绑定中');
		wx.request({
			method: 'POST',
			url: app._server + 'api-login',
			data: {
				__VIEWSTATE: 'dDwtNTE2MjI4MTQ7Oz5O9kSeYykjfN0r53Yqhqckbvd83A==',
				txtUserName: that.data.userid,
				TextBox2: that.data.passwd,
				txtSecretCode: that.data.check,
				RadioButtonList1: '学生',
				Button1: ''
			},
			success: function(res) {
				app.showLoadToast('请稍候');
				if(res.statusCode === 200){
					wx.getStorage({
					key: 'openid',
						success: function(res) {
							console.log(res.data.id)
							app.saveCache(res.data.id, {
								__VIEWSTATE: 'dDwtNTE2MjI4MTQ7Oz5O9kSeYykjfN0r53Yqhqckbvd83A==',
								txtUserName: that.data.userid,
								TextBox2: that.data.passwd,
								txtSecretCode: '',
								RadioButtonList1: '学生',
								Button1: ''
							})
						} 
					})
					app.setUser(res.data);
					wx.showToast({
						title: '绑定成功',
						icon: 'success',
						duration: 1500
					});
				}
				else {
					wx.hideToast();
					app.showErrorModal('请检查输入', '绑定失败');
				}
			},
			fail: function(res){
				wx.hideToast();
				app.showErrorModal(res.errMsg, '绑定失败');
			}
		});
	},
	useridInput: function(e) {
		this.setData({
			userid: e.detail.value
		});
		if(e.detail.value.length >= 8){
			wx.hideKeyboard();
		}
	},
	passwdInput: function(e) {
		this.setData({
			passwd: e.detail.value
		});
	},
	checkInput: function(e) {
		this.setData({
			check: e.detail.value
		});
	}
});