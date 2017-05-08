'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/express', function(req, res){
	res.redirect('/routes/www/express/express.html')
})
router.get('/music', function(req, res){
	res.redirect('/routes/www/music/index.html')
})

router.get('/api-query', function(req, res){
	var url = `http://www.kuaidi100.com/query?type=${req.query.type}&postid=${req.query.postid}`
	request.get(url).pipe(res)
})

//router.get('/', require('./welcome'));
router.get('/', function(req ,res){
	res.send('aaa')
});
router.get('/login', require('./login'));
router.get('/user', require('./user'));
router.all('/tunnel', require('./tunnel'));

module.exports = router;