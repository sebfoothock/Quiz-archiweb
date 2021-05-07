//import express
let express = require('express');
require('dotenv').config();

//initialize the app
let app = express();

app.use(express.urlencoded({extended:true}));//POST
app.use(express.json());


let router = require('./routes');
app.use('/', router);

//launch app to listen to specified port
app.listen(4000, function(){
    console.log('Running on port 4000');
})