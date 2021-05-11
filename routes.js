let express = require('express');
let router = express.Router();

let quizControllerApi = require('./controllers/quizControllerApi');

/****** API ******/

router.get('/api/answers/:idQuiz',quizControllerApi.answersList);
router.get('/api/quiz',quizControllerApi.quizList);
router.post('/api/newQuiz', quizControllerApi.newQuiz);
router.post('/api/newQuestion', quizControllerApi.newQuestion);
router.get('/api/getQuiz/:idQuiz', quizControllerApi.getQuiz);
router.get('/api/questionsQuiz/:idQuiz', quizControllerApi.questionsQuiz);
router.get('/api/categories',quizControllerApi.categorieList);
router.get('/api/quizCategorie/:categ', quizControllerApi.quizCategorie);
router.put('/api/question', quizControllerApi.updateQuestion);//Put est a utiliser pour les mises à jour
router.put('/api/quiz', quizControllerApi.updateQuiz);//Put est a utiliser pour les mises à jour
router.delete('/api/deleteQuiz/:idQuiz', quizControllerApi.deleteQuiz);
router.delete('/api/deleteQuestion/:idQuestion', quizControllerApi.deleteQuestion);


module.exports = router;