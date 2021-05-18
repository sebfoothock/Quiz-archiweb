<!--
Le composant AjouterQuestion permet d'ajouter une question à un quiz
-->

<template>
    <div id="container">
        <h1 class="font-bold text-5xl text-center text-blue-700">Ajoutez Question</h1>
        <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4">
            <div class="m-3">
                <label class="font-bold text-xl text-red-600">Tout les champs doivent être remplis</label>
                <br>
                <br>
                <label class="text-blue-800">Question</label>
                <input class="border-red-300" type="text" name="question" v-model="newQuestion.question">
                <label class="text-blue-800">la réponse correcte</label>
                <input class="border-red-300" type="text" name="reponse1" v-model="newQuestion.reponse1">
                <label class="text-blue-800">une réponse</label>
                <input class="border-red-300" type="text" name="reponse2" v-model="newQuestion.reponse2">
                <label class="text-blue-800">une réponse</label>
                <input class="border-red-300" type="text" name="reponse3" v-model="newQuestion.reponse3">
                <label class="text-blue-800">une réponse</label>
                <input class="border-red-300" type="text" name="reponse4" v-model="newQuestion.reponse4">
            </div>
            <label class="bg-green-300 p-3 m-5 rounded-lg hover:bg-green-500">
                <a @click="ajouterQuestion()">Ajoutez</a>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //Ce sont les informations de la nouvelle question 
                newQuestion: {
                    question: null,
                    reponse1: null,
                    reponse2: null,
                    reponse3: null,
                    reponse4: null,
                    idQuiz: this.$route.params.idQuiz
                },
            }
        },
        methods: {
            //Permet d'ajouter une question que l'utilisateur a encodé
            ajouterQuestion() {
                this.$axios
                    .post("http://localhost:4000/api/newquestion", {
                        question: this.newQuestion.question,
                        reponse1: this.newQuestion.reponse1,
                        reponse2: this.newQuestion.reponse2,
                        reponse3: this.newQuestion.reponse3,
                        reponse4: this.newQuestion.reponse4,
                        idQuiz: this.newQuestion.idQuiz
                    }
                    , {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }).then((response) => {
                        this.questions = response.data;
                        setTimeout(() => {
                            this.$router.push('/Modifier/' + this.newQuestion.idQuiz)
                        }, 100);
                        this.$alert("question ajouté");
                    })
                    .catch((error) => {
                        this.$alert("erreur lors de l'ajout");
                        console.log(error);
                    });
                    
            }
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