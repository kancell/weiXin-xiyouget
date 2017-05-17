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
var j = request.jar()
var router = express.Router();

var cookieCheckcode;
var cookieLogin;
var nameUrl;
var xuehao

router.use(cookieParser());

router.get('/api-checkcode' ,function (req, res){
    function getCheckCode(err, response, body) {
        var cookie_string = j.getCookieString('http://222.24.62.120/CheckCode.aspx'); // "key1=value1; key2=value2; ..."
        cookieCheckcode = cookie_string
    }
    var options = {
        url: 'http://222.24.62.120/CheckCode.aspx', 
        jar: j,
        headers: {
            'Host':'222.24.62.120'
        }
    }
    request.get(options, getCheckCode)
    .pipe(res)
})

router.post('/api-login', urlencodedParser, function (req, res) {
    var optionLogin = {
        url:'http://222.24.62.120/default2.aspx', 
        jar: j, 
        encoding: null,
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
        console.log(cookie_string)
        cookieLogin = cookie_string
        xuehao = req.body.txtUserName
    }
    request.post(optionLogin, callbackLogin)
    //提交表单并获取cookie


    var op1 = {
        url: `http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`,
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
            'Referer':`http://222.24.62.120/default2.aspx`,
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
    }
    function callBack1(err1 ,response1, data1){
        var body1 = iconv.decode(response1.body, 'gb2312')
        $ = cheerio.load(body1);
        nameUrl = encodeURI($('#xhxm').text().replace(/同学/, ''))
    }
    request.get(op1, callBack1)

    var op2 = {
        url: `http://222.24.62.120/xskbcx.aspx?xh=${req.body.txtUserName}&xm=${nameUrl}&gnmkdm=N121605`,
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
            'Referer':`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`,
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
    }
    function callBack2(err2 ,response2, data2){
        var body2 = iconv.decode(response2.body, 'gb2312')
        $ = cheerio.load(body2);
        if($("title").text() == "Object moved"){
            console.log($("title").text())
            res.send(400)
        }
        else{
            var temp = {
                'id': $("#Label5").text().replace(/学号：/, ''),
                'name': $("#Label6").text().replace(/姓名：/, ''),
                'college': $("#Label7").text().replace(/学院：/, ''),
                'major': $("#Label8").text().replace(/专业：/, ''),
                'class': $("#Label9").text().replace(/行政班：/, ''),
            }
            res.send(temp)
        }
    }

    request.get(op2, callBack2)
})


