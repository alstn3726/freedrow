const mysql = require('mysql');
const client = mysql.createConnection({
    host : 'freedrow.cafe24app.com',
    user : 'gamefind',
    password : 'alstn3726',
    database : 'gamefind',
    port : '3306',
  });
  module.exports = client;