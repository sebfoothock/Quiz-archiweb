<!--
Le composant Quiz permet de jouer à un quiz
-->

<template>
    <div id="container">
        <h1 id="titreQuiz" class="titreQuiz font-bold p-8 text-6xl text-center text-blue-700">{{quiz[0].nomQuiz}}</h1>
        <div class="boxQuiz bg-gray-300 p-12 rounded-lg shadow-lg mt-4">
            <div v-if="questionActuel < nbQuestions">
                <p class="text-2xl font-bold">
                    {{ questions[questionActuel].question }}
                </p>
                <label v-bind:key="key" class="bg-white block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
                    v-for="reponse,key in reponses[questionActuel]"  v-bind:class="[{'hover:bg-blue-100 cursor-pointer' : questionSelectionne == ''},
                    {'bg-red-200' : questionSelectionne == key},
                    {'bg-green-200' : key == 'reponse1' && questionSelectionne != ''}]">
                    <div class="fas fa-check" 
                    v-bind:id="key" 
                    v-bind:value="reponse" 
                    v-on:click="repondu(key)"
                    v-bind:disabled="questionSelectionne != ''"
                    >
                        {{ reponse }}
                    </div>
                </label>
                <div class="mt-6 flow-root">
                    <button
                        class="float-right px-5 py-2 bg-blue-600 text-white text-sm font-bold tracking-wide rounded-full"
                        v-show="questionSelectionne != '' && questionActuel < nbQuestions-1 "
                        @click="questionSuivante()">
                        Question Suivante &gt;
                    </button>
                    <button
                        class="float-right px-5 py-2 bg-blue-600 text-white text-sm font-bold tracking-wide rounded-full"
                        v-show="questionSelectionne != '' && questionActuel == nbQuestions-1" @click="resultat()">
                        Fini
                    </button>
                </div>
            </div>
            <div v-else>
                <h2 class="font-bold text-3xl">Résultat</h2>
                <div class="flex justify-start space-x-4 mt-6">
                    <p>
                        Votre score :
                        <span class="text-2xl text-green-700 font-bold">{{ score }} / {{ questionActuel*10 }}</span>
                    </p>
                </div>
                <button
                    class="float-right px-5 py-2 bg-blue-600 text-white text-sm font-bold tracking-wide rounded-full"
                    @click="resetQuiz">
                    Rejouer
                </button>
            </div>
        </div>
    </div>
</template>


<script>
    /* import shuffle from 'lodash/shuffle'; */
    export default {
        mounted() {
            //Permet d'accéder à toutes les informations des questions d'un quiz
            this.$axios
                .get("http://localhost:4000/api/questionsquiz/" + this.$route.params.idQuiz)
                .then((response) => {
                    this.questions = response.data;
                })
                .catch((error) => {
                    console.log(error);
                }),
            //Permet d'accéder à toutes les réponses d'une question
            this.$axios
                .get("http://localhost:4000/api/answers/" + this.$route.params.idQuiz)
                .then((response) => {
                    this.reponses = response.data;
                    /* console.log(this.reponses) */
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
                //Ce sont les informations d'un quiz
                quiz: [],
                //Ce sont toutes les informations des questions d'un quiz
                questions: [],
                //Ce sont toutes les réponses à une question
                reponses: [],
                //Permet de savoir à quelle question l'utilisateur répond
                questionActuel: 0,
                //Permet de savoir quelle réponse a choisi l'utilisateur
                questionSelectionne: '',
                //Permet de savoir le score de l'utilisateur
                score: 0
            }
        },
        methods: {
            //Permet d'ajouter des points aux scores si l'utilisateur a bien répondu
            repondu(e) {
                this.questionSelectionne = e
                if (this.questionSelectionne === 'reponse1')
                    this.score = this.score + 10
            },
            //Permet de passer à la question suivante
            questionSuivante() {
                this.questionActuel++
                this.questionSelectionne = ''
            },
            //Permet de passer aux résultats
            resultat() {
                this.questionActuel++
            },
            //Permet de refaire un quiz
            resetQuiz() {
                this.questionActuel = 0
                this.questionSelectionne = ''
                this.score = 0
            }
        },
        computed: {
            //Permet de savoir le nombre de questions
            nbQuestions: function () {
                return this.questions.length;
            }
        }
    }
</script>

<style scoped>
    @import "../assets/styles.css";

    #container {
        min-width: 40vw;
    }

    @media all and (max-width: 900px) {
        #container {
            min-width: 90vw;
        }

        #titreQuiz{
            font-size: 2.2em;
        }

        .boxQuiz {
            padding: 3rem 1rem;
        }
    }
</style>