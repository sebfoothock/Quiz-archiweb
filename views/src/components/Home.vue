<template>
  <div id="container">
    <h1 class="titreQuiz font-bold text-5xl text-center text-blue-700">Jouez et créez votre propre quiz</h1>
    <br>
    <label class="text-gray-700 text-2xl font-bold">Filtre : </label>
    <select name="categorie" id="cars">
      <option value="volvo">générale</option>
      <option value="saab">sport</option>
      <option value="opel">histoire</option>
      <option value="audi">géographie</option>
  </select>
  <br>
        <br>
        <label class="bg-green-300 p-3 m-5 rounded-lg hover:bg-green-500">
                <a @click="goAjouterQuiz()">Ajoutez un quiz</a>
        </label>
    <div v-bind:key="key" v-for="quiz,key in quizs">
      <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4 hover:bg-blue-300 cursor-pointer"
        @click="goQuiz(quiz.idQuiz)">
        <h2 class="font-bold text-xl text-center text-blue-700">{{quiz.nomQuiz}}</h2>
        <label class="text-xl text-center">Catégorie : {{quiz.categorie}}</label>
      </div>
      <div class="inline-block mt-4">
        <label name="modifier" class="bg-indigo-400 p-3 m-8 rounded-lg hover:bg-indigo-500"><a
            @click="modifierQuiz(quiz.idQuiz)">Modifiez</a>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$axios
        .get("http://localhost:4000/api/quiz")
        .then((response) => {
          this.quizs = response.data;
          /*  console.log(this.quizs); */
        })
        .catch((error) => {
          console.log(error);
        }),
        this.$axios
        .get("http://localhost:4000/api/answers/1")
        .then((response) => {
          this.reponses = response.data;
          /* console.log(this.reponses); */
        })
        .catch((error) => {
          console.log(error);
        })
    },
    data() {
      return {
        quizs: [],
      }
    },
    methods: {
      goQuiz(quiz) {
        this.$router.push('/Quiz/' + quiz)
      },
      modifierQuiz(quiz) {
        this.$router.push('/Modifier/' + quiz)
      },
      goAjouterQuiz(){
       this.$router.push('/AjouterQuiz/')
      },
    }
  }
</script>

<style>
  @import "../assets/styles.css";

  #container {
    max-width: 50vw;
    padding: 50px;
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