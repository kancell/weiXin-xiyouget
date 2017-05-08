const btn = document.getElementById('btn')
function getNumber(){
	let number = document.getElementById('number')
	return number.value
}
function getOption(){
	let select = document.getElementById("pid")
	return select.options[select.selectedIndex].value
}
function msgXhr(option, number, method='get'){
	let s = 'www.kuaidi100.com'
	let test = '30906847.xiyouget.com'
	let query = `https://${test}/api-query?type=${option}&postid=${number}`
	let promise = new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest()
		xhr.open(method, query ,false)     
		xhr.onreadystatechange = function (){
			if(xhr.readyState == 4 && xhr.status == 200){
				resolve(JSON.parse(this.response))
				//返回数据是JSON字符串，需要进行转换
			}
			else{
				reject();
			}
		}
		xhr.send(null)
	})  
	return promise
}
btn.addEventListener('click',() => {
	//获得选择的快递公司与单号，传入ajax请求部分，执行promise
	msgXhr(getOption(), getNumber()).
	then(response => showMsg(response),
		error => console.log('error'))
})

function showMsg(data){
	let msg = document.getElementById('msg')
	let dataArr = data.data
	let element = ''
	for(let i in dataArr){
		element += `<p>${dataArr[i].time}: ${dataArr[i].context}</p>`
	}
	msg.innerHTML = element
}
//'huitongkuaidi',70088215023064
/*快递公司编码:申通=”shentong” EMS=”ems” 顺丰=”shunfeng” 圆通=”yuantong” 中通=”zhongtong” 
韵达=”yunda” 天天=”tiantian” 汇通=”huitongkuaidi” 全峰=”quanfengkuaidi” 德邦=”debangwuliu” 宅急送=”zhaijisong”
*/
data = {
	keyword: "撒旦"
};
/*function name() {
	$.ajax({
		url: "https://api.xiyoumobile.com/xiyoulibv2/book/search",
		data: data,
		success: function(res) {
			console.log(res)
		}
	})
}

name()*/
