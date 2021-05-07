const app = Vue.createApp({
    data() {
        return {
            questionActuel: 0,
            questionSelectionne: '',
            nbQuestions: 3,
            score: 0,
            questions: [{
                    question: "Rolex",
                    reponses: {
                        a: "dsqd",
                        b: "dsqd",
                        c: "dsqd",
                        d: "dsqd"
                    },
                    reponseCorrecte: 'b'
                },
                {
                    question: "Rolex2",
                    reponses: {
                        a: "dsqd",
                        b: "dsqd",
                        c: "dsqd",
                        d: "dsqd"
                    },
                    reponseCorrecte: 'b'
                },
                {
                    question: "Rolex3",
                    reponses: {
                        a: "dsqd",
                        b: "dsqd",
                        c: "dsqd",
                        d: "dsqd"
                    },
                    reponseCorrecte: 'b'
                }
            ]
        }
    },
    methods: {
        repondu(e) {
            this.questionSelectionne = e.target.value
            if(this.questionSelectionne == this.questions[this.questionActuel] ['reponseCorrecte'])
                this.score =+ 10
            console.log(this.score)
        },
        questionSuivante() {
            this.questionActuel++
            this.questionSelectionne = ''
        },
        resultat() {
            this.questionActuel++
        },
        resetQuiz() {
            this.questionActuel = 0
            this.questionSelectionne = ''
            this.score = 0
        }
    }
})



app.mount('#app')