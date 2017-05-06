var express = require('express');
var request = require('request');
var app = express();

var routeSchool = require('./routeschool')
var routeInfo = require('./routeinfo')

app.all('*', function(req, res, next) {  
	res.header("Access-Control-Allow-Origin", "*");  
	res.header("Access-Control-Allow-Headers", "X-Requested-With");  
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
	res.header("X-Powered-By",' 3.2.1')  
	next();  
}); 

app.use(routeSchool)
app.use(routeInfo)

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