var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
	res.render('home' /*,{layout: false}*/);
});

router.get('/helper',function(req, res){
	res.render('helper' ,{layout: false});
});

module.exports = router;