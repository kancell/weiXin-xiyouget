//kd.js
/*快递公司编码:申通=”shentong” EMS=”ems” 顺丰=”shunfeng” 圆通=”yuantong” 中通=”zhongtong” 
韵达=”yunda” 天天=”tiantian” 汇通=”huitongkuaidi” 全峰=”quanfengkuaidi” 德邦=”debangwuliu” 宅急送=”zhaijisong”
*/
//'huitongkuaidi',70088215023064
var app = getApp();
Page({
	data: {
		remind: '加载中',
		array: ['顺丰', '汇通', '圆通', '中通', '申通', 'EMS', '韵达', '天天', '德邦', '宅急送'],
		objectArray: [
			{
				id: 0,
				name: 'shunfeng'
			},
			{
				id: 1,
				name: 'huitongkuaidi'
			},
			{
				id: 2,
				name: 'yuantong'
			},
			{
				id: 3,
				name: 'zhongtong'
			},
			{
				id: 4,
				name: 'shentong'
			},
			{
				id: 5,
				name: 'EMS'
			},
			{
				id: 6,
				name: 'yunda'
			},
			{
				id: 7,
				name: 'tiantian'
			},
			{
				id: 8,
				name: 'debangwuliu'
			},
			{
				id: 9,
				name: 'zhaijisong'
			}
		],
		index: '',
		type: '',
		info: ''
	},
	bindPickerChange: function(e) {
		var that = this
		this.setData({
			index: e.detail.value,
			type: that.data.objectArray[e.detail.value].name
		})
	},
	bindKeyInput: function(e){
		this.setData({
			inputValue: e.detail.value
		})
	},
	search: function(){
		var that = this;
		wx.request({
			//`https://30906847.xiyouget.com/query?type=${option}&postid=${number}`
			url: app._server + "api-query",
			method: 'get',
			data: {
				type: that.data.type,
				postid: that.data.inputValue
			},
			success: function(res) {
				console.log(res.data.data)
				that.setData({
					info: res.data.data
				})
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
	}
})