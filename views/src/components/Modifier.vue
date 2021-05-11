<template>
    <div id="container">
        <h1 class="font-bold text-5xl text-center text-blue-700">Modification : Quiz culture générale</h1>
        <br>
        <br>
        <label class="bg-green-300 p-3 m-5 rounded-lg hover:bg-green-500">
                <a @click="goAjouterQuestion(quiz.idQuiz)">Ajoutez une question</a>
        </label>
        <label name="supprimer" class="bg-red-400 p-3 m-2 rounded-lg hover:bg-red-600"><a
            @click="supprimerQuiz(quiz.idQuiz)">Supprimez ce quiz</a>
        </label>
        <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4">
            <div class="m-3" 
            v-bind:key="key"
            v-for="quizInfo,key in quiz">
                <label class="text-blue-800">nom du Quiz</label>
                <input class="border-red-300" type="text" name="nom quiz" v-model="quizInfo.nomQuiz">
                <label class="text-blue-800">catégorie du Quiz</label>
                <input class="border-red-300" type="text" name="categorie" v-model="quizInfo.categorie">
            </div>
            <label class="bg-indigo-400 p-3 m-8 rounded-lg hover:bg-indigo-500">
                <a @click="modifierQuiz(quizInfo.nomQuiz, quizInfo.categorie)">Modifiez</a>
            </label>
        </div>

        <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4" v-bind:key="key"
            v-for="element,key in questions">
            <div class="m-3">
                <label class="text-blue-800">Question</label>
                <input class="border-red-300" type="text" name="question" v-model="element.question">
                <label class="text-blue-800">la réponse correcte</label>
                <input class="border-red-300" type="text" name="reponse1" v-model="element.reponse1">
                <label class="text-blue-800">une réponse</label>
                <input class="border-red-300" type="text" name="reponse2" v-model="element.reponse2">
                <label class="text-blue-800">une réponse</label>
                <input class="border-red-300" type="text" name="reponse3" v-model="element.reponse3">
                <label class="text-blue-800">une réponse</label>
                <input class="border-red-300" type="text" name="reponse4" v-model="element.reponse4">
            </div>
            <label class="bg-indigo-400 p-3 m-8 rounded-lg hover:bg-indigo-500">
                <a @click="modifierQuestion(element.idQquestion, element.question, element.reponse1, element.reponse2, element.reponse3, element.reponse4)">Modifiez</a>
            </label>
            <label class="bg-red-400 p-3 m-5 rounded-lg hover:bg-red-600">
                <a @click="supprimerQuestion(element.idQquestion)">Supprimez</a>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$axios
                .get("http://localhost:4000/api/questionsQuiz/" + this.$route.params.idQuiz)
                .then((response) => {
                    this.quizInfo = response.data;
                    /* console.log(this.questions); */
                })
                .catch((error) => {
                    console.log(error);
                }),
                this.$axios
                .get("http://localhost:4000/api/getquiz/" + this.$route.params.idQuiz)
                .then((response) => {
                    this.quiz = response.data;
                     /* console.log(this.quiz);  */
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        data() {
            return {
                questions: [],
                myQuestion: {},
                quiz: [],
                quizInfo: []
            }
        },
        methods: {
            modifierQuestion(idQ, q, r1, r2, r3, r4) {
                this.$axios
                    .put("http://localhost:4000/api/question", JSON.stringify({
                        idQuestion: idQ,
                        question: q,
                        reponse1: r1,
                        reponse2: r2,
                        reponse3: r3,
                        reponse4: r4,
                        idQuiz: "1"
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response) => {
                        this.questions = response.data;
                        this.$alert("question modifié");
                        console.log(this.questions);
                    })
                    .catch((error) => {
                        this.$alert("erreur de modification");
                        console.log(error);
                    });
            },
            modifierQuiz(nom, categ) {
                this.$axios
                    .put("http://localhost:4000/api/quiz", JSON.stringify({
                        nomQuiz: nom,
                        categorie: categ,
                        idQuiz: "1"
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response) => {
                        this.quiz = response.data;
                        this.$alert("quiz modifié");
                        console.log(this.quiz);
                    })
                    .catch((error) => {
                        this.$alert("erreur de modification");
                        console.log(error);
                    });
            },
            supprimerQuestion(idQ){
                this.$confirm("Etes-vous sûr de vouloir supprimer cette question ?").then(() => {
                    this.$axios
                        .delete("http://localhost:4000/api/deletequestion", JSON.stringify({ idQuestion: idQ }),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then((response) => {
                            this.quiz = response.data;
                            this.$alert("question supprimé");
                            console.log(this.quiz);
                        })
                        .catch((error) => {
                            this.$alert("erreur de suppression");
                            console.log(error);
                        });
                });
                
            },
            supprimerQuiz(idQ){
                this.$confirm("Etes-vous sûr de vouloir supprimer ce quiz ?").then(() => {
                    this.$axios
                        .delete("http://localhost:4000/api/deletequiz", JSON.stringify({ idQuiz: idQ }),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then((response) => {
                            this.quiz = response.data;
                            this.$alert("quiz supprimé");
                            console.log(this.quiz);
                        })
                        .catch((error) => {
                            this.$alert("erreur de suppression");
                            console.log(error);
                        });
                });
                
            },
            goAjouterQuestion(idQ){
                this.$router.push('/AjouterQuestion/' + idQ)
            },
        }
    }
</script>

<style>
    @import "../assets/styles.css";

    input[type=text] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid lightgray;
        border-radius: 4px;
        box-sizing: border-box;
    }

    #container {
        min-width: 40vw;
    }

    @media all and (max-width: 900px) {
        #container {
            min-width: 90vw;
        }

        .boxQuiz {
            padding: 3rem 1rem;
        }
    }
</style>