const { Connection } = require('puppeteer');
let connection = require('../db')

//Afficher la liste de quiz, méthode: GET, chemin: /api/quiz
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

//Afficher un quiz selon son identifiant, méthode: GET, chemin: /api/getQuiz/:idQuiz
exports.getQuiz = function(req, res){
    let idQuiz = req.params.idQuiz;
    connection.query("select * from quiz.quiz Where idQuiz = ?;", idQuiz, function(error, result){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

//Afficher un quiz selon son identifiant, méthode: GET, chemin: /api/questionsQuiz/:idQuiz
exports.questionsQuiz = function(req, res){
    let idQuiz = req.params.idQuiz;
    connection.query("select * from quiz.questions Where idQuiz = ?;", idQuiz, function(error, result){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json(result);
        }
    });
}

//Afficher juste la liste des 4 réponses d'un quiz selon son identifiant, méthode:GET, chemin: /api/answers/:idQuiz
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

//Afficher une seule fois les catégories de liste, méthode:GET, chemin: /api/categories
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

//Ajouter un quiz, méthode: POST, chemin: /api/newQuiz
exports.newQuiz = function (req, res){
    let quiz = {"nomQuiz":req.body.nomQuiz, "categorie": req.body.categorie};
    connection.query("Insert into quiz.quiz set ?;", quiz, function(error, resultSQL){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

//Ajouter une question, méthode: POST, chemin: /api/newQuestion
exports.newQuestion = function (req, res){
    let question = {"question":req.body.question, "reponse1": req.body.reponse1, "reponse2": req.body.reponse2, "reponse3": req.body.reponse3, "reponse4": req.body.reponse4, "idQuiz": req.body.idQuiz};
    connection.query("Insert into quiz.questions set ?;", question, function(error, resultSQL){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

//Modifier un quiz, méthode: PUT, chemin: /api/quiz
exports.updateQuiz = function(req, res){
    let idQuiz = req.body.idQuiz;
    let quiz = {"idQuiz": req.body.idQuiz, "nomQuiz":req.body.nomQuiz, "categorie": req.body.categorie};
    connection.query("update quiz.quiz set ? where idQuiz = ?;", [quiz,idQuiz] , function(error, resultSQL){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

//Modifier une question, méthode: PUT, chemin: /api/question
exports.updateQuestion = function(req, res){
    let idQuestion = req.body.idQuestion;
    let quiz = {"idQuestion":req.body.idQuestion, "question":req.body.question, "reponse1": req.body.reponse1, "reponse2": req.body.reponse2, "reponse3": req.body.reponse3, "reponse4": req.body.reponse4, "idQuiz": req.body.idQuiz};
    connection.query("update quiz.questions set ? where idQuestion = ?;", [quiz,idQuestion] , function(error, resultSQL){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

//Supprimer un quiz, méthode: DELETE, chemin: /api/deleteQuiz/:idQuiz
exports.deleteQuiz = function(req, res){
    let idquiz = req.params.idQuiz;
    connection.query("delete from quiz.quiz Where idQuiz = ?;", idquiz, function(error, result){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}

//Supprimer une question, méthode: DELETE, chemin: /api/deleteQuestion/:idQuestion
exports.deleteQuestion = function(req, res){
    let idQuestion = req.params.idQuestion;
    connection.query("delete from quiz.questions Where idQuestion = ?;", idQuestion, function(error, result){
        if(error){
            res.status(400).json({'message': error});
        }
        else{
            res.status(200).json({'message': 'success'});
        }
    });
}