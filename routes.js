let express = require('express');
let router = express.Router();

let quizControllerApi = require('./controllers/quizControllerApi');

/****** les routes de l'API ******/

router.get('/api/quiz',quizControllerApi.quizList);
router.get('/api/getQuiz/:idQuiz', quizControllerApi.getQuiz);
router.get('/api/questionsQuiz/:idQuiz', quizControllerApi.questionsQuiz);
router.get('/api/answers/:idQuiz',quizControllerApi.answersList);
router.get('/api/categories',quizControllerApi.categorieList);
router.post('/api/newQuiz', quizControllerApi.newQuiz);
router.post('/api/newQuestion', quizControllerApi.newQuestion);
router.put('/api/quiz', quizControllerApi.updateQuiz);
router.put('/api/question', quizControllerApi.updateQuestion);
router.delete('/api/deleteQuiz/:idQuiz', quizControllerApi.deleteQuiz);
router.delete('/api/deleteQuestion/:idQuestion', quizControllerApi.deleteQuestion);


module.exports = router;