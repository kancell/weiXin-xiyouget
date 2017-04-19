//http://222.24.62.120/CheckCode.aspx 验证码
/*
Request URL:http://222.24.62.120/default2.aspx
Request Method:GET
Status Code:200 OK
Remote Address:222.24.62.120:80
*/

//Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
//Accept-Encoding:gzip, deflate, sdch
//Accept-Language:zh-CN,zh;q=0.8
//Cache-Control:max-age=0
//Connection:keep-alive
//Cookie:ASP.NET_SessionId=lvrgsf45o2ozhxu00cadmfrg
//Host:222.24.62.120
//Upgrade-Insecure-Requests:1
//User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0

var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cookieParser());
var request = request.defaults({jar: true})
/*request.post({url:'http://localhost:8888/', form: {key:'value'}}, function(err,res,body){
    console.log(body)
})
var options = {
    url: 'http://222.24.62.120/CheckCode.aspx',
    headers: {
        'User-Agent': 'request'
    }
};

function callback(error, res, body) {
    if (!error && res.statusCode == 200) {
        console.log(res.body);
    }
}

request(options, callback);
*/
var setcookie;
var setcookie2;
var j = request.jar()
app.get('/checkcode' ,function (req, res){
    request.get({url: 'http://222.24.62.120/CheckCode.aspx', jar: j}, function (err,res,body) {
        var cookie_string = j.getCookieString('http://222.24.62.120/default2.aspx'); // "key1=value1; key2=value2; ..."
        var cookies = j.getCookies('http://222.24.62.120/default2.aspx');
        setcookie = cookie_string
    }).pipe(res)
})
function callback(error, res, body) {
        console.log(res.body);
}
app.post('/', urlencodedParser, function (req, res) {
    request.post({
			url:'http://222.24.62.120/default2.aspx', 
			jar: j, 
			headers: {
				'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Encoding':'gzip, deflate, sdch',
				'Accept-Language':'zh-CN,zh;q=0.8',
				'Cache-Control':'max-age=0',
				'Connection':'keep-alive',
				'Cookie': setcookie,
				'Host':'222.24.62.120',
				'Upgrade-Insecure-Requests':'1',
				'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
			},
			form: req.body
    	}, function(err,response,data){
			var cookie_string = j.getCookieString(`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`);
			setcookie2 = cookie_string
		})
        //n121605 成绩查询
	request.get({
            url: `http://222.24.62.120/xscjcx.aspx?xh=06131097&xm=%E9%A9%AC%E5%8D%9A%E6%B4%8B&gnmkdm=N121605`,
			//url:`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`, 
			jar: j, 
			headers: {
				'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Encoding':'gzip, deflate, sdch',
				'Accept-Language':'zh-CN,zh;q=0.8',
				'Cache-Control':'max-age=0',
				'Connection':'keep-alive',
				'Cookie': setcookie2,
				'Host':'222.24.62.120',
                'Referer':'http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}',
				'Upgrade-Insecure-Requests':'1',
				'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
			}
	}).pipe(res)
})
//res.redirect(`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`)
var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("访问http://%s:%s", host, port)
})
























/*

function login(params) {
    request.post({url:'http://222.24.62.120/default2.aspx', 
                    form: {__VIEWSTATE: 'dDwtNTE2MjI4MTQ7Oz5O9kSeYykjfN0r53Yqhqckbvd83A==',
                    txtUserName: '06131097',
                    TextBox2: 'mima123',
                    txtSecretCode: '1484',
                    RadioButtonList1: '学生',
                    Button1: ''}
                }, function(err,res,body){
        console.log(res.body)
    })
}
request('https://30906847.xiyouget.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
})
*/

/*request(  
    {  
        url: 'http://222.24.3.7:8080/opac_two/include/login_app.jsp',  //请求的URL  
        method: 'POST',  //POST方式请求  
        encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码  
        headers: {  //请求头的设置  
            ContentType: 'application/x-www-form-urlencoded'  
        },  
        form: {  //请求体，参数  
            login_type: 'barcode',  
            barcode: 'c06131097',  //提交用户名  
            password: '123456',  //提交密码  
            _: '' //其他参数  
        }  
    },  
    function (err, res, body) {   //接收回调  

        //console.log(body);  
        session = res.headers['set-cookie'];  //获取set-cookie字段值  
        //console.log(session);  
        if (body == 'ok') {  
            console.log({Result: true, Session: session});  
        }  
        else {  
            console.log({Result: true, Session: session});  
        }  
    }  
);  
request  
(  
    {  
        uri: 'http://222.24.3.7:8080/opac_two/reader/jieshulishi.jsp',  //构建请求  
        encoding: null,  //不转码  
        headers: {  
            Cookie: session  //这里是关键，设置Cookie为之前请求到的以Cookie形式呈现的SessionID  
        }  
    }, function (err, res, body) {
		var str = res.body.toString("utf-8")  //获取响应即可  
			console.log(str)
	}  
);  */