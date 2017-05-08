const express = require('express');
const router = express.Router();
const request = require('request');

const routeSchool = require('./routeschool')
const routeInfo = require('./routeinfo')
const routeView = require('./serverview')

router.all('*', function(req, res, next) {  
	res.header("Access-Control-Allow-Origin", "*");  
	res.header("Access-Control-Allow-Headers", "X-Requested-With");  
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
	res.header("X-Powered-By",' 3.2.1')  
	next();  
}); 

router.use(routeSchool)
router.use(routeInfo)
router.use(routeView)


module.exports = router;