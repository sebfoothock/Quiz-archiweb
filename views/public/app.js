const app = Vue.createApp({
    mounted() {
        axios
        .get("http://localhost:4000/api/getquestions/1")
        .then((response) => {
            this.questions = response.data;
            console.log(this.questions);
        })
        .catch((error) =>{
            console.log(error);
        }),
        axios
        .get("http://localhost:4000/api/answers/1")
        .then((response) => {
            this.reponses = response.data;
            console.log(this.reponses);
        })
        .catch((error) =>{
            console.log(error);
        })
    },
    data() {
        return {
            questions : [],
            reponses: [],
            questionActuel: 0,
            questionSelectionne: '',
            score: 0
        }
    },
    methods: {
        repondu(e) {
            this.questionSelectionne = e
            if(this.questionSelectionne === 'reponse1')
                this.score = this.score + 10
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
    },
    computed: {
        nbQuestions: function () {
            return this.questions.length;
        }
    },
})



app.mount('#app')