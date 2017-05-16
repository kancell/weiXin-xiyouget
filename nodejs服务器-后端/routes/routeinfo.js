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

module.exports = router;