router.get('/api-get', function (req ,res) {
    var optionGet = {
        url: `http://222.24.62.120/xscjcx.aspx?xh=${xuehao}&xm=${nameUrl}&gnmkdm=N121605`,
        //url:`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`, 
        jar: j, 
        encoding: null,
        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Host':'222.24.62.120',
            'Referer':`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`,
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
	}
    function callbackGet(err, response, data) {
        var body3 = iconv.decode(response.body, 'gb2312')
        $ = cheerio.load(body3);
        if($("title").text() == "Object moved"){
            console.log($("title").text())
            res.send(400)
        }
        var arr = []
        var score = []
        $( 'td', 'tr').each(function(i, elem) {
            arr.push($(this).text())
        });
        for(var i = 0; i < arr.length; i++){
               arr[i] = arr[i].replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"")
        }
        var info = arr.splice(0,8) 
        arr.splice(0,6)
        var lesson = ['daima' ,'mingcheng', 'xingzhi', 'xuefen', 'chengji', 'guishu']
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
        url: `http://222.24.62.120/xscjcx.aspx?xh=${xuehao}&xm=${nameUrl}&gnmkdm=N121605`,
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
        form: {        
            __EVENTTARGET: "",
            __EVENTARGUMENT: "",
            __VIEWSTATE: "dDwtMTAwODg3NDc5ODt0PHA8bDxTb3J0RXhwcmVzO3NmZGNiaztkZzM7ZHlieXNjajtTb3J0RGlyZTt4aDtzdHJfdGFiX2JqZztjamN4X2xzYjt6eGNqY3h4czs+O2w8a2NtYztcZTtiamc7XGU7YXNjOzA2MTMxMDk3O3pmX2N4Y2p0al8wNjEzMTA5Nzs7MDs+PjtsPGk8MT47PjtsPHQ8O2w8aTw0PjtpPDEwPjtpPDE5PjtpPDI0PjtpPDMyPjtpPDM0PjtpPDM2PjtpPDM4PjtpPDQwPjtpPDQyPjtpPDQ0PjtpPDQ2PjtpPDQ4PjtpPDUyPjtpPDU0PjtpPDU2Pjs+O2w8dDx0PHA8cDxsPERhdGFUZXh0RmllbGQ7RGF0YVZhbHVlRmllbGQ7PjtsPFhOO1hOOz4+Oz47dDxpPDU+O0A8XGU7MjAxNi0yMDE3OzIwMTUtMjAxNjsyMDE0LTIwMTU7MjAxMy0yMDE0Oz47QDxcZTsyMDE2LTIwMTc7MjAxNS0yMDE2OzIwMTQtMjAxNTsyMDEzLTIwMTQ7Pj47Pjs7Pjt0PHQ8cDxwPGw8RGF0YVRleHRGaWVsZDtEYXRhVmFsdWVGaWVsZDs+O2w8a2N4em1jO2tjeHpkbTs+Pjs+O3Q8aTwxMj47QDzlv4Xkv67or7476ZmQ6YCJ6K++O+S7u+mAieivvjvor77lpJblrp7ot7XmlZnlraY76L6F5L+u6K++O+i3qOWtpuenkTvntKDotKjmi5PlsZU75YWs5YWx6YCJ5L+u6K++O+S6uuaWh+e0oOi0qOmZkOmAiTvpgInkv67or7476YCJ5L+u6K++KOe0oOi0qCk7XGU7PjtAPDAxOzAyOzAzOzA0OzA1OzA2OzA3OzA4OzA5OzEwOzExO1xlOz4+Oz47Oz47dDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+Oz47Oz47dDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+Oz47Oz47dDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDxcZTs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDtWaXNpYmxlOz47bDzlrablj7fvvJowNjEzMTA5NztvPHQ+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0O1Zpc2libGU7PjtsPOWnk+WQje+8mumprOWNmua0iztvPHQ+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0O1Zpc2libGU7PjtsPOWtpumZou+8muiHquWKqOWMluWtpumZojtvPHQ+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0O1Zpc2libGU7PjtsPOS4k+S4mu+8mjtvPHQ+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0O1Zpc2libGU7PjtsPOiHquWKqOWMljtvPHQ+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDzkuJPkuJrmlrnlkJE6Oz4+Oz47Oz47dDxwPHA8bDxUZXh0O1Zpc2libGU7PjtsPOihjOaUv+ePre+8muiHquWKqDEzMDM7bzx0Pjs+Pjs+Ozs+O3Q8QDA8cDxwPGw8VmlzaWJsZTs+O2w8bzxmPjs+Pjs+Ozs7Ozs7Ozs7Oz47Oz47dDw7bDxpPDE+O2k8Mz47aTw1PjtpPDc+O2k8OT47aTwxMz47aTwxNT47aTwxNz47aTwyMT47aTwyMz47aTwyND47aTwyNT47aTwyNz47aTwyOT47aTwzMT47aTwzMz47aTwzNT47aTw0Mz47aTw0OT47aTw1MT47aTw1Mj47PjtsPHQ8cDxwPGw8VmlzaWJsZTs+O2w8bzxmPjs+Pjs+Ozs+O3Q8QDA8cDxwPGw8VmlzaWJsZTs+O2w8bzxmPjs+PjtwPGw8c3R5bGU7PjtsPERJU1BMQVk6bm9uZTs+Pj47Ozs7Ozs7Ozs7Pjs7Pjt0PDtsPGk8MTM+Oz47bDx0PEAwPDs7Ozs7Ozs7Ozs+Ozs+Oz4+O3Q8cDxwPGw8VGV4dDtWaXNpYmxlOz47bDzoh7Pku4rmnKrpgJrov4for77nqIvmiJDnu6nvvJo7bzx0Pjs+Pjs+Ozs+O3Q8QDA8cDxwPGw8UGFnZUNvdW50O18hSXRlbUNvdW50O18hRGF0YVNvdXJjZUl0ZW1Db3VudDtEYXRhS2V5czs+O2w8aTwxPjtpPDQ+O2k8ND47bDw+Oz4+O3A8bDxzdHlsZTs+O2w8RElTUExBWTpibG9jazs+Pj47Ozs7Ozs7Ozs7PjtsPGk8MD47PjtsPHQ8O2w8aTwxPjtpPDI+O2k8Mz47aTw0Pjs+O2w8dDw7bDxpPDA+O2k8MT47aTwyPjtpPDM+O2k8ND47aTw1PjtpPDY+Oz47bDx0PHA8cDxsPFRleHQ7PjtsPERaMjAwMDIwOz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDzmqKHmi5/nlLXot6/lrp7pqow7Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPOmZkOmAieivvjs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w8MS4wOz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDw0ODs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w8Jm5ic3BcOzs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w8Jm5ic3BcOzs+Pjs+Ozs+Oz4+O3Q8O2w8aTwwPjtpPDE+O2k8Mj47aTwzPjtpPDQ+O2k8NT47aTw2Pjs+O2w8dDxwPHA8bDxUZXh0Oz47bDxseDQ0MDEwMDs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w85YWI5Yib6YCg6Ieq5bex77yM5YaN5Yib6YCg5LiW55WMOz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDzntKDotKjmi5PlsZU7Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPDAuNTs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w85LiN5ZCI5qC8Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDznrqHnkIbnsbs7Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPOe0oOi0qOaLk+Wxleexuzs+Pjs+Ozs+Oz4+O3Q8O2w8aTwwPjtpPDE+O2k8Mj47aTwzPjtpPDQ+O2k8NT47aTw2Pjs+O2w8dDxwPHA8bDxUZXh0Oz47bDxaRDEwMDMzMDs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w8546w5Luj5o6n5Yi255CG6K66Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDzlv4Xkv67or747Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPDMuMDs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w8Mjc7Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPCZuYnNwXDs7Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPOS4k+S4muW5s+WPsDs+Pjs+Ozs+Oz4+O3Q8O2w8aTwwPjtpPDE+O2k8Mj47aTwzPjtpPDQ+O2k8NT47aTw2Pjs+O2w8dDxwPHA8bDxUZXh0Oz47bDxaRDEwMDQyMTs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w85pm66IO95o6n5Yi2QTs+Pjs+Ozs+O3Q8cDxwPGw8VGV4dDs+O2w85Lu76YCJ6K++Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDwyLjA7Pj47Pjs7Pjt0PHA8cDxsPFRleHQ7PjtsPDMzOz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDwmbmJzcFw7Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDzkuJPkuJrlubPlj7A7Pj47Pjs7Pjs+Pjs+Pjs+Pjt0PEAwPHA8cDxsPFZpc2libGU7PjtsPG88Zj47Pj47cDxsPHN0eWxlOz47bDxESVNQTEFZOm5vbmU7Pj4+Ozs7Ozs7Ozs7Oz47Oz47dDxAMDw7Ozs7Ozs7Ozs7Pjs7Pjt0PEAwPHA8cDxsPFZpc2libGU7PjtsPG88Zj47Pj47cDxsPHN0eWxlOz47bDxESVNQTEFZOm5vbmU7Pj4+Ozs7Ozs7Ozs7Oz47Oz47dDxAMDw7Ozs7Ozs7Ozs7Pjs7Pjt0PEAwPHA8cDxsPFZpc2libGU7PjtsPG88Zj47Pj47cDxsPHN0eWxlOz47bDxESVNQTEFZOm5vbmU7Pj4+Ozs7Ozs7Ozs7Oz47Oz47dDxAMDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+O3A8bDxzdHlsZTs+O2w8RElTUExBWTpub25lOz4+Pjs7Ozs7Ozs7Ozs+Ozs+O3Q8QDA8cDxwPGw8VmlzaWJsZTs+O2w8bzxmPjs+Pjs+Ozs7Ozs7Ozs7Oz47Oz47dDxAMDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+O3A8bDxzdHlsZTs+O2w8RElTUExBWTpub25lOz4+Pjs7Ozs7Ozs7Ozs+Ozs+O3Q8QDA8cDxwPGw8VmlzaWJsZTs+O2w8bzxmPjs+PjtwPGw8c3R5bGU7PjtsPERJU1BMQVk6bm9uZTs+Pj47Ozs7Ozs7Ozs7Pjs7Pjt0PEAwPDtAMDw7O0AwPHA8bDxIZWFkZXJUZXh0Oz47bDzliJvmlrDlhoXlrrk7Pj47Ozs7PjtAMDxwPGw8SGVhZGVyVGV4dDs+O2w85Yib5paw5a2m5YiGOz4+Ozs7Oz47QDA8cDxsPEhlYWRlclRleHQ7PjtsPOWIm+aWsOasoeaVsDs+Pjs7Ozs+Ozs7Pjs7Ozs7Ozs7Oz47Oz47dDxwPHA8bDxUZXh0O1Zpc2libGU7PjtsPOacrOS4k+S4muWFsTEzNeS6ujtvPGY+Oz4+Oz47Oz47dDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+Oz47Oz47dDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+Oz47Oz47dDxwPHA8bDxWaXNpYmxlOz47bDxvPGY+Oz4+Oz47Oz47dDxwPHA8bDxUZXh0Oz47bDxYSVlPVTs+Pjs+Ozs+O3Q8cDxwPGw8SW1hZ2VVcmw7PjtsPC4vZXhjZWwvMDYxMzEwOTcuanBnOz4+Oz47Oz47Pj47dDw7bDxpPDM+Oz47bDx0PEAwPDs7Ozs7Ozs7Ozs+Ozs+Oz4+Oz4+Oz4+Oz4ywQssTmaEkl2n7ylfwzNiEHxVAg==",
            hidLanguage: "",
            btn_zg: '',
        }
	}
    function callbackAll(err, response, data) {
        var body2 = iconv.decode(response.body, 'gb2312')
        $ = cheerio.load(body2);
        console.log()

        var arr = []
        var score = []
        $( 'td', 'tr').each(function(i, elem) {
            arr.push($(this).text())
        });
        for(var i = 0; i < arr.length; i++){
               arr[i] = arr[i].replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"")
        }
        var info = arr.splice(0,8) 
        arr.splice(0,6)
        var lesson = ['daima' ,'mingcheng', 'xingzhi', 'xuefen', 'chengji', 'guishu']
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
    request.post(optionAll, callbackAll)
})

