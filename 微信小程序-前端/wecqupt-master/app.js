//app.js
App({
	version: 'v0.1.2', //版本号
	onLaunch: function() {
		var that = this;	
		wx.getStorage({
			key: 'bind',
			success: function(res) {
				that._user.bind = res.data
			},
			fail: function(res){
				that._user.bind = false
			}
		})
		that.getUserInfo()
		wx.checkSession({
			success: function(){
				console.log('ok')
			},
			fail: function(){
				//登录态过期
				wx.login({
					success: function(res) {
						if (res.code) {
						//发起网络请求
							wx.request({
								url: that._server + 'api-login',
								data: {
									code: res.code
								},
								success: function(res){
									that.saveCache('openid', {id: res.data.openid})
								}
							})
						} 
						else {
							console.log('获取用户登录态失败！' + res.errMsg)
						}
					}
				});		
			}
		})
		//读取缓存
		/*try {
			var data = wx.getStorageInfoSync();
			if (data && data.keys.length) {
				data.keys.forEach(function(key) {
					var value = wx.getStorageSync(key);
					if (value) {
						that.cache[key] = value;
					}
				});
				if (that.cache.version !== that.version) {
					that.cache = {};
					wx.clearStorage();
				} else {
					that._user.wx = that.cache.userinfo.userInfo || {};
					that.processData(that.cache.userdata);
				}
			}
		} catch(e) { console.warn('获取缓存失败'); }
		*/
	},
	//保存缓存
	saveCache: function(key, value) {
		if(!key || !value){return;}
		var that = this;
		that.cache[key] = value;
		wx.setStorage({
			key: key,
			data: value
		});
	},
	//清除缓存
	removeCache: function(key) {
		if(!key){return;}
		var that = this;
		that.cache[key] = '';
		wx.removeStorage({
			key: key
		});
	},
	//后台切换至前台时
	onShow: function(){

	},
	getUserInfo: function(){
		var that = this;
		//获取微信用户信息
		wx.getUserInfo({
			success: function(res){
				that._user.wx = res.userInfo
			},
			fail: function(res){
				//that.showErrorModal('授权失败');
			}
		});
	},
	//setUser函数，登录成功后存储用户信息
	setUser: function(data) {
		this.saveCache('studentinfo', data)
		this.saveCache('bind', true)
		this._user.info = data
		this._user.bind = true
	},
	showLoadToast: function(title, duration){
		wx.showToast({
			title: title || '加载中',
			icon: 'loading',
			mask: true,
			duration: duration || 1500
		});
	},
	showErrorModal: function(content, title){
		wx.showModal({
			title: title || '加载失败',
			content: content || '未知错误',
			showCancel: false
		});
	},
	util: require('./utils/util'),
	key: function(data){ return this.util.key(data) },
	cache: {},
	_server: 'https://30906847.xiyouget.com/',
	_user: {
		info: '',
		bind: false,
		//微信数据
		wx: {},
		//学生数据
		we: {}
	},
	_time: {} //当前学期周数
});