class Question {
    constructor(idQuestion, question, reponse1, reponse2, reponse3, reponse4, idQuiz){
        this.idQuestion = idQuestion;
        this.question = question;
        this.reponse1 = reponse1;
        this.reponse2 = reponse2;
        this.reponse3 = reponse3;
        this.reponse4 = reponse4;
        this.idQuiz = idQuiz;
    }
}

module.exports = Question;