router.get('/api-class', function(req, res){
    var optionClass = {
        url: `http://222.24.62.120/xskbcx.aspx?xh=${xuehao}&xm=${nameUrl}&gnmkdm=N121603`,
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
            'Referer':'http://222.24.62.120/xs_main.aspx',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
	}
    function callbackClass(err, response, data) {
        var body2 = iconv.decode(response.body, 'gb2312')
        $ = cheerio.load(body2);
        var arr = []
        var score = []
        $( 'td', '#Table1').each(function(i, elem) {
            arr.push($(this).text())
        });
        for(var i = 0; i < arr.length; i++){
               arr[i] = arr[i].replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"")
        }
        res.send(arr)
    }
    request.post(optionClass, callbackClass)
})

router.get('/api-makeup', function(req, res){
    var optionClass = {
        url: `http://222.24.62.120/xsbkkscx.aspx?xh=${xuehao}&xm=${nameUrl}&gnmkdm=N121603`,
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
            'Referer':'http://222.24.62.120/xs_main.aspx',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
	}
    function callbackClass(err, response, data) {
        var body2 = iconv.decode(response.body, 'gb2312')
        $ = cheerio.load(body2);
        var arr = []
        var score = []
        $( 'td', '.datelist').each(function(i, elem) {
            arr.push($(this).text())
        });
        for(var i = 0; i < arr.length; i++){
               arr[i] = arr[i].replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"")
        }
        res.send(arr)
    }
    request.post(optionClass, callbackClass)
})
//res.redirect(`http://222.24.62.120/xs_main.aspx?xh=${req.body.txtUserName}`)

module.exports = router;