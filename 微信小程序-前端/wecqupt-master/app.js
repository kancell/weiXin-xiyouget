//app.js
App({
	version: 'v0.1.2', //版本号
	onLaunch: function() {
		var that = this;
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
	//setUser函数，登录成功后存储用户信息
	setUser: function(data) {
		this._user.info = data
		this._user.bind = true
	},
	getUserInfo: function(key){
		var that = this;
		//获取微信用户信息
		wx.getStorage({
			key: key,
			success: function(res) {
				console.log(res.data)
			} 
		})
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