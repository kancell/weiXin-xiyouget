var express = require('express');
var request = require('request');
var url = require("url");
var http = require("http");

var router = express.Router();

router.get('/api-query', function(req, res){
	var url = `http://www.kuaidi100.com/query?type=${req.query.type}&postid=${req.query.postid}`
	request.get(url).pipe(res)
})

router.get('/api-weather', function(req, res){
	var url = `https://free-api.heweather.com/v5/weather?city=${req.query.id}&key=b6bf43aeeb9c40edab9d7a1ef8603562`
	request.get(url).pipe(res)
})

router.get('/api-booksearch', function(req, res){
	var keyword = encodeURI(req.query.keyword)
	var url = `https://api.xiyoumobile.com/xiyoulibv2/book/search?keyword=${keyword}`
	request.get(url).pipe(res)
})

router.get('/api-login', function(req, res){
	var url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx11a0244b4c42ad6f&secret=b8fa38a69e7f4afabcc0a1148cdd5c39&js_code=${req.query.code}&grant_type=authorization_code`
	request.get(url).pipe(res)
})

module.exports = router;