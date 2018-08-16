var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Home' , user:JSON.stringify(req.session.user)});
   
});
module.exports = router;
