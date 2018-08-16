var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'onlinetest',
    port: 3306,
    debug: false,
    multipleStatements: true
});
module.exports.connection = connection;