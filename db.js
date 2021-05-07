let mysql = require("mysql");

//Database connection
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: process.env.mdp,
    database : 'quiz'
})
connection.connect(function(error){
    if(error) console.log(error);
});

module.exports = connection;