<template>
<div id="container">
    <h1 class="titreQuiz font-bold p-8 text-6xl text-center text-blue-700 ">Quiz culture générale</h1>
    <div class="boxQuiz bg-gray-300 p-12 rounded-lg shadow-lg mt-4" >
        <div v-if="questionActuel < nbQuestions">
            <p class="text-2xl font-bold">
                {{ questions[questionActuel].question }}
            </p>
            <label v-bind:key="key" class="bg-white block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
            v-for="reponse,key in reponses[questionActuel]" v-bind:value="reponse"
             v-bind:class="[{'hover:bg-blue-100 cursor-pointer' : questionSelectionne == ''},
                    {'bg-red-200' : questionSelectionne == key},
                    {'bg-green-200' : key == 'reponse1' && questionSelectionne != ''}]"
            >
                <!-- v-for=pour parcourir les questions, mettre le rouge avant pour que le vert aille dessus -->
                <div class="fas fa-check" v-bind:id="key" v-bind:value="reponse"
                    v-on:click="repondu(key)" v-bind:disabled="questionSelectionne != ''">
                <!-- v-bind:id = :id & v-on:change = @change -->
                {{ reponse }}
                </div>
            </label>
            <div class="mt-6 flow-root">
                <button
                    class="float-right px-5 py-2 bg-blue-600 text-white text-sm font-bold tracking-wide rounded-full"
                    v-show="questionSelectionne != '' && questionActuel < nbQuestions-1 "
                    @click="questionSuivante()">
                    <!-- px=horizontal padding py= vertical padding -->
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
export default {
  mounted() {
        this.$axios
        .get("http://localhost:4000/api/questionsquiz/" + this.$route.params.idQuiz)
        .then((response) => {
            this.questions = response.data;
            /* console.log(this.questions); */
        })
        .catch((error) =>{
            console.log(error);
        }),
        this.$axios
        .get("http://localhost:4000/api/answers/" + this.$route.params.idQuiz)
        .then((response) => {
            this.reponses = response.data;
            /* console.log(this.reponses); */
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
    }
}
</script>

<style scoped>
    @import "../assets/styles.css";
    #container{
        min-width: 40vw;
    }

    @media all and (max-width: 900px) {
        #container{
        min-width: 90vw;
        }
        .boxQuiz{
            padding: 3rem 1rem ;
        }
    }

</style>
