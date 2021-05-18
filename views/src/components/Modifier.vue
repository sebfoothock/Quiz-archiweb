<!--
Le composant Modifier permet de modifier un quiz  et ses questions
-->

<template>
    <div id="container">
        <h1 class="font-bold text-5xl text-center text-blue-700">Modification : {{quiz[0].nomQuiz}}</h1>
        <br>
        <br>
        <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4" v-bind:key="key" v-for="quizInfo,key in quiz">
            <div class="m-3" >
                <label class="text-blue-800">nom du Quiz</label>
                <input class="border-red-300" type="text" name="nom quiz" v-model="quizInfo.nomQuiz">
                <label class="text-blue-800">catégorie du Quiz</label>
                <input class="border-red-300" type="text" name="categorie" v-model="quizInfo.categorie">
            </div>
            <label class="bg-indigo-400 p-3 m-8 rounded-lg hover:bg-indigo-500">
                <a @click="modifierQuiz(quizInfo.nomQuiz, quizInfo.categorie, quizInfo.idQuiz)">Modifiez</a>
            </label>
            <label class="bg-green-300 p-3 m-5 rounded-lg hover:bg-green-500 btnQuiz">
                <a @click="goAjouterQuestion(quizInfo.idQuiz)">Ajoutez une question</a>
            </label>
            <label name="supprimer" class="bg-red-400 p-3 m-2 rounded-lg hover:bg-red-600 btnQuiz"><a
                    @click="supprimerQuiz(quizInfo.idQuiz)">Supprimez ce quiz</a>
            </label>
        </div>
        <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4" v-bind:key="index"
            v-for="element,index in questions">
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
            <label class="bg-indigo-400 p-3 m-8 rounded-lg hover:bg-indigo-500 btnQuestion">
                <a @click="modifierQuestion(element.idQuestion, element.question, element.reponse1, element.reponse2, element.reponse3, element.reponse4, element.idQuiz)">Modifiez</a>
            </label>
            <label class="bg-red-400 p-3 m-5 rounded-lg hover:bg-red-600 btnQuestion">
                <a @click="supprimerQuestion(element.idQuestion)">Supprimez</a>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            //Permet d'accéder à toutes les informations des questions d'un quiz
            this.$axios
                .get("http://localhost:4000/api/questionsQuiz/" + this.$route.params.idQuiz)
                .then((response) => {
                    this.questions = response.data;
                })
                .catch((error) => {
                    console.log(error);
                }),
            //Permet d'accéder à toutes les informations d'un quiz
            this.$axios
                .get("http://localhost:4000/api/getquiz/" + this.$route.params.idQuiz)
                .then((response) => {
                    this.quiz = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        data() {
            return {
                //Ce sont toutes les informations des questions d'un quiz
                questions: [],
                //Ce sont les informations d'un quiz
                quiz: []
            }
        },
        methods: {
            //Permet de mofidier une question selon les modifications de l'utilisateur
            modifierQuestion(idQuest, q, r1, r2, r3, r4, idQ) {
                this.$axios
                    .put("http://localhost:4000/api/question", {
                        idQuestion: idQuest,
                        question: q,
                        reponse1: r1,
                        reponse2: r2,
                        reponse3: r3,
                        reponse4: r4,
                        idQuiz: idQ
                    }, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }).then((response) => {
                        this.questions = response.data;
                        setTimeout(() => {
                            this.$router.go()
                        }, 1000);
                        this.$alert("question modifié");
                        console.log(this.questions);
                    })
                    .catch((error) => {
                        this.$alert("erreur de modification");
                        console.log(error);
                    });
            },
            //Permet de mofidier un quiz selon les modifications de l'utilisateur
            modifierQuiz(nom, categ, idQ) {
                this.$axios
                    .put("http://localhost:4000/api/quiz", {
                        nomQuiz: nom,
                        categorie: categ,
                        idQuiz: idQ
                    }, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }).then((response) => {
                        this.quiz = response.data;
                        setTimeout(() => {
                            this.$router.go()
                        }, 1000);
                        this.$alert("quiz modifié");
                        console.log(this.quiz);
                    })
                    .catch((error) => {
                        this.$alert("erreur de modification");
                        console.log(error);
                    });
            },
            //Permet de supprimer une question
            supprimerQuestion(idQ) {
                this.$confirm("Etes-vous sûr de vouloir supprimer cette question ?").then(() => {
                    this.$axios
                        .delete("http://localhost:4000/api/deletequestion/" + idQ)
                        .then((response) => {
                            this.quiz = response.data;
                            setTimeout(() => {
                                this.$router.go()
                            }, 1000);
                            this.$alert("question supprimé");
                            console.log(this.quiz);
                        })
                        .catch((error) => {
                            this.$alert("erreur de suppression");
                            console.log(error);
                        });
                });

            },
            //Permet de supprimer un quiz
            supprimerQuiz(idQ) {
                this.$confirm("Etes-vous sûr de vouloir supprimer ce quiz ?").then(() => {
                    this.$axios
                        .delete("http://localhost:4000/api/deletequiz/" + idQ)
                        .then((response) => {
                            this.quiz = response.data;
                            this.$alert("quiz supprimé");
                            console.log(this.quiz);
                        })
                        .catch((error) => {
                            this.$alert("erreur de suppression");
                            console.log(error);
                        });
                    setTimeout(() => {
                        this.$router.push('/Home')
                    }, 100);
                });

            },
            //Permet d'aller au composant AjouterQuestion en fonction de l'identifiant du quiz
            goAjouterQuestion(quizId) {
                this.$router.push('/AjouterQuestion/' + quizId)
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

     @media all and (max-width: 1500px) {
         .btnQuiz {
            display: block;
        }
     }

    @media all and (max-width: 1000px) {
        #container {
            min-width: 80vw;
        }

        .btnQuestion{
            margin: 15px;
        }

        .boxQuiz {
            padding: 3rem 1rem;
        }
    }

    @media all and (max-width: 400px) {
        .btnQuestion{
            display: block;
        }
    }
</style>