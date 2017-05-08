//http://222.24.62.120/CheckCode.aspx 验证码
/*
Request URL:http://222.24.62.120/default2.aspx
Request Method:GET
Status Code:200 OK
Remote Address:222.24.62.120:80
*/
//<form name="Form1" method="post" action="http://222.24.62.120/xscjcx.aspx?xh=06131097&amp;xm=%E9%A9%AC%E5%8D%9A%E6%B4%8B&amp;gnmkdm=N121605" id="Form1">
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
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var iconv = require("iconv-lite");

var request = request.defaults({jar: true})
var cookieCheckcode;
var cookieLogin;
var j = request.jar()
var router = express.Router();
router.use(cookieParser());

router.get('/api-checkcode' ,function (req, res){
    function getCheckCode(err, response, body) {
        var cookie_string = j.getCookieString('http://222.24.62.120/default2.aspx'); // "key1=value1; key2=value2; ..."
        cookieCheckcode = cookie_string        
    }
    var options = {url: 'http://222.24.62.120/CheckCode.aspx', jar: j}
    request.get(options, getCheckCode)
    .pipe(res)
})

router.post('/api-login', urlencodedParser, function (req, res) {
    var optionLogin = {
        url:'http://222.24.62.120/default2.aspx', 
        jar: j, 
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Cookie': cookieCheckcode,
            'Host':'222.24.62.120',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        },
        form: req.body
    }
    function callbackLogin(err, response, data) {
        var cookie_string = j.getCookieString(`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`);
        cookieLogin = cookie_string
        var op1 = {
            url: `http://222.24.62.120/xscjcx.aspx?xh=06131097&xm=%E9%A9%AC%E5%8D%9A%E6%B4%8B&gnmkdm=N121605`,
            //url:`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`, 
            jar: j, 
            encoding: null,
            headers: {
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding':'gzip, deflate, sdch',
                'Accept-Language':'zh-CN,zh;q=0.8',
                'Cache-Control':'max-age=0',
                'Connection':'keep-alive',
                'Cookie': cookieLogin,
                'Host':'222.24.62.120',
                'Referer':'http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}',
                'Upgrade-Insecure-Requests':'1',
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
            }
	    }
        request.get(op1, function(err2 ,response2, data2){
            var body3 = iconv.decode(response2.body, 'gb2312')
            $ = cheerio.load(body3);
            if($("title").text() == "Object moved"){
                console.log($("title").text())
            }
            else{
                var temp = [
                    $("#Label5").text(),
                    $("#Label6").text(),
                    $("#Label7").text(),
                    $("#Label8").text(),
                    $("#Label9").text(),
                ]
                res.send(temp)
            }
            //res.send(body3)
        })
    }
    request.post(optionLogin, callbackLogin)
        //n121605 成绩查询
})

router.get('/api-get', function (req ,res) {
    var optionGet = {
        url: `http://222.24.62.120/xscjcx.aspx?xh=06131097&xm=%E9%A9%AC%E5%8D%9A%E6%B4%8B&gnmkdm=N121605`,
        //url:`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`, 
        jar: j, 
        encoding: null,
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Cookie': cookieLogin,
            'Host':'222.24.62.120',
            'Referer':'http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
	}
    function callbackGet(err, response, data) {
        var body2 = iconv.decode(response.body, 'gb2312')
        $ = cheerio.load(body2);
        var arr = []
        var score = []
        $( 'td', 'tr').each(function(i, elem) {
            arr.push($(this).text())
        });
        for(var i = 0; i < arr.length; i++){
               arr[i] = arr[i].replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"")
        }
        var info = arr.splice(0,8) 
        var lesson = arr.splice(0,6)
        var temp = {}
        for(var i = 0; i < arr.length; i++){
            if(i%6==0&&i!==0){
                score.push(temp)
                temp = {}
            }
            temp[lesson[i%6]] = arr[i]
        }
        res.send(score)
    }
	request.get(optionGet, callbackGet)
})

router.post('/api-all', urlencodedParser, function (req, res) {
    var optionAll = {
        url: `http://222.24.62.120/xscjcx.aspx?xh=06131097&xm=%E9%A9%AC%E5%8D%9A%E6%B4%8B&gnmkdm=N121605`,
        //url:`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`, 
        jar: j, 
        encoding: null,
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Cookie': cookieLogin,
            'Host':'222.24.62.120',
            'Referer':'http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        },
        form: req.body
	}
    function callbackAll(err, response, data) {
        var body2 = iconv.decode(response.body, 'gb2312')
        $ = cheerio.load(body2);
        var arr = []
        var score = []
        $( 'td', 'tr').each(function(i, elem) {
            arr.push($(this).text())
        });
        for(var i = 0; i < arr.length; i++){
               arr[i] = arr[i].replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"")
        }
        var info = arr.splice(0,8) //包含学生个人信息
        var lesson = arr.splice(0,6)
        var temp = {}
        for(var j = 0; j < arr.length; j++){
            if(j%6==0&&j!==0){
                score.push(temp)
                temp = {}
            }
            temp[lesson[j%6]] = arr[j]
        }
        res.send(score)
    }
    request.post(optionAll, callbackAll)
})
//res.redirect(`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`)

module.exports = router;