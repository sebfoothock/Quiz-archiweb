const { Connection } = require('puppeteer');
/* let quiz = require('../models/questionModel'); */
let connection = require('../db')

exports.questionsList = function (req,res){
    connection.query("select * from quiz.questions;", function(error, result){
        if(error){
            res.status(400).json({'error': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.answersList = function (req,res){
    let idQuiz = req.params.idQuiz;
    connection.query("select reponse1,reponse2,reponse3,reponse4 from quiz.questions Where idQuiz = ?;", idQuiz, function(error, result){
        if(error){
            res.status(400).json({'error': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.quizList = function (req,res){
    connection.query("select * from quiz.quiz;", function(error, result){
        if(error){
            res.status(400).json({'error': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.newQuestion = function (req, res){
    let question = {"question":req.body.question, "reponse1": req.body.reponse1, "reponse2": req.body.reponse2, "reponse3": req.body.reponse3, "reponse4": req.body.reponse4, "idQuiz": req.body.idQuiz};
/*     console.log(quiz); */
    connection.query("Insert into quiz.questions set ?;", question, function(error, resultSQL){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

exports.newQuiz = function (req, res){
    let quiz = {"nomQuiz":req.body.nomQuiz, "categorie": req.body.categorie};
    connection.query("Insert into quiz.quiz set ?;", quiz, function(error, resultSQL){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

exports.getQuiz = function(req, res){
    let idQuiz = req.params.idQuiz;
    connection.query("select * from quiz.quiz Where idQuiz = ?;", idQuiz, function(error, result){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.questionsQuiz = function(req, res){
    let idQuiz = req.params.idQuiz;
    connection.query("select * from quiz.questions Where idQuiz = ?;", idQuiz, function(error, result){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.categorieList = function(req, res){
    connection.query("select distinct categorie from quiz.quiz;", function(error, result){
        if(error){
            res.status(400).json({'error': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.quizCategorie = function(req, res){
    let categ = req.params.categ;
    connection.query("select * from quiz.quiz Where categorie = ?;", categ, function(error, result){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

exports.updateQuestion = function(req, res){
    let idQuestion = req.body.idQuestion;
    let quiz = {"idQuestion":req.body.idQuestion, "question":req.body.question, "reponse1": req.body.reponse1, "reponse2": req.body.reponse2, "reponse3": req.body.reponse3, "reponse4": req.body.reponse4, "idQuiz": req.body.idQuiz};
    connection.query("update quiz.questions set ? where idQuestion = ?;", [quiz,idQuestion] , function(error, resultSQL){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

exports.updateQuiz = function(req, res){
    let idQuiz = req.body.idQuiz;
    let quiz = {"idQuiz": req.body.idQuiz, "nomQuiz":req.body.nomQuiz, "categorie": req.body.categorie};
    connection.query("update quiz.quiz set ? where idQuiz = ?;", [quiz,idQuiz] , function(error, resultSQL){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

exports.deleteQuiz = function(req, res){//pourquoi il ne faut pas faire de post pour le remove ?
    let idquiz = req.params.idQuiz;
    connection.query("delete from quiz.quiz Where idQuiz = ?;", idquiz, function(error, result){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

exports.deleteQuestion = function(req, res){//pourquoi il ne faut pas faire de post pour le remove ?
    let idQuestion = req.params.idQuestion;
    connection.query("delete from quiz.questions Where idQuestion = ?;", idQuestion, function(error, result){//le ? est remplacé par quiz
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}