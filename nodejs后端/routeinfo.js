var express = require('express');
var request = require('request');
var url = require("url");
var http = require("http");

var router = express.Router();

router.get('/query', function(req, res){
	var url = `http://www.kuaidi100.com/query?type=${req.query.type}&postid=${req.query.postid}`
	request.get(url).pipe(res)
})

module.exports = router;