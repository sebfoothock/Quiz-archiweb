const { Connection } = require('puppeteer');
/* let quiz = require('../models/questionModel'); */
let connection = require('../db')

var quizList = new Object();

connection.query("select * from quiz.questions;", function(error, result){
    if(error){
        console.log(error);
    }
/*     result.forEach(element => console.log(element));*/
    quizList = result
});

exports.showQuiz = function (req,res){
        res.sendFile(path.join(__dirname, '../view/build/index.html'));
        /* res.render('quizList.ejs', {questions: quizList}); */
}

exports.quizFormAdd = function(req, res) {
    res.render('quizAdd.ejs');
}

exports.quizNew = function (req, res){
    let quiz = {"lastName":req.body.lastName, "firstName": req.body.firstName};
    console.log(quiz);
    connection.query("Insert into quizs.quiz set ?;", quiz, function(error, resultSQL){//le ? est remplacé par quiz
        if(error){
            response.status(400).send(error);
        }
        else{
            /* response.status(201).redirect('/quiz'); */
            res.redirect('/quiz');
        }
    });
}

exports.quizUpdate = function(req, res){
    let idquestion = req.params.idquiz;
    connection.query("select * from quiz Where idquiz = ?;", idquestion, function(error, result){//le ? est remplacé par quiz
        if(error){
            console.log(error);
        }
        else{
            /* response.status(201).redirect('/quiz'); */
            res.render('quizUpdate.ejs', {"idquiz" : result[0].idquiz, "lastName" : result[0].lastName, "firstName" : result[0].firstName});
        }
        console.log(result);
    });
}

exports.quizShowUpdate = function(req, res){
    let idquiz = req.body.idquiz;
    let quiz = {"lastName":req.body.lastName, "firstName": req.body.firstName};
    connection.query("update quizs.quiz set ? where idquiz = ?;", [quiz,idquiz] , function(error, resultSQL){//le ? est remplacé par quiz
        if(error){
            console.log(error);
        }
        else{
            /* response.status(201).redirect('/quiz'); */
            res.redirect('/quiz');
        }
    });
}

exports.quizRemove = function(req, res){//pourquoi il ne faut pas faire de post pour le remove ?
    let idquiz = req.params.idquiz;
    connection.query("delete from quizs.quiz Where idquiz = ?;", idquiz, function(error, result){//le ? est remplacé par quiz
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/quiz');
        }
    });
}

