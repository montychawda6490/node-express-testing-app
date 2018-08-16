var express = require('express');
var router = express.Router();
var database = require('../database/connect');



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'login' });
});


router.post('/', function (req, res, next) {

    
    var appData = {};
    var email = req.body.email;
    var password = req.body.password;
    database.connection.getConnection(function(err, connection){
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {

            connection.query('SELECT * FROM users WHERE email = ?', [email], function (err, rows, fields) {

                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            

                            appData.error = 0;
                            //appData["token"] = token;
                            appData["data"] = "success";
                            appData.username = rows[0];
                            req.session.user= rows[0];
                            //res.status(200).render('login', { title: appData });
                            data="success";
                             res.redirect('/home');
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(200).render('login', { title: appData });
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(200).render('login', { title: appData });
                    }
                }
                connection.release();
            });
        }
    })
});
module.exports = router;
