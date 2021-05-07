let express = require('express');
let router = express.Router();

let quizController = require('./controllers/quizController');
let quizControllerApi = require('./controllers/quizControllerApi');

//Liste des routes vers les contrôleurs
router.get('/', (req, res) => res.redirect('/quiz'));

router.get('/quiz', quizController.showQuiz);
router.get('/quiz/add', quizController.quizFormAdd);
router.post('/quiz/new', quizController.quizNew);
router.get('/quiz/remove/:idquiz', quizController.quizRemove);
router.get('/quiz/update/:idquiz', quizController.quizUpdate);
router.post('/quiz/update', quizController.quizShowUpdate);

/****** API ******/

router.get('/api/questions',quizControllerApi.questionsList);
router.get('/api/quiz',quizControllerApi.quizList);
router.post('/api/newquiz', quizControllerApi.newQuiz);
router.post('/api/newquestion', quizControllerApi.newQuestion);
router.get('/api/getquiz/:idQuiz', quizControllerApi.getQuiz);
router.get('/api/getquestions/:idQuiz', quizControllerApi.getQuestions);
router.put('/api/question', quizControllerApi.updateQuestion);//Put est a utiliser pour les mises à jour
router.put('/api/quiz', quizControllerApi.updateQuiz);//Put est a utiliser pour les mises à jour
router.delete('/api/deletequiz/:idQuiz', quizControllerApi.deleteQuiz);
router.delete('/api/deletequestion/:idQuestion', quizControllerApi.deleteQuestion);


module.exports = router;